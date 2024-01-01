import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img
        className="sidebar__user-image"
        alt="user-image"
        src="../Ellipse 18.svg"
      />
      <h2 className="siderbar__user-name" alt="user-name">
        Steven Narak
      </h2>
    </div>
  );
};

export default SideBar;
