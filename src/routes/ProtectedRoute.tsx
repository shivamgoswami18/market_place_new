import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAllowed?: boolean;
  redirectPath?: string;
  children: ReactNode;
};

const ProtectedRoute = ({
  isAllowed = true,
  redirectPath = `${import.meta.env.BASE_URL}sign-in`,
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;

