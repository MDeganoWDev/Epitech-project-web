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
import { getSex } from '../api/get/getSex';
import { useNavigate } from 'react-router-dom';

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
    const [sexOptions, setSexOptions] = useState<SexType[]>([]);
    const [sex, setSex] = useState(0);

    useEffect(() => {
        const fetchSexOptions = async () => {
            setSexOptions(await getSex());
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
    }, [loading]);

    console.log(allAdvertisements);
    console.log(advertisements);

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
            await putUtilisateur(editedUser.id!, formDataEditedUser); // add try-catch block
            setUser(editedUser);
        } catch (error) {
            console.error(error);
        }
    }

    const showApplicants = (id?: number) => () => {
        navigate(`/advertisement/${id}`);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {editing ? (
                <form onSubmit={handleSubmit}>
                    <h2>Edit User Information</h2>
                    <label htmlFor="cv">CV:</label>
                    <input type="file" name="cv" />
                    <br />
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" id="firstname" name="firstname" defaultValue={user?.firstname} />
                    <br />
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" id="lastname" name="lastname" defaultValue={user?.lastname} />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" defaultValue={user?.email} />
                    <br />
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" defaultValue={user?.phone} />
                    <br />
                    <label htmlFor="sex">Gender:</label>
                        <select id="sex" name="sex" value={sex} onChange={(event) => setSex(parseInt(event.target.value))}>
                            <option value="">Select...</option>
                            {sexOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.id}
                                </option>
                            ))}
                        </select>

                     <button type="submit">Save</button>
                </form>
            ) : (
                <div>
                    <h2>User Information</h2>
                    <p>First Name: {user?.firstname}</p>
                    <p>Last Name: {user?.lastname}</p>
                    <p>Email: {user?.email}</p>
                    <p>Phone: {user?.phone}</p>
                    <p>Gender: {user?.sex?.name}</p>
                    <button onClick={handleEdit}>Edit Info</button> {/* added edit button */}
                </div>
            )}
            {applications.length > 0 && (
                <div>
                    <h2>Applications</h2>
                    {applications.map((app) => (
                        <div key={app.id}>
                            <p>Company: {app.advertisement?.company?.name}</p>
                            <p>Offer: {app.advertisement?.title}</p>
                            <p>Description: {app.advertisement?.quick_description}</p>
                        </div>
                    ))}
                    <br />
                </div>
            )}
            {advertisements.length > 0 && (
                <div>
                    <h2>Advertisements</h2>
                    {advertisements.map((ad) => (
                        <div key={ad.id}>
                            <p>Title: {ad.title}</p>
                            <p>Description: {ad.quick_description}</p>
                            <button onClick={showApplicants(ad.id)}>See applicants for this offer</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserOffice;
