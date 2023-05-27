import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import checkUser from "./checkUser";

const PrivateRouteAdmin = () => {
  const tokenStr = sessionStorage.getItem("token");
  const [access, setAccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userType = await checkUser(tokenStr);
        if (userType === "admin") {
          setAccess(true);
        } else {
          setAccess(false);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return access ? <Outlet /> : <Navigate to="*" />;
};

export default PrivateRouteAdmin;
