import React, { useEffect, useMemo, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { regex } from "../../utils/constants";

const LoginModal = ({
  isOpen,
  onClose,
  handleLogin,
  handleUserModal,
  error,
  setError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const isValid = useMemo(() => {
    return password.length >= 6 && email.match(regex);
  }, [email, password]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    history.push("/profile");
  };
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError(false);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="login"
      title="Log in"
      buttonText="Log in"
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isValid}
    >
      <label>
        <h4 className={error ? "form__name_error" : "form__name"}>
          {error ? "Incorrect Email" : "Email"}
        </h4>
        <input
          className={
            error ? "form__input_error" : "form__input form__input_type_name"
          }
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleEmail}
          value={email}
          required
        ></input>
      </label>
      <label>
        <h4 className={error ? "form__name_error" : "form__name"}>
          {error ? "Incorrect Password" : "Password"}
        </h4>
        <input
          className={
            error ? "form__input_error" : "form__input form__input_type_name"
          }
          placeholder="Password"
          type="password"
          name="password"
          onChange={handlePassword}
          value={password}
          required
        ></input>
      </label>
      <p className="modal__form-btn_text" onClick={handleUserModal}>
        or Register
      </p>
    </ModalWithForm>
  );
};

export default LoginModal;
