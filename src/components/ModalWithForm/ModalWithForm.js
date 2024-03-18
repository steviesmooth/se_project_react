import "./ModalWithForm.css";

const ModalWithForm = ({
  name,
  children,
  title,
  onClose,
  isOpen,
  onSubmit,
  buttonText,
  disabled,
}) => {
  return (
    <div
      className={
        isOpen
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
        {title !== "" && <h3 className="modal__form-title">{title}</h3>}
        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <button
            className="modal__form-submit-btn"
            type="submit"
            disabled={disabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
