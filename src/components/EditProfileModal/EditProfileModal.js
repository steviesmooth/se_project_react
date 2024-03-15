import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({
  isOpen,
  onClose,
  currentUser,
  handleUserUpdate,
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setName(currentUser?.name);
    setAvatar(currentUser?.avatar);
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserUpdate(name, avatar);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={"update"}
      title={"Change profile data"}
      buttonText={"Save changes"}
      onSubmit={handleSubmit}
    >
      <label>
        <h4 className="form__name">Name*</h4>
        <input
          className="form__input form__input_type_name"
          placeholder="Name"
          type="text"
          minLength="1"
          maxLength="40"
          onChange={handleNameChange}
          value={name}
          required
        ></input>
      </label>
      <label>
        <h4 className="form__name">Avatar</h4>
        <input
          className="form__input form__input_type_image"
          onChange={handleAvatarChange}
          placeholder="Avatar URL"
          type="url"
          name="avatar"
          value={avatar}
          required
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
