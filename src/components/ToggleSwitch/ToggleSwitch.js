import { useContext, useEffect, useState } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitch } = useContext(
    CurrentTemperatureUnitContext
  );

  const isChecked = currentTemperatureUnit === "C";
  const fahrenheitActive = currentTemperatureUnit === "F" ? "white" : "gray";
  const celciusActive = currentTemperatureUnit === "C" ? "white" : "gray";

  return (
    <div className="switch">
      <label className="switch__label" htmlFor="switch">
        <p className="switch__label_F" style={{ color: fahrenheitActive }}>
          F
        </p>
        <p className="switch__label_C" style={{ color: celciusActive }}>
          C
        </p>
        <input
          className="switch__checkbox"
          type="checkbox"
          id="switch"
          value={currentTemperatureUnit}
          checked={isChecked}
          onChange={handleToggleSwitch}
        />
        <span className={`switch__button`}></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
