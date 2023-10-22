import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { postAdvertisement } from '../../../api/post/postAdvertisement';
import { putAdvertisement } from '../../../api/put/putAdvertisement';
import { getAdvertisement } from '../../../api/get/getAdvertisement';
import { getNPContract } from '../../../api/get/getNPContract';
import { ScrollArea } from '../../ui/scroll-area';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Checkbox } from '../../ui/check-box';
import type { AdvertisementType, ContractType } from '../../../typings/type';

const AdvertisementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { company } = useParams();
  const [loading, setLoading] = useState(true);
  const [idAdvertisement, setIdAdvertisement] = useState<number | undefined>(undefined)
  const [fullDescription, setFullDescription] = useState("");
  const [title, setTitle] = useState("");
  const [quickDescription, setQuickDescription] = useState("");
  const [, setDate] = useState();
  const [hour, setHour] = useState("");
  const [wage, setWage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [idContract, setIdContract] = useState("");
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
      contract_id: Number(idContract),
      company_id: idCompany
    }

    if (!idAdvertisement) values.offer_date = new Date().toISOString()
    idAdvertisement != undefined ? response = await putAdvertisement(idAdvertisement, values) : response = await postAdvertisement(values);
    if (response) navigate(`/admin/advertisement`);
  }

  const HandleCancel = () => {
    navigate(`/admin/advertisement`);
  }

  useEffect(() => {
    if (company != undefined) {
      setIdCompany(Number(company));
    }

    if (id != undefined) {
      const currentId = Number(id);
      setIdAdvertisement(currentId);

      const fetchData = async () => {
        const existingAdvertisement = await getAdvertisement(currentId);
        setTitle(existingAdvertisement.title)
        setDate(existingAdvertisement.offerDate)
        setQuickDescription(existingAdvertisement.quick_description)
        setFullDescription(existingAdvertisement.full_description)
        setHour(existingAdvertisement.working_time)
        setWage(existingAdvertisement.wage)
        setIsOnline(existingAdvertisement.isOnline)
        setIdContract(existingAdvertisement.contract.id.toString());
        setIdCompany(existingAdvertisement.company.id);
        setLoading(false)
      }

      fetchData()
    } else {
      setLoading(false)
    }
    const fetchOption = async () => {
      const constracts = await getNPContract();
      setContracts(constracts)
    }
    fetchOption()
  }, [id])

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <div className=" mx-4">
      <h1 className="text-3xl font-bold my-3">{idAdvertisement ? `Update advertisement ${idAdvertisement}` : "Create new advertisement"}</h1>
      <form className="flex flex-col max-w-md gap-3" onSubmit={handleSubmit}>
       <ScrollArea className="h-[70vh]">
      <div className="m-1">
      <div className="flex flex-col justify-center content-center">
        <Label htmlFor="isOnline">Is Online</Label>
        <Checkbox defaultChecked={isOnline} onCheckedChange={()=>setIsOnline(!isOnline)}/>
        </div>
   
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="quick_description">Quick description</Label>
        <Input
          type="text"
          name="quick_description"
          id="quick_description"
          value={quickDescription}
          onChange={e => setQuickDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="hour">Work hour</Label>
        <Input
          type="text"
          name="hour"
          id="hour"
          value={hour}
          onChange={e => setHour(e.target.value)}
          required
        />
       </div>
      <div>
        <Label htmlFor="wage">Wage</Label>
        <Input
          type="text"
          name="wage"
          id="wage"
          value={wage}
          onChange={e => setWage(e.target.value)}
          required
        />
        </div>

        <div>
        <Label htmlFor="contract">Contract</Label>
        <Select
          name="contract"
          defaultValue={idContract}
          onValueChange={(value: string) => setIdContract(value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Contract" />
          </SelectTrigger>
          <SelectContent>
          {contracts.map((contract) => (
            <SelectItem
              key={contract.id}
              value={contract.id.toString()}
            >{contract.name}</SelectItem>
          ))}
          </SelectContent>
        </Select>
        </div>
        {!company &&
          <>
      <div>
            <Label htmlFor="company">Company ID</Label>
            <Input
              type="number"
              name="company"
              id="company"
              value={idCompany}
              onChange={e => setIdCompany(Number(e.target.value))}
              required
              min={1}
            />
          </div>
          </>}
      <div>
        <Label htmlFor="full_description">Full Description</Label>
        <Textarea
          name="full_description"
          id="full_description"
          value={fullDescription}
          onChange={e => setFullDescription(e.target.value)}
          required
        />
      </div>
      </div>
      </ScrollArea>
      <div className="grid grid-cols-2 w-full gap-2">
        <Button className="bg-green-700" type="submit">Save</Button>
        <Button className="bg-red-700" onClick={HandleCancel}>Cancel</Button>
      </div>
      </form>
    </div>
  )
}

export default AdvertisementForm