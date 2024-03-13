import { Navigate, Outlet } from "react-router-dom";
import Nav from "./nav";
import { useConvexAuth } from "convex/react";

const ProtectedRoute = () => {
  const { isAuthenticated } = useConvexAuth();
  return (
    <>
      {isAuthenticated ? (
        <>
          <Nav />
          <div>
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
