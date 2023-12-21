import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <li className="card">
      <div>
        <h5 className="card__title">{item.name}</h5>
        <img
          className="card__image"
          src={item.link}
          onClick={() => onSelectCard(item)}
          alt={item.name}
        />
      </div>
    </li>
  );
};

export default ItemCard;
