import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() 
{
  const { user, loading } = useAuth();

  if (loading) {
     return (
            <div className="d-flex align-items-center justify-content-center vh-100">
              <div className="custom-spinner"></div>
            </div>
     )
  }; 

  if (user) {
     return ( <Outlet /> )
  }
  else{
    localStorage.clear();
    return ( <Navigate to="/connexion" replace /> )
  }

  // return user ? <Outlet /> : <Navigate to="/404" replace />;
}
