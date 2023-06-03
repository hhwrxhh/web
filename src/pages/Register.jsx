import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../scss/register.scss";

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const regexEmail = /\S+@\S+\.\S+/;
const REGISTER_URL = "http://127.0.0.1:5000/user/register";

const Register = () => {
  const userRef = React.useRef(null);
  const errRef = React.useRef(null);

  const [userName, setUserName] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [validEmail, setValidEmail] = React.useState(false);
  const [validEmailFocus, setValidEmailFocus] = React.useState(false);

  const [pwd, setPwd] = React.useState("");
  const [validPwd, setValidPwd] = React.useState(false);
  const [pwdFocus, setPwdFocus] = React.useState(false);

  const [errMsg, setErrMsg] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    userRef.current.focus();
  }, []);

  React.useEffect(() => {
    const result = regexPassword.test(pwd);
    if (result) setValidPwd(true);
    else setValidPwd(false);
  }, [pwd]);

  React.useEffect(() => {
    const result = regexEmail.test(email);
    if (result) setValidEmail(true);
    else setValidEmail(false);
  }, [email]);

  React.useEffect(() => {
    setErrMsg("");
  }, [userName, email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const emailTest = regexEmail.test(email);
    const pwdTest = regexPassword.test(pwd);
    if (userName.length === 0 && !emailTest && !pwdTest) {
      alert("fault");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user_name: userName, email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUserName("");
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
      alert("Non Valid Data. User with this email already exitst");
      return;
    }
    alert("Success.Complete the login");
    navigate("/login");
  };
  return (
    <div className="container-regl">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign up</h1>
      <form autoComplete="off">
        <label htmlFor="userName">User Name:</label>
        <input
          type="text"
          id="userName"
          ref={userRef}
          onChange={(e) => setUserName(e.target.value)}
          autoComplete="off"
          placeholder="User Name"
        />

        <label>Email:</label>
        <input
          type="text"
          id="emailnote"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
          autoComplete="off"
          onFocus={() => setValidEmailFocus(true)}
          onBlur={() => setValidEmailFocus(false)}
          placeholder="Email"
        />
        <p
          id="pwdnote"
          className={
            validEmailFocus && !validEmail ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must include @ and domain
          <br />
          <span> For example, test@gmail.com </span>
          <br />
        </p>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          placeholder="Password"
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
        </p>
      </form>
      <div className="terms">
        <input type="checkbox" />
        <label>
          I agree to these <a href="#">Terms and Conditions</a>
        </label>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Sign up
      </button>
      <div className="member">
        Already a member?
        <a href="login.html">Login here</a>
      </div>
    </div>
  );
};

export default Register;
