import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const {values, handleChange, setValues} = useForm({});
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  useEffect(() => {
    if(isOpen) {
      setValues({
        name: currentUser.name,
        about: currentUser.about
      });
    }
  }, [isOpen, currentUser, setValues])

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      btnText={isLoading ? 'Сохранение' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      
    >
      <label className="popup__label">
        <input type="text" name="name" id="user-input" className="popup__input popup__input_el_name" minLength="2" maxLength="40" placeholder="Имя" value={values.name || ''} onChange={handleChange} required />
        <span className="popup__input-error user-input-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="about" id="about-input" className="popup__input popup__input_el_about" minLength="2" maxLength="200" placeholder="О себе" value={values.about || ''} onChange={handleChange} required />
        <span className="popup__input-error about-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;