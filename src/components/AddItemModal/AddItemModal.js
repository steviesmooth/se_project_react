import { useEffect, useMemo, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import WeatherCard from "../WeatherCard/WeatherCard";

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="create"
      onClose={onClose}
      title="New garment"
      onAddItem={onAddItem}
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
          onChange={handleNameChange}
          value={name}
          required
        ></input>
      </label>

      <label>
        <h4 className="form__name">Image</h4>
        <input
          className="form__input form__input_type_image"
          onChange={handleLinkChange}
          placeholder="Image URL"
          type="url"
          value={imageUrl}
          required
        ></input>
      </label>

      <h4 className="form__name">Select the weather type:</h4>
      <div className="form__option-container">
        <div className="form__option">
          <input
            type="radio"
            className="form__input_option"
            onChange={handleWeatherChange}
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
            onChange={handleWeatherChange}
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
            onChange={handleWeatherChange}
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
