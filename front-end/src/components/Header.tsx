import { useState } from "react";

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleConnexionClick = async () => {
        try {
            const response = await fetch("http://localhost:8000/utilisateurs/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    firstname: "John", // Provide a default value or get the value from user input
                    lastname: "Doe",   // Provide a default value or get the value from user input
                    phone: "123456789", // Provide a default value or get the value from user input
                    email: "johnny@example.com", // Provide a default value or get the value from user input
                    sex: 1,           // Provide a default value or get the value from user input
                    permission: 1, // Provide a default value or get the value from user input
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Assuming the API response contains a token field
                const authToken = data.token;
                console.log(authToken);

                // Now you can store the authToken in your application state or localStorage
                // Handle login logic here, e.g., setLoggedIn(true) and store the token
            } else {
                // Handle error cases, e.g., display an error message to the user
                console.error("Error creating utilisateur:", data.detail);
            }
        } catch (error) {
            console.error("Error creating utilisateur:", error);
        }
    };


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
        </header>
    );
};

export default Header;
