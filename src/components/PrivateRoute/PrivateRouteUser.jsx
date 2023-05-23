import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import checkUser from "./checkUser";

const PrivateRouteUser = () => {
  const tokenStr = sessionStorage.getItem("token");
  const [access, setAccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userType = await checkUser(tokenStr);
        if (userType === "user") {
          setAccess(true);
        } else {
          setAccess(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return access ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteUser;
