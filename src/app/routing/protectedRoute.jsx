import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({
  children,
  accessRoles,
  redirectPath,
  isAuthRequired,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);
  console.log("userDetailsvvvvvvvvvvvv", userDetails);

  const token = localStorage.getItem("_token");
  const role = localStorage.getItem("role");
  //   const isUserAuthenticated = !!token;

  //   const userType = UserRoles[userDetails?.role];
  //   const isUserHasAccess = accessRoles?.includes(userType);

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  if (isAuthRequired && !token) {
    return (
      <>
        <Navigate to="/auth/login" />
        {children}
      </>
    );
  }

  if (token && role) {
    if (location?.pathname.includes("/customer") && role !== "C") {
      localStorage.clear();
      return (
        <>
          <Navigate to="/auth/login" />
          {children}
        </>
      );
    }
    if (location?.pathname.includes("/merchant") && role !== "M") {
      localStorage.clear();
      return (
        <>
          <Navigate to="/auth/login" />
          {children}
        </>
      );
    }
  }

  if (location?.pathname == "/auth/login" || location?.pathname == "/sign-up") {
    if (token && role === "C") {
      return <Navigate to="/customer/dashboard" />;
    }
    if (token && role === "M") {
      return <Navigate to="/merchant/dashboard" />;
    }
  }

  //   // For hard refresh with alreday login user
  if (isAuthRequired && token) {
    return children;
  }

  return children;
};
