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

import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
    debugger;

    api
      .addItems({ name, imageUrl, weather, owner: currentUser?._id })
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err));
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
    api
      .getItems()
      .then((items) => {
        setClothingItems(items);
        handleCloseModal();
      })
      .catch(console.error());
  }, [isLoggedIn]);

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
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      setIsLoggedIn(true);
      getUser(token)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoggedIn]);

  const handleLogin = (email, password) => {
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

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  const handleRegister = ({ name, email, avatar, password }) => {
    return register({ name, email, avatar, password })
      .then((currentUser) => {
        setIsLoggedIn(true);
        setCurrentUser(currentUser);
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  };

  const handleUserUpdate = ({ name, avatar, token }) => {
    api
      .updateUser(name, avatar, token)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
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
                currentUser={currentUser}
                clothingItems={clothingItems}
                onSelectCard={handleSelectedCard}
                onCreateModal={handleOpenModal}
                onEditModal={() => {
                  setActiveModal("update");
                }}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
              />
            </ProtectedRoute>
            <Route path={"/"}>
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
                isLoggedIn={isLoggedIn}
                onCardLike={handleCardLike}
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
            handleLogin={handleLogin}
            error={error}
            setError={handleSetError}
          />
          <EditProfileModal
            isOpen={activeModal === "update"}
            name={"update"}
            onClose={handleCloseModal}
            handleUserUpdate={handleUserUpdate}
            currentUser={currentUser}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
