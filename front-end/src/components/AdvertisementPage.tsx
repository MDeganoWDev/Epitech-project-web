import AdvertisementForm from "./backOffice/tableForm/AdvertisementForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApplicationType } from "../typings/type";
import { getApplication } from "../api/get/getApplication";

export const AdvertisementPage = () => {
    const { id } = useParams();
    const [applications, setApplications] = useState<ApplicationType[]>([]);
    const [allApplications, setAllApplications] = useState<ApplicationType[]>([]);

    useEffect(() => {
    if (id) {
        const getAllApplications = async () => {
            const allApplications = await getApplication();
            setAllApplications(allApplications);
        }
        getAllApplications();
        setApplications(allApplications.filter(ap => ap.advertisement?.id === parseInt(id)));
    }},[]);
    if (id) {
        return (
            <div>
                <h2>Applicants</h2>
                {applications.map((app) => (
                    <div key={app.id}>
                        {app.user &&
                            <>
                                <p>Name: {app.user?.lastname} {app.user?.firstname}</p>
                                <p>Email: {app.user?.email}</p>
                                <p>Phone: {app.user?.phone}</p>
                                <a href={app.user?.cv} target="_blank">CV Link</a>
                            </>
                        }
                        {app.unregisterUser &&
                            <>
                                <p>Name: {app.unregisterUser?.lastname} {app.unregisterUser?.firstname}</p>
                                <p>Email: {app.unregisterUser?.email}</p>
                                <p>Phone: {app.unregisterUser?.phone}</p>
                                <a href={app.unregisterUser?.cv} target="_blank">CV Link</a>
                            </>
                        }
                        <p>Message: {app.message}</p>

                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <AdvertisementForm />
            </div>
        );
    }
};
