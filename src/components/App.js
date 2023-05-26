import React from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js'

function App() {

  const [isEditProfilePopupOpen, setEditPopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
  const [selectedCard, setSelectedCardState] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInitialInfo(), api.getInitialCards()])
      .then(([info, cards]) => {
        setCurrentUser(info);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, [])

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isImagePopupOpen])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.setLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => c._id === card._id ? newCard : c)
        })
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => {
          return state.filter(c => c._id !== card._id);
        })
      })
  }

  function handleCardClick(card) {
    setImagePopupState(true);
    setSelectedCardState(card);
  }

  function handleEditAvatarClick() {
    setAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditPopupState(true);
  }

  function handleAddPlaceClick() {
    setAddPopupState(true);
  }

  function handleEscClose(event) {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setSelectedCardState({});
    setImagePopupState(false);
    setEditPopupState(false);
    setAddPopupState(false);
    setAvatarPopupState(false);
  }

  function handleUpdateUser({ name, about }) {
    api.editProfileInfo(name, about)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(avatar) {
    api.updateUserPic(avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
  }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <CurrentUserContext.Provider value={currentUser}>
          <Main cards={cards} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onCardLike={handleCardLike} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
        <CurrentUserContext.Provider value={cards}>
          <AddPlacePopup onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={isImagePopupOpen} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
