import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";
import { insertIcon, deleteIcon } from "../redux/slices/iconSLice";

import "../scss/register.scss";

const LOGIN_URL = "http://127.0.0.1:5000/user/login";
const regexEmail = /\S+@\S+\.\S+/;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [validEmail, setValidEmail] = React.useState(false);
  const [validEmailFocus, setValidEmailFocus] = React.useState(false);

  const [pwd, setPwd] = React.useState("");

  React.useEffect(() => {
    const result = regexEmail.test(email);
    if (result) setValidEmail(true);
    else setValidEmail(false);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    if (pwd === "" && email === "") {
      alert("fault");
      return;
    }
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.token !== "") {
        sessionStorage.setItem("token", response.data.token);
      }
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
        return;
      }
      if (err.response?.status === 400) {
        alert("Some fields are empty");
        return;
      }
      if (err.response?.status === 401) {
        alert("Could no verify");
        return;
      }
    }
    dispatch(insertIcon(faRightFromBracket));

    navigate("/products");
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <input
          type="text"
          id="emailnote"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="emailnote"
          autoComplete="off"
          placeholder="Email"
          onFocus={() => setValidEmailFocus(true)}
          onBlur={() => setValidEmailFocus(false)}
        />
        <p
          id="emailnote"
          className={
            validEmailFocus && !validEmail ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must include @ and domain
          <br />
          For example, test@domain
        </p>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          aria-describedby="pwdnote"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <div className="recover">
          <a href="#">Forgot the password?</a>
        </div>
      </form>
      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
      <div className="member">
        Not a member?
        <a href="#" onClick={() => navigate("/register")}>
          Register here
        </a>
      </div>
    </div>
  );
}

export default Login;
