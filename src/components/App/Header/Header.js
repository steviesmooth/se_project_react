import "../Header/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src="../images/Logo.svg" alt="logo" />
        </div>
        <div>date</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button type="text">Add New Clothes</button>
        </div>
        <div>name</div>
        <div>
          <img src="../images/Ellipse 18.svg" alt="avatar-logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
