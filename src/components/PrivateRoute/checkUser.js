import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { insertIconsArray } from "../../redux/slices/iconSLice";

import iconTmp from "../../utils/imports";

const CHECK_USER = "http://127.0.0.1:5000/user/role";

async function checkUser(tokenStr) {
  if (tokenStr === null) return null;
  try {
    const response = await axios.get(CHECK_USER, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });
    if (response.data.Success === "User") {
      return "user";
    } else if (response.data.Success === "Admin") {
      return "admin";
    } else {
      throw new Error("Unknown user type");
    }
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
}

export default checkUser;
