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
      <div className="bg-secondary-100 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-3xl font-bold mb-4">Applicants</h2>
            {applications.length > 0 ? (
              applications.map((app) => (
                <div key={app.id} className="bg-secondary shadow overflow-hidden sm:rounded-lg mb-4">
                  {app.user && (
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                        {app.user?.lastname} {app.user?.firstname}
                      </h3>
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd className="mt-1 text-sm text-gray-900">{app.user?.email}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Phone</dt>
                          <dd className="mt-1 text-sm text-gray-900">{app.user?.phone}</dd>
                        </div>
                        {app.user?.cv && (
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">CV Link</dt>
                            <dd className="mt-1 text-sm text-blue-500 hover:underline">
                              <a href={app.user?.cv} target="_blank" rel="noreferrer">
                                {app.user?.cv}
                              </a>
                            </dd>
                          </div>
                        )}
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Motivation</dt>
                          <dd className="mt-1 text-sm text-gray-900">{app.message}</dd>
                        </div>
                      </dl>
                    </div>
                  )}
                  {app.unregisterUser && (
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                        {app.unregisterUser?.lastname} {app.unregisterUser?.firstname}
                      </h3>
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd className="mt-1 text-sm text-gray-900">{app.unregisterUser?.email}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Phone</dt>
                          <dd className="mt-1 text-sm text-gray-900">{app.unregisterUser?.phone}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Motivation</dt>
                          <dd className="mt-1 text-sm text-gray-900">{app.message}</dd>
                        </div>
                      </dl>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-lg font-medium text-gray-900">No applications found.</p>
            )}
          </div>
        </div>
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
