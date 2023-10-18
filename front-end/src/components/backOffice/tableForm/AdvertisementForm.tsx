import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { postAdvertisement } from '../../../api/post/postAdvertisement';
import { putAdvertisement } from '../../../api/put/putAdvertisement';
import { getAdvertisement } from '../../../api/get/getAdvertisement';
import { getContract } from '../../../api/get/getContract';
import type { AdvertisementType, ContractType } from '../../../typings/type';

const AdvertisementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { company } = useParams();
  const [loading, setLoading] = useState(true);
  const [idPermission, setIdPermission] = useState<number | undefined>(undefined)
  const [fullDescription, setFullDescription] = useState("");
  const [title, setTitle] = useState("");
  const [quickDescription, setQuickDescription] = useState("");
  const [, setDate] = useState();
  const [hour, setHour] = useState("");
  const [wage, setWage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [idContract, setIdContract] = useState<number | undefined>();
  const [idCompany, setIdCompany] = useState<number>();
  const [contracts, setContracts] = useState<ContractType[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response
    const values: AdvertisementType = {
      title: title,
      quick_description: quickDescription,
      full_description: fullDescription,
      working_time: hour,
      wage: wage,
      isOnline: isOnline,
      contract_id: idContract,
      company_id: idCompany
    }

    if (!idPermission) values.offer_date = new Date().toISOString()
    idPermission != undefined ? response = await putAdvertisement(idPermission, values) : response = await postAdvertisement(values);
    if (response) navigate(`/admin/advertisement`);
  }

  const HandleCancel = () => {
    navigate(`/admin/advertisement`);
  }

  const handleCheckboxChange = () => {
    setIsOnline(!isOnline);
  }

  useEffect(() => {
    if (company != undefined) {
      setIdCompany(Number(company));
    }

    if (id != undefined) {
      const currentId = Number(id);
      setIdPermission(currentId);

      const fetchData = async () => {
        const existingAdvertisement = await getAdvertisement(currentId);
        setTitle(existingAdvertisement.title)
        setDate(existingAdvertisement.offerDate)
        setQuickDescription(existingAdvertisement.quick_description)
        setFullDescription(existingAdvertisement.full_description)
        setHour(existingAdvertisement.hour)
        setWage(existingAdvertisement.wage)
        setIsOnline(existingAdvertisement.isOnline)
        setIdContract(existingAdvertisement.contract.id);
        setIdCompany(existingAdvertisement.company.id);
        setLoading(false)
      }

      fetchData()
    } else {
      setLoading(false)
    }
    const fetchOption = async () => {
      const constracts = await getContract();
      setContracts(constracts)
    }
    fetchOption()
  }, [id])

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label htmlFor="quick_description">Quick description</label>
        <input
          type="text"
          name="quick_description"
          id="quick_description"
          value={quickDescription}
          onChange={e => setQuickDescription(e.target.value)}
          required
        />

        <label htmlFor="hour">Work hour</label>
        <input
          type="text"
          name="hour"
          id="hour"
          value={hour}
          onChange={e => setHour(e.target.value)}
          required
        />

        <label htmlFor="wage">Wage</label>
        <input
          type="text"
          name="wage"
          id="wage"
          value={wage}
          onChange={e => setWage(e.target.value)}
          required
        />

        <label htmlFor="isOnline">Is Online</label>
        <input
          type="checkbox"
          name="isOnline"
          id="isOnline"
          checked={isOnline}
          onChange={handleCheckboxChange}
        />

        <label htmlFor="contract">Contract</label>
        <select
          name="contract"
          id="contract"
          value={idContract}
          onChange={e => setIdContract(Number(e.target.value))}
          required
        >
          <option value="">Select Contract</option>
          {contracts.map((contract) => (
            <option
              key={contract.id}
              value={contract.id}
            >{contract.name}</option>
          ))}
        </select>

        {!company &&
          <>
            <label htmlFor="company">Company ID</label>
            <input
              type="number"
              name="company"
              id="company"
              value={idCompany}
              onChange={e => setIdCompany(Number(e.target.value))}
              required
              min={1}
            />
          </>}

        <label htmlFor="full_description">Full Description</label>
        <textarea
          name="full_description"
          id="full_description"
          value={fullDescription}
          onChange={e => setFullDescription(e.target.value)}
          required
        />

        <button type="submit">Enregister</button>
        <button onClick={HandleCancel}>Annuler</button>
      </form>
    </div>
  )
}

export default AdvertisementForm