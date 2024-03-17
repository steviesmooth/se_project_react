import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({
  clothingItems,
  onSelectCard,
  onCreateModal,
  isLoggedIn,
  onCardLike,
}) => {
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
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ClothesSection;
