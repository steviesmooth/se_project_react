import { defaultClothingItems } from "../Utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherTemp, onSelectCard }) {
  return (
    <main>
      <WeatherCard day={false} type="rain" weatherTemp="75°" />
      <section className="card__section" id="card-section">
        Today is {weatherTemp} F / You may want to wear:
        <div className="card__items">
          {defaultClothingItems.map((item) => {
            return <ItemCard item={item} onSelectCard={onSelectCard} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
