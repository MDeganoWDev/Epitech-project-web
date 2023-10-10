import React from 'react';

interface CardProps {
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
    return (
        <div className="m-4 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-black text-lg font-medium mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <button className="text-blue-500 hover:bg-slate-300 font-bold py-2 px-4 rounded">
                Learn More
            </button>
        </div>
    );
};

export default Card;
