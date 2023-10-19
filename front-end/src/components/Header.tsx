import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UtilisateurType } from "../typings/type";
import { getUtilisateur } from "../api/get/getUtilisateur";
import { useAuthStore } from "../store/authStore";
import { getNPCompany } from "../api/get/getNPCompany";
import { CompanyType } from "../typings/type";

type HeadersProps = {
    isAuthenticated?: boolean;
    onDisconnect?: () => void;
}

const Header = ({isAuthenticated, onDisconnect}:HeadersProps) => {
    const navigate = useNavigate();
    const handleDisconnect = () => {
        if (onDisconnect) {
            onDisconnect();
        }
        navigate('/');
    }
    const [user, setUser] = useState<UtilisateurType>();
        const token = useAuthStore((state) => state.token);
        useEffect(() => {
          const fetchUser = async () => {
            try {
              const response = await getUtilisateur(undefined, token);
              setUser(response);
            } catch (error) {
              console.error(error);
            }
          };
          fetchUser();
        }, [token]);
        const redirectForCreateAdvertisement = async () => {
            const allCompanies:CompanyType[] = await getNPCompany();
            const userCompany = allCompanies.filter(company => company.user?.id === user?.id);
            console.log(allCompanies);
            navigate(`/advertisement/create/${userCompany[0].id}`);
        }

    if (isAuthenticated) {
        if (user && user?.permission?.name === 'company') {
            return (
                <header className="p-20 bg-slate-300 flex justify-between items-center py-4">
                    <h1 className="text-blue-700 text-2xl font-bold"><Link to="/">Job board</Link></h1>
                    <button onClick={redirectForCreateAdvertisement}>Create an advertisement</button>
                    <Link to="/user/profile">Profile</Link>
                    <button onClick={handleDisconnect}>Disconnect</button>
                </header>
            );
        }
        else if (user && user?.permission?.name === 'admin') {
            return (
                <header className="p-20 bg-slate-300 flex justify-between items-center py-4">
                    <h1 className="text-blue-700 text-2xl font-bold"><Link to="/">Job board</Link></h1>
                    <Link to="/admin">Admin</Link>
                    <button onClick={handleDisconnect}>Disconnect</button>
                </header>
            );
        }
    }
    return (
        <header className="p-20 bg-slate-300 flex justify-between items-center py-4">
            <h1 className="text-blue-700 text-2xl font-bold"><Link to="/">Job board</Link></h1>
            {isAuthenticated ? (
                <>
                    <Link to="/user/profile">Profile</Link>
                    <button onClick={handleDisconnect}>Disconnect</button>
                </>
            ) : (
                <Link to="/user">Login/Register</Link>
            )}

        </header>
    );
};

export default Header;
