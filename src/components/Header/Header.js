import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const Header = ({
  onCreateModal,
  location,
  isLoggedIn,
  onLoginModal,
  onRegisterModal,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src="../Logo.svg" alt="logo" />
          </Link>
        </div>
        <div>
          {currentDate}, {location}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        {isLoggedIn ? (
          <div>
            <button
              className="header__button"
              type="text"
              onClick={onCreateModal}
            >
              + Add clothes
            </button>
          </div>
        ) : (
          <button
            className="header__button"
            type="text"
            onClick={onRegisterModal}
          >
            Sign up
          </button>
        )}
        {isLoggedIn ? (
          <Link to="/profile">
            <h2 className="header__user-name">{currentUser?.name}</h2>
            {currentUser?.avatar === "" ? (
              <div className="header__user-img-text">
                {currentUser?.name[0]}
              </div>
            ) : (
              <div className="header__user-img">
                <img
                  src={currentUser?.avatar}
                  alt="avatar-logo"
                  className="header__user-img"
                />
              </div>
            )}
          </Link>
        ) : (
          <button className="header__button" type="text" onClick={onLoginModal}>
            Log in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
