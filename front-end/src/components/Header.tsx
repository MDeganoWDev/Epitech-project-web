import { Link } from "react-router-dom";

const Header = () => {

    return (
        <header className="p-20 bg-slate-300 flex justify-between items-center py-4">
            <h1 className="text-blue-700 text-2xl font-bold"><Link to="/">Job board</Link></h1>

            <Link to="/admin">Admin</Link>
            <Link to="/user">Login/register</Link>
        </header>
    );
};

export default Header;
