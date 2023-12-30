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
          <img src="../Logo.svg" alt="logo" />
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
            + Add New Clothes
          </button>
        </div>
        <div>Steven Narak</div>
        <div>
          <img src="../Ellipse 18.svg" alt="avatar-logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
