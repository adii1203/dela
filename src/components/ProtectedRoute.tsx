import { Navigate, Outlet } from "react-router-dom";
import Nav from "./nav";
import { useConvexAuth } from "convex/react";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <>
      {isLoading ? null : isAuthenticated ? (
        <>
          <div className="flex">
            <Nav />
            <Outlet />
          </div>
        </>
      ) : (
        <Navigate to={"/"} replace={true} />
      )}
    </>
  );
};

export default ProtectedRoute;
