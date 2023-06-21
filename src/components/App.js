import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(err => {
        console.error(`Не удалось получить данные. ${err}`);
      });
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmClick(card) {
    setIsConfirmPopupOpen(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    async function makeRequest() {
      const newCard = await api.changeLikeCardStatus(card._id, isLiked);
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }
    handleSubmit(makeRequest);
  }

  function handleCardDelete(card) {
    async function makeRequest() {
      await api.deleteCard(card._id);
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateUser({ name, about }) {
    function makeRequest() {
      return api.updateUserInfo(name, about).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({ avatar }) {
    function makeRequest() {
      return api.updateUserAvatar(avatar).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit({ name, link }) {
    async function makeRequest() {
      const newCard = await api.addNewCard(name, link);
      setCards([newCard, ...cards]);
    }
    handleSubmit(makeRequest);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsConfirmPopupOpen(null);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmClick}
        />
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmPopup
          card={isConfirmPopupOpen}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
