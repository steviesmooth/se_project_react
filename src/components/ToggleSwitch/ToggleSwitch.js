import { useContext, useEffect, useState } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitch } = useContext(
    CurrentTemperatureUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "F");

  useEffect(
    () => setIsChecked(currentTemperatureUnit === "F"),
    [currentTemperatureUnit]
  );

  return (
    <div className="switch">
      <label className="switch__label">
        <p className="switch__label_F">F</p>
        <p className="switch__label_C">C</p>
        <input
          className="switch__checkbox"
          type="checkbox"
          id="switch"
          checked={isChecked}
          onChange={handleToggleSwitch}
        />
        <span className={`switch__button`}></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
