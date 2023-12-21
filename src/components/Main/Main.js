import { defaultClothingItems } from "../Utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo } from "react";

function Main({ weatherTemp, onSelectCard }) {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp >= 85) {
      return "warm";
    } else if (weatherTemp >= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });
  return (
    <main>
      <WeatherCard day={false} type="rain" weatherTemp={weatherTemp} />
      <section className="card__section" id="card-section">
        Today is {weatherTemp} F / You may want to wear:
        <ul className="card__items">
          {filteredCards.map((item) => {
            <ItemCard item={item} onSelectCard={onSelectCard} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
