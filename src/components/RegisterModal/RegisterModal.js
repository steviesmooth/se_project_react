import React, { useEffect, useMemo, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { regex } from "../../utils/constants";

const RegisterModal = ({
  isOpen,
  onClose,
  handleRegister,
  handleUserModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    }
  }, [isOpen]);

  const isValid = useMemo(() => {
    return password.length >= 6 && email.match(regex);
  }, [email, password]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ email, password, name, avatar });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="register"
      title="Sign up"
      buttonText="Next"
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isValid}
    >
      <label>
        <h4 className="form__name">Email*</h4>
        <input
          className="form__input form__input_type_name"
          placeholder="Email"
          type="email"
          name="email"
          onChange={(e) => handleEmail(e.target.value)}
          value={email}
          required
        ></input>
      </label>
      <label>
        <h4 className="form__name">Password*</h4>
        <input
          className="form__input form__input_type_name"
          placeholder="Password"
          type="text"
          name="password"
          onChange={(e) => handlePassword(e.target.value)}
          value={password}
          required
        ></input>
      </label>
      <label>
        <h4 className="form__name">Name</h4>
        <input
          className="form__input form__input_type_name"
          placeholder="Name"
          type="text"
          minLength="1"
          maxLength="40"
          onChange={(e) => handleName(e.target.value)}
          value={name}
          required
        ></input>
      </label>
      <label>
        <h4 className="form__name">Avatar URL</h4>
        <input
          className="form__input form__input_type_image"
          onChange={(e) => handleAvatar(e.target.value)}
          placeholder="Avatar URL"
          type="url"
          name="avatar"
          value={avatar}
          required
        ></input>
      </label>
      <p className="modal__form-btn_text" onClick={handleUserModal}>
        or Log in
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;
