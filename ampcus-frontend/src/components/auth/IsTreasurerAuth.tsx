import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const IsTreasurertAuth = () => {
  const { member } = useAuth();

  const location = useLocation();

  if (!member.is_treasurer) {
    return <Navigate to="/dashboard" />;
  } else {
    return member.is_treasurer ? (
      <Outlet />
    ) : (
      <Navigate to="/dashboard" state={{ from: location }} replace />
    );
  }
};
