import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherForcast, parseWeatherData } from "../../utils/WeatherApi";
import { useEffect, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import * as api from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleSelectedCard = (card) => {
    setSelectedCard(card);
    setActiveModal("image");
  };

  const handleOpenModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitch = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (item) => {
    setClothingItems([item, ...clothingItems]);
    handleCloseModal();
  };

  const getClothingItems = () => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getClothingItems();
  }, []);

  useEffect(() => {
    getWeatherForcast()
      .then((data) => {
        const tempature = parseWeatherData(data);
        const location = data.name;
        setLocation(location);
        setTemp(tempature);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitch }}
      >
        <Header onCreateModal={handleOpenModal} location={location} />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">Profile</Route>
        </Switch>
        <Footer />
        <AddItemModal
          isOpen={activeModal === "create"}
          onClose={handleCloseModal}
          name={"create"}
          onAddItem={handleAddItemSubmit}
        />
        <ItemModal
          isOpen={activeModal === "image"}
          name={"image"}
          card={selectedCard}
          onClose={handleCloseModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
