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
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

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
          apply_date: new Date().toISOString().slice(0, 16),
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
      <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        {!isAuthenticated ? (
          <>
            <div className="m-1">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                value={formValues.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="m-1">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                value={formValues.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="m-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                name="phone"
                id="phone"
                value={formValues.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="m-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="m-1">
              <Label htmlFor="cv">CV (PDF)</Label>
              <Input
                type="file"
                accept=".pdf"
                name="cv"
                id="cv"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="m-1">
              <Label htmlFor="sex">Sex</Label>
              <Select
                name="sex"
                onValueChange={(value: string) => setSex({ id: parseInt(value), name: '' })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {sexOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id.toString()}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <select
                value={sex.id}
                onChange={(event) => setSex({ id: parseInt(event.target.value), name: '' })}
                className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select...</option>

              </select> */}
            </div>
          </>
        ) : (
          <p className="text-gray-700 m-1">Your data is imported from your profile</p>
        )}
        <div className="m-1">
          <Label htmlFor="message">Message</Label>
          <textarea
            name="message"
            value={formValues.message}
            onChange={handleChange}
            className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <Button
          type="submit"
          className="inline-block bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 m-1"
        >
          Submit
        </Button>
      </form>
      {!isAuthenticated ? (
        <Link to="/user" className="block text-center mt-4 text-gray-700 hover:text-indigo-500">
          Or... I have an account - LogIn
        </Link>
      ) : null}</>
  );
};

export default ApplicationPage;
