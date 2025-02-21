import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function ProtectedRoute({children}:{children:any}){
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");
    useEffect(() => {
        if (!token) {
            return navigate("/login");
        }
    }, [navigate, token]);
    return children;
}
