import React from "react";
import axios from "axios";

import imageProfile from "../assets/img/test.png"
import style from "../scss/profile.module.scss";

const PROFILE_URL = "http://127.0.0.1:5000/user";

const Profile = ()  => {
  const [user, setUser] = React.useState({});
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    const tokenStr = sessionStorage.getItem("token");
    const fetchUser = async () => {
      try {
        const response = await axios.get(PROFILE_URL, {
          headers: { Authorization: `Bearer ${tokenStr}` },
        });
        setUser(response?.data);
      } catch (err) {
        if (!err?.response) {
          alert("No Server Response");
          return;
        }
        if (err.response?.status === 400) {
          alert("Some fields are empty");
        }
      }
    };
    fetchUser();
  }, []);

  async function handleSubmit(name) {
    const tokenStr = sessionStorage.getItem("token");
    if (name !== "") {
      try {
        const response = await axios.put(
          PROFILE_URL,
          { user_name: name },
          {
            headers: { Authorization: `Bearer ${tokenStr}` },
          }
        );
        setUser(response?.data);
      } catch (err) {
        if (!err?.response) {
          alert("No Server Response");
          return;
        }
        if (err.response?.status === 400) {
          alert("Some fields are empty");
        }
      }
    }
  }
  return (
    <div className={style.container}>
      <div className={style.profile}>
        <div className={style.profilePicture}>
          <img src={imageProfile} alt="Product 2" />
        </div>
        <div className={style.profileInfo}>
          <h1>{user.user_name} </h1>
          <p>
            <span className={style.label}>Email:</span>{" "}
            <span>{user.email}</span>
          </p>
        </div>
      </div>
      <div className={style.editProfile}>
        <h2>Edit Profile</h2>
        <form>
          <label className={style.Label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={user.user_name}
            className={style.phone}
            onChange={(e) => setUserName(e.target.value)}
          />
        </form>
        <button
          type="submit"
          className={style.save}
          onClick={() => handleSubmit(userName)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Profile;
