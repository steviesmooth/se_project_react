import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const ClothesSection = ({
  clothingItems,
  onSelectCard,
  onCreateModal,
  isLoggedIn,
  handleLike,
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes">
      <div className="clothes__header">
        <h2 className="clothes__header-title">Your items</h2>
        <button
          className="clothes__add-btn"
          type="button"
          onClick={onCreateModal}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes__section">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              item={item}
              onSelectCard={() => onSelectCard(item)}
              key={item._id}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
