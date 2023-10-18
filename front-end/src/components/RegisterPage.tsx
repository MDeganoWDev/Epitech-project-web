import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { SexType, PermissionType } from "../typings/type";
import { useAuthStore } from "../store/authStore";

const RegisterPage = () => {
    const navigate = useNavigate();
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [phone, setPhone] = useState("");
    const [sex, setSex] = useState(0);
    const [sexOptions, setSexOptions] = useState<SexType[]>([]);
    const [permissionsOptions, setPermissionsOptions] = useState<PermissionType[]>([]);
    const [selectedPermission, setSelectedPermission] = useState<number | string>('');


    useEffect(() => {
        const fetchSexOptions = async () => {
            try {
                const response = await fetch("http://localhost:8000/sex/");
                if (response.ok) {
                    const data = await response.json();
                    console.log("Sex Options:", data);
                    setSexOptions(data);
                } else {
                    console.error("Error getting sex options");
                }
            } catch (error) {
                console.error("Error getting sex options:", error);
            }
        };

        const fetchPermissions = async () => {
            try {
                const response = await fetch("http://localhost:8000/permission/");
                if (response.ok) {
                    const data: PermissionType[] = await response.json();
                    console.log("Permission Options:", data);
                    // Filter and set the permission options (id 3 and 4)
                    const filteredOptions = data.filter(option => option.id === 3 || option.id === 4);
                    setPermissionsOptions(filteredOptions);
                } else {
                    console.error("Error getting permission options");
                }
            } catch (error) {
                console.error("Error getting permission options:", error);
            }
        };

        fetchPermissions();

        fetchSexOptions();
    }, []);

    const getPermissionLabel = (permissionId: number | undefined): string => {
        switch (permissionId) {
            case 2:
                return "post offers. I'm a company";
            case 3:
                return "apply to offers";
            default:
                return "";
        }
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {
            username: email,
            password: password,
        };
        try {
            const response = await fetch("http://localhost:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                document.cookie = `token=${data.token}`;
                setAuthenticated(true);
                navigate(-1);
            } else {
                const errorData = await response.json();
                console.error("Login failed:", errorData);
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
        }
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = {
            email: email,
            password: password,
            firstname: firstName,
            lastname: lastName,
            sex_id: sex,
            phone: phone,
            permission_id: selectedPermission,
        };

        try {
            const response = await fetch("http://localhost:8000/utilisateurs/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registration successful:", data);
                document.cookie = `token=${data.token}`;
                setAuthenticated(true);
                navigate(-1);
            } else {
                const errorData = await response.json();
                console.error("Registration failed:", errorData);
            }
        } catch (error) {
            console.error("Error occurred during registration:", error);
        }
    };

    return (
        <div>
            <h1>{isLogin ? "Login" : "Register"}</h1>
            <form onSubmit={(event) => isLogin ? handleLogin(event) : handleRegister(event)}>
                <label>
                    email:
                    <input
                        type="text"
                        value={email}
                        onChange={(event) => setemail(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                {!isLogin && <>
                    <label>
                        First name:
                        <input
                            type="firstName"
                            value={firstName}
                            onChange={(event) => setFirst(event.target.value)}
                        />
                    </label>
                    <label>
                        Last name:
                        <input
                            type="lastName"
                            value={lastName}
                            onChange={(event) => setLast(event.target.value)}
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="phone"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </label>
                    <label>
                        Sex:

                        <select value={sex} onChange={(event) => setSex(parseInt(event.target.value))}>
                            <option value="">Select...</option>
                            {sexOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        I want to:
                        <select value={selectedPermission} onChange={(event) => setSelectedPermission(parseInt(event.target.value))}>
                            <option value="">Select...</option>
                            {permissionsOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {getPermissionLabel(option.id)}
                                </option>
                            ))}
                        </select>
                    </label>
                </>}
                <br />
                <button type="submit">{isLogin ? "Login" : "Register"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "No account? Register here" : "I already have an account. Login here"}
            </button>
        </div>
    );
};

export default RegisterPage;
