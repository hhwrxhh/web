import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Dropdown.scss";

import { setFilterParams } from "../../redux/slices/filterSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";

function Dropdown({ selected, setSelected, options }) {
  const [isActive, setActive] = React.useState(false);
  const dispatch = useDispatch();

  let params = useSelector((state) => state.filterSlice.filterParams);

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
        <FontAwesomeIcon icon={isActive ? faAngleDown : faAngleRight} />
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
}

export default Dropdown;
