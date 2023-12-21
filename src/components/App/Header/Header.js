import "../Header/Header.css";

const Header = ({ onCreateModal }) => {
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
        <div>{currentDate}</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add New Clothes
          </button>
        </div>
        <div>name</div>
        <div>
          <img src="../Ellipse 18.svg" alt="avatar-logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
