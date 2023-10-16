import { Link } from "react-router-dom";

type HeadersProps = {
    isAuthenticated?: boolean;
    onDisconnect?: () => void;
}

const Header = ({isAuthenticated, onDisconnect}:HeadersProps) => {

    return (
        <header className="p-20 bg-slate-300 flex justify-between items-center py-4">
            <h1 className="text-blue-700 text-2xl font-bold">JobBoard</h1>

            <Link to="/admin">Admin</Link>
            {isAuthenticated ? (
                <>
                    <Link to="/user">Profile</Link>
                    <button onClick={onDisconnect}>Disconnect</button>
                </>
            ) : (
                <Link to="/user">Login/Register</Link>
            )}

        </header>
    );
};

export default Header;
