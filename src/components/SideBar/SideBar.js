import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ onEditModal, handleLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar === "" ? (
          <div className="sidebar__user-image_holder">
            {currentUser?.name[0]}
          </div>
        ) : (
          <img
            className="sidebar__user-image"
            alt="user-logo"
            src={currentUser?.avatar}
          />
        )}
        <h2 className="siderbar__user-name" alt="user-name">
          {currentUser?.name}
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
