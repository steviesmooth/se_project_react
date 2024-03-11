import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  clothingItems,
  onCreateModal,
  onSelectCard,
  currentUser,
  onEditModal,
  handleLike,
  isLoggedIn,
  handleLogout,
}) => {
  return (
    <div className="profile">
      <SideBar
        currentUser={currentUser}
        handleLogout={handleLogout}
        onEditModal={onEditModal}
      />
      <ClothesSection
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
        clothingItems={clothingItems}
        isLoggedIn={isLoggedIn}
        handleLike={handleLike}
      />
    </div>
  );
};

export default Profile;
