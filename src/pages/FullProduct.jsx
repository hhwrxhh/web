import React from "react";
import axios from "axios";
import NotFound from "./NotFound";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";
import "../scss/FullProduct.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faShoppingCart,
  faXmark,
  faCircleInfo,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const url = "http://127.0.0.1:5000/";

const FullProducts = () => {
  const params = useParams();
  const [briefInfo, setBriefInfo] = React.useState([]);

  const [item, setItem] = React.useState("");
  const [errorStatus, setErrorStatus] = React.useState(null);
  const [alternative, setAlternative] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function fillInfo(obj) {
    let tmpArr = [
      {
        title: "Country",
        value: obj.producer.producing_country,
      },
      {
        title: "Company",
        value: obj.producer.producing_company,
      },
      {
        title: "Weight",
        value: [obj.net_weight, obj.unit_of_measurement],
      },
      {
        title: "Physical Form",
        value: obj.physical_form,
      },
    ];
    setBriefInfo(tmpArr);
  }
  React.useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/subcategory/1/drug")
      .then((response) => {
        const arr = response.data;
        for (let j = 0; j < arr.length; j++) {
          const path = arr[j].image_path;
          arr[j].image_path = url + path;
        }
        setAlternative(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/drug/dosed/" + params.dosed_id)
      .then((response) => {
        response.data.image_path = url + response.data.image_path;
        setItem(response.data);
        fillInfo(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setErrorStatus(404);
        }
      });
  }, []);
  if (errorStatus === 404) {
    return <NotFound />;
  }

  const onClickAdd = () => {
    const tokenStr = sessionStorage.getItem("token");
    if (tokenStr === null || tokenStr.length === 0) {
      navigate("/login");
    }
    const product = {
      id: item.dosed_id,
      title: item.dosed_name,
      price: item.dosed_price,
      image: item.image_path,
    };
    dispatch(addItem(product));
    try {
      const response = axios.post(
        "http://127.0.0.1:5000/cart",
        JSON.stringify({
          fk_dosed_id: item.dosed_id,
          price: item.dosed_price,
          dosed_count: 1,
        }),
        {
          headers: {
            Authorization: `Bearer ${tokenStr}`,
            "Content-Type": "application/json",
          },
        }
      );
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
  };
  return (
    <div className="container-product">
      <div className="product-page">
        <div className="product-image">
          <img
            src={item.image_path}
            alt="product image"
            width="400"
            height="400"
          />
        </div>
        <div className="product-info">
          <h1>{item.dosed_name}</h1>
          <h1>{item.dosed_price}$</h1>
          <div className="stock">
            <span>Prescription: </span>
            <FontAwesomeIcon
              icon={item.for_a_prescription === "true" ? faCheck : faXmark}
            />
          </div>

          <div className="product-advantages">
            <p>Brief information</p>
            <ul>
              {briefInfo.map((item, index) => (
                <li key={index}>
                  <FontAwesomeIcon icon={faCircleInfo} />
                  <span>
                    {item.title}: {item.value}{" "}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="product-icons">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="smth"
              onClick={onClickAdd}
            />
          </div>
          <button className="btn">Buy Now</button>
        </div>
      </div>
      <div className="tabs">
        <nav className="tabs__items">
          <a href="#tab_01" className="tabs__item">
            <span>Description</span>
          </a>
          <a href="#tab_02" className="tabs__item">
            <span>SMTh</span>
          </a>
          <a href="#tab_03" className="tabs__item">
            <span>Alternative Products</span>
          </a>
        </nav>
        <div className="tabs__body">
          <div id="tab_01" className="tabs__block">
            {item.dosed_description}
          </div>
          <div id="tab_02" className="tabs__block">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui porro,
            repellendus consequatur praesentium doloribus delectus et
          </div>
          <div id="tab_03" className="tabs__block">
            {alternative.map((obj) => (
              <Link key={obj.dosed_id} to={`/product/${obj.dosed_id}`}>
                <p key={obj.dosed_id}>
                  {obj.dosed_name} {obj.dosed_price}$
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullProducts;
