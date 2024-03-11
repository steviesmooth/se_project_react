import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const ItemModal = ({ isOpen, onClose, card, name, onDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `item-modal__delete-btn ${
    isOwn ? "item-modal__delete-btn_visible" : "item-modal__delete-btn_hidden"
  }`;

  return (
    <div
      className={
        isOpen
          ? `modal modal__type_${name}`
          : `modal_closed modal__type_${name}`
      }
    >
      <div className="item-modal__content">
        <button className="item-modal__close-button" onClick={onClose} />
        <img
          className="item-modal__image"
          src={card.imageUrl}
          alt={card.name}
        />
        <div className="item-modal__info">
          <h4 className="item-modal__name">{card.name}</h4>
          <button className={itemDeleteButtonClassName} onClick={onDelete}>
            Delete item
          </button>
          <h4 className="item-modal__weather">Weather: {card.weather}</h4>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
