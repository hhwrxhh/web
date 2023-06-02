import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import "../scss/admin.scss";

const EditPillsTable = () => {
  const [pills, setPills] = useState([]);
  const tokenStr = sessionStorage.getItem("token");
  
  const fetchPills = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/drug/dosed");
      setPills(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPills();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/drug/dosed/ ${id}`, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      });
      fetchPills();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {pills.map((item) => (
          <tr key={item.dosed_id}>
            <td>{item.dosed_name}</td>
            <td>{item.dosed_price}</td>
            <td>
              <div>
                <Link to={`/admin/edit/pharmacy/${item.dosed_id}`}>
                  <button>Edit</button>
                </Link>
              </div>
              <div>
                <button onClick={() => handleDeleteUser(item.dosed_id)}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditPillsTable;
