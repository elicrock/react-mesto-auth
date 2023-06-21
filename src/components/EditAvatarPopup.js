import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.value = '';
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      btnText={isLoading ? 'Сохранение' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input ref={avatarRef} type="url" name="avatar" id="link-avatar" className="popup__input popup__input_el_url-avatar" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error link-avatar-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;