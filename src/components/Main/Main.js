import { defaultClothingItems } from "../Utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo } from "react";
import "./Main.css";

function Main({ weatherTemp, onSelectCard }) {
  const getWeatherTemp = () => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp >= 85) {
      return "warm";
    } else if (weatherTemp >= 65) {
      return "cold";
    }
  };

  // function filteredCards(card) {
  //   return card.weather === getWeatherTemp();
  // }

  // const clothingChoices = defaultClothingItems.filter(filteredCards);

  // const filteredCards = defaultClothingItems.filter((item) => {
  //   return item.weather.toLowerCase() === weatherType;
  //   console.log(filteredCards);
  // });

  return (
    <main className="main">
      <WeatherCard day={false} type="rain" weatherTemp={weatherTemp} />
      <section className="main__section" id="main-section">
        Today is {weatherTemp} F / You may want to wear:
        <ul className="main__items">
          {defaultClothingItems.map((item) => {
            return (
              <ItemCard
                clothingOption={item}
                onOpen="false"
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
