import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {
    if (isOpen) {
      setValues({});
    }
  }, [isOpen, setValues]);

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      btnText={isLoading ? 'Сохранение' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input type="text" name="name" id="place-input" className="popup__input popup__input_el_name-place" minLength="2" maxLength="30" placeholder="Название" value={values.name || ''} onChange={handleChange} required />
        <span className="popup__input-error place-input-error"></span>
      </label>
      <label className="popup__label">
        <input type="url" name="link" id="link-place" className="popup__input popup__input_el_url-place" placeholder="Ссылка на картинку" value={values.link || ''} onChange={handleChange} required />
        <span className="popup__input-error link-place-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;