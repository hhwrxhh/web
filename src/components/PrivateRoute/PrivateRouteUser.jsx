import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import checkUser from "./checkUser";

const PrivateRouteUser = () => {
  const tokenStr = sessionStorage.getItem("token");
  const [access, setAccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      checkUser(tokenStr)
        .then((userType) => {
          if (userType === "user") {
            setAccess(true);
          } else {
            setAccess(false);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error", error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return access ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteUser;
