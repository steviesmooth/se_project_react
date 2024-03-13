import "./SideBar.css";

const SideBar = ({ currentUser, onEditModal, handleLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {currentUser.avatar === "" ? (
          <div className="sidebar__user-image_holder">
            {currentUser.name[0]}
          </div>
        ) : (
          <img
            className="sidebar__user-image"
            alt="user-image"
            src={currentUser.avatar}
          />
        )}
        <h2 className="siderbar__user-name" alt="user-name">
          {currentUser.name}
        </h2>
      </div>
      <button className="sidebar__button" onClick={onEditModal}>
        Change profile data
      </button>
      <button className="sidebar__button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default SideBar;
