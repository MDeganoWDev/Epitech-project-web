import { Link } from "react-router-dom";

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    
    return (
        <header className="p-20 bg-slate-300 flex justify-between items-center py-4">
            <h1 className="text-blue-700 text-2xl font-bold">JobBoard</h1>
            {isLoggedIn ? (
                <div>
                    <button className="bg-slate-300 hover:bg-slate-50 text-blue-500 font-bold py-2 px-4 rounded">
                        Account
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Log out
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mr-2 p-2 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mr-2 p-2 rounded"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleConnexionClick}
                    >
                        Connexion
                    </button>
                </div>
            )}
            <Link to="/admin">Admin</Link>
        </header>
    );
};

export default Header;
