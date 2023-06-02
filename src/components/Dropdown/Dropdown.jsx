import React from "react";
import { useDispatch } from "react-redux";

import { setFilterParams } from "../../redux/slices/filterSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Dropdown.scss";

const Dropdown = ({ selected, options }) => {
  const [isActive, setActive] = React.useState(false);
  const dispatch = useDispatch();

  const handleClick = ({ index, selected, item }) => {
    setActive(false);
    if (selected === "Price") {
      dispatch(setFilterParams({ [selected]: item }));
    } else if (selected === "Prescription") {
      dispatch(setFilterParams({ [selected]: item }));
    } else {
      dispatch(setFilterParams({ [selected]: index }));
    }
  };

  return (
    <div className="dropdown">
      <div
        role="button"
        tabIndex={-1}
        className="dropdown-btn"
        onClick={() => setActive(!isActive)}
      >
        {selected}
        <FontAwesomeIcon icon={isActive ? "angle-down" : "angle-right"} />
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((item, index) => (
            <div
              key={index}
              role="button"
              tabIndex={item}
              className="dropdown-item"
              onClick={() => {
                handleClick({ index, selected, item });
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
