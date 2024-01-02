import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp, currentTemp }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherOption = weatherOptions.find((item) => {
    return item.day === day && item.type === type;
  });
  if (!weatherTemp) return null;

  const imageSrcUrl = weatherOption.url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather__container">
        <div className="weather__info">{`${currentTemp}°${currentTemperatureUnit}`}</div>
        <img src={imageSrcUrl} className="weather__image" alt="weather-image" />
      </div>
    </section>
  );
};

export default WeatherCard;
