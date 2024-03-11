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
import Profile from "../Profile/Profile";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import { authorize, getUser, register } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    _id: "",
  });

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
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleUserModal = () => {
    activeModal === "login"
      ? setActiveModal("register")
      : setActiveModal("login");
  };

  const handleSetError = () => {
    setError(false);
  };

  const handleDeleteItem = () => {
    api
      .deleteItems(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    api
      .addItems({ name, imageUrl, weather })
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
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

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
      getUser(jwt)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoggedIn]);

  const handleAuthorization = (email, password) => {
    setError(false);
    authorize(email, password)
      .then(() => {
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  const handleRegister = ({ name, email, avatar, password }) => {
    return register({ name, email, avatar, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitch }}
        >
          <Header
            onCreateModal={handleOpenModal}
            location={location}
            onLoginModal={() => {
              setActiveModal("login");
            }}
            onRegisterModal={() => {
              setActiveModal("register");
            }}
            isLoggedIn={isLoggedIn}
          />
          <Switch>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile">
              <Profile
                clothingItems={clothingItems}
                onSelectCard={handleSelectedCard}
                onCreateModal={handleOpenModal}
              />
            </ProtectedRoute>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            </Route>
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
            onDelete={handleDeleteItem}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            name={"register"}
            onClose={handleCloseModal}
            handleRegister={handleRegister}
            handleUserModal={handleUserModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            name={"login"}
            onClose={handleCloseModal}
            handleUserModal={handleUserModal}
            handleLogin={handleAuthorization}
            error={error}
            setError={handleSetError}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
