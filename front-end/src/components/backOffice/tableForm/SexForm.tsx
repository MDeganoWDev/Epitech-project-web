import { useEffect, useState } from "react"
import { getSex } from "../../../api/get/getSex"
import { postSex } from "../../../api/post/postSex"
import { putSex } from "../../../api/put/putSex"
import { useNavigate, useParams } from "react-router-dom"
import type { SexType } from "../../../typings/type"

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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          name="name" 
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required 
        />
        
        <button type="submit">Enregister</button>
        <button onClick={HandleCancel}>Annuler</button>
      </form>
    </div>
  )
}

export default SexForm