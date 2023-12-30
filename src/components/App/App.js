import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherForcast, parseWeatherData } from "../../utils/WeatherApi";
import { useEffect, useState } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
        <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
        <Footer />
        <AddItemModal
          isOpen={activeModal === "create"}
          onClose={handleCloseModal}
          name={"create"}
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
