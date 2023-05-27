import React, { useState, useEffect } from "react";
import axios from "axios";

import "../scss/admin.scss";
import { Link } from "react-router-dom";

function EditPillsTable() {
  const [pills, setPills] = useState([]);

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
              <Link to={`/admin/edit/pharmacy/${item.dosed_id}`}>
                <button>Edit</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EditPillsTable;
