import { useState, useEffect } from 'react';
import { UnregisterType, UtilisateurType } from '../typings/type';
import { SexType } from "../typings/type";
import { useAuthStore } from "../store/authStore";
import { Link, useParams } from "react-router-dom";
import { getSex } from "../api/get/getSex";
import { getUtilisateur } from '../api/get/getUtilisateur';
import { ApplicationType } from '../typings/type';
import { postApplication } from '../api/post/postApplication';
import { postUnregister } from '../api/post/postUnregister';

interface FormValues extends UtilisateurType {
    message: string;
}

const ApplicationPage = () => {
    const { id } = useParams();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [sexOptions, setSexOptions] = useState<SexType[]>([]);
    const [sex, setSex] = useState<SexType>({ id: 0, name: '' });
    const [user, setUser] = useState<UtilisateurType>({ firstname: '', lastname: '', email: '', phone: '', sex: sex, cv: '' });
    const [formValues, setFormValues] = useState<FormValues>({ ...user, message: '' });
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchUser = async () => {
               setUser(await getUtilisateur(undefined, token));
            };
            fetchUser();
        };

        const fetchSexOptions = async () => {
            setSexOptions(await getSex());
        };
        setFormValues({ ...user, message: '' });
        fetchSexOptions();
    }, [isAuthenticated]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            email: formValues.email,
            phone: formValues.phone,
            sex_id: sex.id,
            message: formValues.message,
            cv: "testCV",
          };
          try {
            if (isAuthenticated) {
              const application: ApplicationType = {
                user_id: user.id,
                apply_date: new Date().toLocaleDateString() ,
                advertisement_id: parseInt(id as string),
                ...data,
              };
              const response = await postApplication(application);
              if (response) {
                console.log("Application submitted successfully");
              } else {
                console.error("Error submitting application");
              }
            } else {
              const unregisterUser = await postUnregister(data as UnregisterType);
              const application: ApplicationType = {
                unregisterUser_id: unregisterUser.id,
                apply_date: new Date().toLocaleDateString() ,
                advertisement_id: parseInt(id as string),
                ...data,
              };
              const response = await postApplication(application);
              if (response) {
                console.log("Application submitted successfully");
              } else {
                console.error("Error submitting application");
              }
            }
          } catch (error) {
            console.error(error);
          }
    };

    // Handle form input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                {!isAuthenticated ?
                    <>
                        <label>
                            First Name:
                            <input type="text" name="firstname" value={formValues.firstname} onChange={handleChange} />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" name="lastname" value={formValues.lastname} onChange={handleChange} />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={formValues.email} onChange={handleChange} />
                        </label>
                        <label>
                            Phone:
                            <input type="tel" name="phone" value={formValues.phone} onChange={handleChange} />
                        </label>
                        <label>
                            Sex:
                            <select value={sex.id} onChange={(event) => setSex({ id: parseInt(event.target.value), name: '' })}>
                                <option value="">Select...</option>
                                {sexOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </>
                    : <p>Your data is imported from your profile</p>}
                <label>
                    Message:
                    <textarea name="message" value={formValues.message} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
                <br />
            </form>
            {!isAuthenticated ? <Link to="/user" >Or... I have an account - LogIn</Link> : <></>}
        </>
    );
};

export default ApplicationPage;
