import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface Props{
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children } : Props) => {
    const token = useAuthStore((s) => s.token);
    return token ? <>{children}</> : <Navigate to="/login" replace/>;
}