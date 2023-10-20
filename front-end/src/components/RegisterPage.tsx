import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { SexType, PermissionType, CompanyType } from "../typings/type";
import { useAuthStore } from "../store/authStore";
import { getNPSex } from "../api/get/getNPSex";
import { getNPPermission } from "../api/get/getNPPermission";
import { postCompany } from "../api/post/postCompany";

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
    const [selectedPermission, setSelectedPermission] = useState<number | null>(null);
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        const fetchSexOptions = async () => {
            setSexOptions(await getNPSex());
        };

        const fetchPermissions = async () => {
            const npPerms = await getNPPermission();
            const filteredOptions = npPerms.filter(option => option.id === 2 || option.id === 3);
            setPermissionsOptions(filteredOptions);
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
                useAuthStore.setState({ token: data.token });
                setAuthenticated(true);
                navigate('/');
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
                useAuthStore.setState({ token: data.token });
                setAuthenticated(true);

                if (selectedPermission === 2 && companyName) {
                    const companyFormData: CompanyType = {
                        name: companyName,
                        user_id: data.id,
                        address: "",
                    };
                    await postCompany(companyFormData);
                }
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error("Registration failed:", errorData);
            }
        } catch (error) {
            console.error("Error occurred during registration:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">{isLogin ? "Login" : "Register"}</h1>
            <form className="w-full max-w-md" onSubmit={(event) => isLogin ? handleLogin(event) : handleRegister(event)}>
                <div className="mb-4">
                    <label className="block text-primary font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        value={email}
                        onChange={(event) => setemail(event.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-primary font-bold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                {!isLogin && (
                    <>
                        <div className="mb-4">
                            <label className="block text-primary font-bold mb-2" htmlFor="firstName">
                                First name:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(event) => setFirst(event.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-primary font-bold mb-2" htmlFor="lastName">
                                Last name:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(event) => setLast(event.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-primary font-bold mb-2" htmlFor="phone">
                                Phone:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
                                id="phone"
                                type="text"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-primary font-bold mb-2" htmlFor="sex">
                                Sex:
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
                                id="sex"
                                value={sex}
                                onChange={(event) => setSex(parseInt(event.target.value))}
                            >
                                <option value="">Select...</option>
                                {sexOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-primary font-bold mb-2" htmlFor="permission">
                                I want to:
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
                                id="permission"
                                value={selectedPermission ?? ""}
                                onChange={(event) => setSelectedPermission(parseInt(event.target.value))}
                            >
                                <option value="">Select...</option>
                                {permissionsOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {getPermissionLabel(option.id)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedPermission === 2 && (
                            <div className="mb-4">
                                <label className="block text-primary font-bold mb-2" htmlFor="companyName">
                                    Company Name:
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
                                    id="companyName"
                                    type="text"
                                    value={companyName}
                                    onChange={(event) => setCompanyName(event.target.value)}
                                />
                            </div>
                        )}
                    </>
                )}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                    <button
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "No account? Register here" : "I already have an account. Login here"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
