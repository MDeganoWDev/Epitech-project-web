type RightPanelProps = {
    adInfo: {
        title: string;
        description: string;
    } | null;
};

const RightPanel: React.FC<RightPanelProps> = ({ adInfo }) => {

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/companies/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="bg-gray-100 p-4 mx-4">
            {adInfo ? (
                <>
                    <h2 className="text-black text-lg font-medium mb-2">
                        {adInfo.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{adInfo.description}</p>
                </>
            ) : (
                <p className="text-gray-600 mb-4">No ad to display</p>
            )}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchData}>
                Fetch Companies
            </button>
        </div>
    );
};

export default RightPanel;
