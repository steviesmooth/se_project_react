import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

const Header = ({ onCreateModal, location }) => {
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
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add clothes
          </button>
        </div>
        <Link to="/profile">Steven Narak</Link>
        <div>
          <img src="../Ellipse 18.svg" alt="avatar-logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
