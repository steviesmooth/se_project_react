import "./ItemModal.css";

const ItemModal = ({ isOpen, onClose, card, name }) => {
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
          <h4 className="item-modal__weather">Weather: {card.weather}</h4>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
