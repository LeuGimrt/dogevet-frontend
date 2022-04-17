import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoutes = () => {
  const { status } = useContext(AuthContext);
  if (status === "checking") return <div>Cargando...</div>;
  if (status === "authenticated") return <Outlet />;

  return <Navigate to='/login' />;
};

export default ProtectedRoutes;
