import { useContext, useState } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);

  const handleLike = (item) => {
    onCardLike(item);
  };

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = isLoggedIn
    ? `${isLiked ? "card__like-btn_liked" : "card__like-btn"}`
    : "card__like-btn_hidden";

  return (
    <li className="card">
      <div className="card__info">
        <h5 className="card__name">{item.name}</h5>
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
        ></button>
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
