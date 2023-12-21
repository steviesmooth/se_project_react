import "./ModalWithForm.css";

const ModalWithForm = ({
  name,
  children,
  title,
  onClose,
  onOpen,
  disabled,
}) => {
  return (
    <div
      className={
        onOpen
          ? `modal modal__type_${name}`
          : `modal_closed modal__type_${name}`
      }
    >
      <div className="modal__content">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        />
        <h3 className="modal__form-title">{title}</h3>
        <form className="modal__form">
          {children}
          <button
            className="modal__form-submit-btn"
            type="submit"
            disabled={disabled}
          >
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
