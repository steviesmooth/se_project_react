import React, { useState } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike, isLoggedIn }) => {
  const { currentUser } = React.useContext(CurrentUserContext);
  const id = item._id;
  const [isLiked, setIsLiked] = useState(
    item.likes.some((user) => user === currentUser?._id)
  );

  const itemLikeButtonClassName = isLoggedIn
    ? `${isLiked ? "card__like-btn_liked" : "card__like-btn"}`
    : "card__like-btn_hidden";

  const handeLike = () => {
    debugger;
    onCardLike(id, isLiked);
    setIsLiked(!isLiked);
  };

  return (
    <li className="card">
      <div className="card__info">
        <h5 className="card__name">{item.name}</h5>
        <button
          className={itemLikeButtonClassName}
          onClick={handeLike}
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
