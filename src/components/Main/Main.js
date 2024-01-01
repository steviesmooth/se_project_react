// import { clothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo, useContext } from "react";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const currentTemp = weatherTemp?.temp?.[currentTemperatureUnit];

  const weatherType = useMemo(() => {
    if (currentTemp >= 86) {
      return "hot";
    } else if (currentTemp >= 66 && currentTemp <= 85) {
      return "warm";
    } else if (currentTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredCards = clothingItems.filter((card) => {
    return card.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard
        day={false}
        type="rain"
        weatherTemp={weatherTemp}
        currentTemp={currentTemp}
      />
      <section className="main__section" id="main-section">
        Today is {`${currentTemp}°${currentTemperatureUnit}`} / You may want to
        wear:
        <ul className="main__items">
          {filteredCards.map((item) => {
            return (
              <ItemCard
                item={item}
                onSelectCard={onSelectCard}
                key={item._id}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
