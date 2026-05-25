import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export const Navbar = () => {
    const {user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return(
        <nav className="bg-white border-b border-gray-200 px-3 flex justify-between item-center">
            <div className="flex item-center gap-6">
                <Link to="/tickets" className="font-semibold text-grey-800">
                    Ticket System
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                    {user?.firstName} ({user?.role})
                </span>
                <button 
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:underline"
                    >
                        Logout
                </button>
            </div>
        </nav>
    );
};