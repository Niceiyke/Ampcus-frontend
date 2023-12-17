import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const IsPresidentAuth = () => {
  const { member } = useAuth();

  const location = useLocation();

  if (!member.is_president) {
    return <Navigate to="/dashboard" />;
  } else {
    return member.is_president ? (
      <Outlet />
    ) : (
      <Navigate to="/dashboard" state={{ from: location }} replace />
    );
  }
};
