import { Route, Routes, Navigate } from "react-router-dom"
import SelectTable from "./SelectTable"
import SexIndex from "./tableRouting/SexIndex"
import AdvertisementIndex from "./tableRouting/AdvertisementIndex"
import ApplicationIndex from "./tableRouting/ApplicationIndex"
import CompanyIndex from "./tableRouting/CompanyIndex"
import ContractIndex from "./tableRouting/ContractIndex"
import PermissionIndex from "./tableRouting/PermissionIndex"
import UnregisterIndex from "./tableRouting/UnregisterIndex"
import UtilisateurIndex from "./tableRouting/UtilisateurIndex"
import { getUtilisateur } from "../../api/get/getUtilisateur"
import { useEffect, useState } from "react"
import { useAuthStore } from "../../store/authStore"
import { UtilisateurType } from "../../typings/type"

const withAdminPermission = (Component: React.ComponentType<any>) => {
  const WrappedComponent = (props: any) => {
    const token = useAuthStore((state) => state.token);
    const [user, setUser] = useState<UtilisateurType>();
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
    if (user && user?.permission?.name === 'admin') {
      return <Component {...props} />;
    } else {
      return <Navigate to="/" />;
    }

  };
  return WrappedComponent;
};

const AdminBackOffice = () => {
  return (
    <div>
      <SelectTable/>
      <Routes>
        <Route index element={<UtilisateurIndex />} />
        <Route path="sex/*" element={<SexIndex/>} />
        <Route path="advertisement/*" element={<AdvertisementIndex/>} />
        <Route path="application/*" element={<ApplicationIndex/>} />
        <Route path="company/*" element={<CompanyIndex/>} />
        <Route path="contract/*" element={<ContractIndex/>} />
        <Route path="permission/*" element={<PermissionIndex/>} />
        <Route path="unregister/*" element={<UnregisterIndex/>} />
        <Route path="utilisateur/*" element={<UtilisateurIndex/>} />
      </Routes>
    </div>
  )
}

export default withAdminPermission(AdminBackOffice);
// export default AdminBackOffice;