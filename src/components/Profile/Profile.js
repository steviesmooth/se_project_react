import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Profile = ({
  clothingItems,
  onCreateModal,
  onSelectCard,
  onEditModal,
  isLoggedIn,
  handleLogout,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const userClothes = clothingItems.filter(
    (items) => items?.owner === currentUser?._id
  );
  return (
    <div className="profile">
      <SideBar handleLogout={handleLogout} onEditModal={onEditModal} />
      <ClothesSection
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
        clothingItems={userClothes}
        isLoggedIn={isLoggedIn}
        onCardLike={onCardLike}
      />
    </div>
  );
};

export default Profile;
