import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import style from "../scss/editPills.module.scss";

const EDIT_URL = "http://127.0.0.1:5000/drug/dosed/";

const EditPills = () =>  {
  const routeParams = useParams();
  const navigate = useNavigate();

  const [dosedName, setDosedName] = React.useState("");
  const [dosedPrice, setDosedPrice] = React.useState("");
  const [dosedDescription, setDosedDescription] = React.useState("");

  async function handleSubmit(name) {
    const tokenStr = sessionStorage.getItem("token");
    try {
      const response = await axios.put(
        EDIT_URL + routeParams.dosed_id,
        {
          dosed_name: dosedName,
          dosed_price: dosedPrice,
          dosed_description: dosedDescription,
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      );
      navigate("/products");
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
  return (
    <div className={style.container}>
      <h1 className={style.title}>Edit Medication</h1>
      <form className={style.form_}>
        <div className={style.form_group}>
          <label className={style.label_} htmlFor="name">
            Name:
          </label>
          <input
            className={style.input_}
            type="text"
            id="name"
            name="name"
            required
            onChange={(e) => setDosedName(e.target.value)}
          />
        </div>
        <div className={style.form_group}>
          <label className={style.label_} htmlFor="price">
            Price:
          </label>
          <input
            className={style.input_}
            type="number"
            step="0.01"
            id="price"
            name="price"
            required
            onChange={(e) => setDosedPrice(e.target.value)}
          />
        </div>

        <div className={style.form_group}>
          <label className={style.label_} htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            onChange={(e) => setDosedDescription(e.target.value)}
          ></textarea>
        </div>
        <br></br>
        <button className={style.btn_submit} onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditPills;
