import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeBtn from "../../Like button.svg";
import isLikedBtn from "../../isLiked.svg";

const ItemCard = ({ item, onSelectCard, onCardLike, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((user) => user === currentUser._id);

  const itemLikeButtonClassName = isLoggedIn
    ? `${isLiked ? "card__like-btn_liked" : "card__like-btn"}`
    : "card__like-btn_hidden";

  const handeLike = () => {
    debugger;
    console.log(item);
    const id = item._id;
    onCardLike({ id, isLiked, currentUser });
  };

  return (
    <li className="card">
      <div className="card__info">
        <h5 className="card__name">{item.name}</h5>
        <button
          className={itemLikeButtonClassName}
          src={isLiked ? isLikedBtn : likeBtn}
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
