import { useEffect, useState } from 'react';
import { getUtilisateur } from '../api/get/getUtilisateur';
import { AdvertisementType } from '../typings/type';
import { ApplicationType } from '../typings/type';
import { useAuthStore } from "../store/authStore";
import { UtilisateurType } from '../typings/type';
import { getNPAdvertisements } from '../api/get/getNPAdvertisements';
import { getNPApplications } from '../api/get/getNPApplications';
import { putUtilisateur } from '../api/put/putUtilisateur';
import { SexType } from '../typings/type';
import { getNPSex } from '../api/get/getNPSex';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button"
import { ScrollArea } from './ui/scroll-area';
import { deleteApplications } from '../api/delete/deleteApplication';

const UserOffice = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const [user, setUser] = useState<UtilisateurType>();
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [advertisements, setAdvertisements] = useState<AdvertisementType[]>([]);
  const [allApplications, setAllApplications] = useState<ApplicationType[]>([]);
  const [allAdvertisements, setAllAdvertisements] = useState<AdvertisementType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [fiteredId, setFiteredId] = useState<number[]>([]);
  const filteredApplication = applications.filter(element => !fiteredId.includes(element.id));
  const [sexOptions, setSexOptions] = useState<SexType[]>([]);
  const [sex, setSex] = useState(0);

  useEffect(() => {
    const fetchSexOptions = async () => {
      setSexOptions(await getNPSex());
    }
    const fetchApplications = async () => {
      const npApplications = await getNPApplications();
      setAllApplications(npApplications);
    }
    const fetchAdvertisements = async () => {
      const npAdvertisements = await getNPAdvertisements();
      setAllAdvertisements(npAdvertisements);
    }
    const fetchUser = async () => {
      const user = await getUtilisateur(undefined, token);
      setUser(user);
      if (user.permission.name === 'worker') {
        await fetchApplications();
        const userApplications = allApplications.filter(app => app.user?.id === user?.id);
        setApplications(userApplications);
        setLoading(false);
      } else if (user.permission.name === 'company') {
        await fetchAdvertisements();
        const userAdvertisements = allAdvertisements.filter(ad => ad.company?.user?.id === user?.id);
        setAdvertisements(userAdvertisements);
        setLoading(false);
      }
    };
    fetchSexOptions();
    fetchUser();
  }, [loading, editing]);

  const handleDeleteApplication = (id?: number) => {
    deleteApplications(id)
    if (id) setFiteredId(prevState => [...prevState, id]);
  }

  const handleEdit = () => {
    editing ? setEditing(false) : setEditing(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const editedUser: UtilisateurType = {
      id: user?.id ?? 0,
      firstname: formData.get('firstname')?.toString() || user?.firstname || '',
      lastname: formData.get('lastname')?.toString() || user?.lastname || '',
      email: formData.get('email')?.toString() || user?.email || '',
      phone: formData.get('phone')?.toString() || user?.phone || '',
      permission: user?.permission || { id: 0, name: '' },
      sex_id: parseInt(formData.get('sex')?.toString() || '1') || user?.sex_id || 0,
    };
    const formDataEditedUser = new FormData();
    Object.entries(editedUser).forEach(([key, value]) => {
      formDataEditedUser.append(key, value as string);
    });
    if (formData.get('cv')) {
      formDataEditedUser.append('cv', formData.get('cv') as Blob);
    }
    try {
      await putUtilisateur(editedUser.id!, formDataEditedUser);
      setUser(editedUser);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  const showApplicants = (id?: number) => () => {
    console.log(id);
    navigate(`/advertisement/${id}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {editing ? (
        <div className="bg-secondary p-4 rounded-md shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-4">Edit User Information</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="cv" className="block mb-2">
              CV:
            </label>
            <input type="file" name="cv" className="mb-4" />
            <label htmlFor="firstname" className="block mb-2">
              First Name:
            </label>
            <input type="text" id="firstname" name="firstname" defaultValue={user?.firstname} className="mb-4" />
            <label htmlFor="lastname" className="block mb-2">
              Last Name:
            </label>
            <input type="text" id="lastname" name="lastname" defaultValue={user?.lastname} className="mb-4" />
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input type="email" id="email" name="email" defaultValue={user?.email} className="mb-4" />
            <label htmlFor="phone" className="block mb-2">
              Phone:
            </label>
            <input type="tel" id="phone" name="phone" defaultValue={user?.phone} className="mb-4" />
            <label htmlFor="sex" className="block mb-2">
              Gender:
            </label>
            <select
              id="sex"
              name="sex"
              value={sex}
              onChange={(event) => setSex(parseInt(event.target.value))}
              className="mb-4"
            >
              <option value="">Select...</option>
              {sexOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-secondary p-4 rounded-md shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-4">User Information</h2>
          <p className="mb-2">
            <span className="font-bold">First Name:</span> {user?.firstname}
          </p>
          <p className="mb-2">
            <span className="font-bold">Last Name:</span> {user?.lastname}
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span> {user?.email}
          </p>
          <p className="mb-2">
            <span className="font-bold">Phone:</span> {user?.phone}
          </p>
          <p className="mb-2">
            <span className="font-bold">Gender:</span> {user?.sex?.name}
          </p>
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Edit Info
          </button>
        </div>
      )}
      {applications.length > 0 && (
        <div className="bg-secondary p-4 rounded-md shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-4">Applications</h2>
          {filteredApplication.map((app) => (
            <ScrollArea className=''>
              <div key={app.id} className="mb-4 flex justify-between items-center px-9">
                <div>
                  <p>
                    <span className="font-bold">Company:</span> {app.advertisement?.company?.name}
                  </p>
                  <p>
                    <span className="font-bold">Offer:</span> {app.advertisement?.title}
                  </p>
                  <p>
                    <span className="font-bold">Description:</span> {app.advertisement?.quick_description}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteApplication(app.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </ScrollArea>
          ))}
        </div>
      )}
      {advertisements.length > 0 && (
        <div className="bg-secondary p-4 rounded-md shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-4">Advertisements</h2>
          {advertisements.map((ad) => (
            <div key={ad.id} className="mb-4">
              <p>
                <span className="font-bold">Title:</span> {ad.title}
              </p>
              <p>
                <span className="font-bold">Description:</span> {ad.quick_description}
              </p>
              <button
                onClick={showApplicants(ad.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                See applicants for this offer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOffice;
