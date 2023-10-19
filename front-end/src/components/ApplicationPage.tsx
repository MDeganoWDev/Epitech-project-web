import { useState, useEffect } from 'react';
import { UtilisateurType } from '../typings/type';
import { SexType } from "../typings/type";
import { useAuthStore } from "../store/authStore";
import { Link, useParams } from "react-router-dom";
import { getNPSex } from "../api/get/getNPSex";
import { getUtilisateur } from '../api/get/getUtilisateur';
import { ApplicationType } from '../typings/type';
import { postApplication } from '../api/post/postApplication';
import { postUnregister } from '../api/post/postUnregister';
import { useNavigate } from 'react-router-dom';

interface FormValues extends UtilisateurType {
  message: string;
}

const ApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [sexOptions, setSexOptions] = useState<SexType[]>([]);
  const [sex, setSex] = useState<SexType>({ id: 0, name: '' });
  const [user, setUser] = useState<UtilisateurType>({ firstname: '', lastname: '', email: '', phone: '', sex: sex });
  const [formValues, setFormValues] = useState<FormValues>({ ...user, message: '' });
  const token = useAuthStore((state) => state.token);
  const [cv, setCv] = useState<File>();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUser = async () => {
        setUser(await getUtilisateur(undefined, token));
      };
      fetchUser();
    };

    const fetchSexOptions = async () => {
      setSexOptions(await getNPSex());
    };
    setFormValues({ ...user, message: '' });
    fetchSexOptions();
  }, [isAuthenticated]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setCv(files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('firstname', formValues.firstname);
    formData.append('lastname', formValues.lastname);
    formData.append('email', formValues.email);
    formData.append('phone', formValues.phone);
    formData.append('sex_id', sex.id?.toString() || '');
    formData.append('message', formValues.message || ''); // set default value if message is not set
    formData.append('cv', cv || '');
    try {
      if (isAuthenticated) {
        const application: ApplicationType = {
          user_id: user.id,
          apply_date: new Date().toISOString(),
          advertisement_id: parseInt(id as string),
          ...formValues,
        };
        const response = await postApplication(application);
        if (response) {
          console.log("Application submitted successfully");
        } else {
          console.error("Error submitting application");
        }
      } else {
        const unregisterUser = await postUnregister(formData);
        const application: ApplicationType = {
          unregisterUser_id: unregisterUser.id,
          apply_date: new Date().toISOString(),
          advertisement_id: parseInt(id as string),
          ...formValues,
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
    navigate('/')
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
            <input
              type="file"
              accept=".pdf"
              name="cv"
              id="cv"
              onChange={handleFileChange}
            />
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
