import AdvertisementForm from "./backOffice/tableForm/AdvertisementForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApplicationType } from "../typings/type";
import { getNPApplications } from "../api/get/getNPApplications";

export const AdvertisementPage = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState<ApplicationType[]>([]);

  useEffect(() => {
    if (id) {
      const fetchApplications = async () => {
        const allApplications = await getNPApplications();
        setApplications(allApplications.filter(ap => ap.advertisement?.id === parseInt(id)));
      }
      fetchApplications();
    }
  }, [id]);
  if (id) {
    return (
      <div className="bg-gray-700 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Applicants</h2>
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app.id} className="mb-4">
              {app.user && (
                <div style={{ display: "flex", gap: "10%" }}>
                  <div>
                    <p>
                      <span className="font-bold">Name:</span> {app.user?.lastname} {app.user?.firstname}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span> {app.user?.email}
                    </p>
                    <p>
                      <span className="font-bold">Phone:</span> {app.user?.phone}
                    </p>
                    {app.user?.cv && (
                      <a href={app.user?.cv} target="_blank" className="text-blue-500 hover:underline">CV Link</a>
                    )}
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Motivation:</span> {app.message}
                    </p>
                  </div>
                </div>
              )}
              {app.unregisterUser && (
                <div style={{ display: "flex", gap: "10%" }}>
                  <div>
                    <p>
                      <span className="font-bold">Name:</span> {app.unregisterUser?.lastname} {app.unregisterUser?.firstname}
                    </p>
                    <p>
                      <span className="font-bold">Email:</span> {app.unregisterUser?.email}
                    </p>
                    <p>
                      <span className="font-bold">Phone:</span> {app.unregisterUser?.phone}
                    </p>
                    {app.user?.cv && (
                      <a href={app.user?.cv} target="_blank" className="text-blue-500 hover:underline">CV Link</a>
                    )}
                  </div>
                  <div>
                    <p>
                      <span className="font-bold">Motivation:</span> {app.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No applications yet.</p>
        )}
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
