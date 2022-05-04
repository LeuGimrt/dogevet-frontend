import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import LoadingPage from "../../pages/LoadingPage";

const ProtectedRoutes = () => {
  const { status } = useContext(AuthContext);
  if (status === "checking") return <LoadingPage />;
  if (status === "authenticated") return <Outlet />;

  return <Navigate to='/login' />;
};

export default ProtectedRoutes;
