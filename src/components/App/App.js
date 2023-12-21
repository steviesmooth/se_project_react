// import logo from "./logo.svg";
import "./App.css";
import Header from "./Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherForcast, parseWeatherData } from "../Utils/WeatherApi";
import { useEffect, useState } from "react";

function App() {
  const weatherTemp = "75°";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

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

  useEffect(() => {
    getWeatherForcast().then((data) => {
      const tempature = parseWeatherData(data);
      console.log(tempature);
      setTemp(temp);
    });
  }, []);

  return (
    <div className="app">
      <Header onCreateModal={handleOpenModal} />
      <Main weatherTemp={weatherTemp} onSelectCard={handleSelectedCard} />
      <Footer />
      <AddItemModal
        onOpen={activeModal === "create"}
        onClose={handleCloseModal}
        name={"create"}
      />
      <ItemModal
        onOpen={activeModal === "image"}
        name={"image"}
        card={selectedCard}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
