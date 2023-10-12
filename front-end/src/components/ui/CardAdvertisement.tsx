type CardProps = {
    title: string;
    description: string;
}

const Card = ({title, description } : CardProps) => {
    return (
        <div className="bg-white rounded-2xl p-2">
            <h2 className="text-black text-lg font-medium mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <button className="text-blue-500 hover:bg-slate-300 font-bold py-2 px-4 rounded">
                Learn More
            </button>
        </div>
    );
};

export default Card;
