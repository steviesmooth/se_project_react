import { useEffect, useMemo, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import WeatherCard from "../WeatherCard/WeatherCard";

const AddItemModal = ({ onOpen, onClose }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    setName("");
    setUrl("");
    setWeather("");
  }, [onOpen]);

  const isValid = useMemo(() => {
    return name.length >= 2 && url.length >= 1;
  }, [name, url, weather]);
  return (
    <ModalWithForm
      onOpen={onOpen}
      name="create"
      onClose={onClose}
      title="New garment"
      disabled={!isValid}
    >
      <h4 className="form__name">Name</h4>
      <input
        className="form__input form__input_type_name"
        placeholder="Name"
        type="text"
        minLength="1"
        maxLength="40"
        required
      ></input>
      <h4 className="form__name">Image</h4>
      <input
        className="form__input form__input_type_image"
        placeholder="Image URL"
        type="url"
        required
      ></input>
      <h4 className="form__name">Select the weather type:</h4>
      <div className="form__option-container">
        <div className="form__option">
          <input
            type="radio"
            className="form__input_option"
            id="hot"
            value="hot"
          />
          <label className="form__label">Hot</label>
        </div>
        <div className="form__option">
          <input
            type="radio"
            id="warm"
            className="form__input_option"
            value="warm"
          />
          <label className="form__label">Warm</label>
        </div>
        <div className="form__option">
          <input
            type="radio"
            className="form__input_option"
            id="cold"
            value="cold"
          />
          <label className="form__label">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
