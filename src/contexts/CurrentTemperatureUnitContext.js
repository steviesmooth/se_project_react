import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  CurrentTemperatureUnit: "C",
  handleToggleSwitch: () => {},
});

export default CurrentTemperatureUnitContext;
