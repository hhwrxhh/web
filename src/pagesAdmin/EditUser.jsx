import React, { useState, useEffect } from "react";
import axios from "axios";

import "../scss/admin.scss";

const EditUser = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/user/all");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/user/${userId}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id}>
            <td>{user.user_name}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => handleDeleteUser(user.user_id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditUser;
