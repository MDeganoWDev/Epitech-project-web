import { useAdvertisementStore } from "../../store/advertisementStore";

type CardProps = {
    id? : number
    title: string;
    description: string;
}

const Card = ({id, title, description } : CardProps) => {
    const setSelectedId = useAdvertisementStore((state)=> state.setSelectedId)
    const showThisAdvertisementHandler = () =>{
        setSelectedId(id)
    }

    return (
        <div className="bg-white rounded-2xl p-2">
            <h2 className="text-black text-lg font-medium mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <button 
            className="text-blue-500 hover:bg-slate-300 font-bold py-2 px-4 rounded"
            onClick={showThisAdvertisementHandler}
            >
                Learn More
            </button>
        </div>
    );
};

export default Card;
