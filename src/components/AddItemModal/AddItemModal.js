import { useEffect, useMemo, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import WeatherCard from "../WeatherCard/WeatherCard";

const AddItemModal = ({ isOpen, onClose }) => {
  return (
    <ModalWithForm
      isOpen={isOpen}
      name="create"
      onClose={onClose}
      title="New garment"
      buttonText={"Add garment"}
    >
      <label>
        <h4 className="form__name">Name</h4>
        <input
          className="form__input form__input_type_name"
          placeholder="Name"
          type="text"
          minLength="1"
          maxLength="40"
          required
        ></input>
      </label>

      <label>
        <h4 className="form__name">Image</h4>
        <input
          className="form__input form__input_type_image"
          placeholder="Image URL"
          type="url"
          required
        ></input>
      </label>

      <h4 className="form__name">Select the weather type:</h4>
      <div className="form__option-container">
        <div className="form__option">
          <input
            type="radio"
            className="form__input_option"
            id="hot"
            value="hot"
            name="radio"
          />
          <label className="form__label" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="form__option">
          <input
            type="radio"
            id="warm"
            className="form__input_option"
            value="warm"
            name="radio"
          />
          <label className="form__label" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="form__option">
          <input
            type="radio"
            className="form__input_option"
            id="cold"
            name="radio"
            value="cold"
          />
          <label className="form__label" htmlFor="cold">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
