import { useEffect, useState } from "react"
import { getSex } from "../../../api/get/getSex"
import { postSex } from "../../../api/post/postSex"
import { putSex } from "../../../api/put/putSex"
import { useNavigate, useParams } from "react-router-dom"
import type { SexType } from "../../../typings/type"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"

const SexForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [idSex, setIdSex] = useState<number | undefined>(undefined)
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      let response
      const values : SexType = {
        name : name
      }
      
      idSex != undefined ? response = await putSex(idSex, values) : response = await postSex(values); 
      if (response) navigate(`/admin/sex`);
    }

    const HandleCancel = () => {
      navigate(`/admin/sex`);
    }
    
    useEffect(()=>{
      if (id != undefined){      
        const currentId = Number(id);
        setIdSex(currentId);

        const fetchData = async () => {
            const existingSex = await getSex(currentId);
            setName(existingSex.name)
            setLoading(false);
        }      

        fetchData()
      } else {
        setLoading(false)
      }
    }, [id])

    if (loading) {
      return <div>Loading</div>
    }

  return (
    <div className=" mx-4">
    <h1 className="text-3xl font-bold my-3">{idSex ? `Update gender ${idSex}` : "Create new gender"}</h1>
      <form className=" max-w-md gap-3 flex flex-col" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            type="text" 
            name="name" 
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required 
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-2">
          <Button className="bg-green-700" type="submit">Save</Button>
          <Button className="bg-red-700" onClick={HandleCancel}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}

export default SexForm