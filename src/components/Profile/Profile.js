import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  clothingItems,
  onCreateModal,
  onSelectCard,
  currentUser,
  onEditModal,
  isLoggedIn,
  handleLogout,
}) => {
  const userClothes = clothingItems.filter(
    (items) => items._id === currentUser?._id
  );
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
        clothingItems={userClothes}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default Profile;
