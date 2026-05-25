import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const setAuth = useAuthStore((s) => s.setAuth);
    const navigate = useNavigate();

    const handleSubmite = async () =>{
        if (!email || !password){
            setError("Fill in all fields.")
            return;
        }
        setLoading(true);
        setError("");
        try{
            const data = await login(email, password);
            setAuth(data);
            navigate("/tickets");
        }catch{
            setError("Invalid email or password");
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="gb-white p-8 rounded-xl shadow-sm w-full max-w-sm">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign in</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-50  text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <input
                        type="emal"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border corder-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus: ring-2 focus-ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter:" && handleSubmite()}
                        className="border corder-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus: ring-2 focus-ring-blue-500"
                    />
                    <button
                        onClick={handleSubmite}
                        disabled={loading}
                        className="bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Signing in...": "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
};