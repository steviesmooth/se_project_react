import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <li className="card">
      <div className="card__info">
        <h5 className="card__name">{item.name}</h5>
      </div>
      <img
        className="card__image"
        src={item.imageUrl}
        onClick={() => onSelectCard(item)}
        alt={item.name}
      />
    </li>
  );
};

export default ItemCard;
