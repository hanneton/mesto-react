import React from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';


function App() {

  const [isEditProfilePopupOpen, setEditPopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
  const [selectedCard, setSelectedCardState] = React.useState({});

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isImagePopupOpen])

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

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
        <PopupWithForm onClose={closeAllPopups} name="update-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen}>
          <input id="avatar-src-input" className="form__item form__item_el_src" name="link"
            placeholder="Ссылка на картинку" type="url" required />
          <span className="form__input-error avatar-src-input-error"></span>
        </PopupWithForm>
        <PopupWithForm onClose={closeAllPopups} name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen}>
          <input id="name-input" className="form__item form__item_el_name" name="name" placeholder="Иван"
            type="text" required minLength="2" maxLength="40" />
          <span className="form__input-error name-input-error">
          </span>
          <input id="occupation-input" className="form__item form__item_el_occupation" name="occupation"
            placeholder="Сантехник" type="text" required minLength="2" maxLength="200" />
          <span className="form__input-error occupation-input-error">
          </span>
        </PopupWithForm>
        <PopupWithForm onClose={closeAllPopups} name="add" title="Новое место" isOpen={isAddPlacePopupOpen}>
          <input id="title-input" className="form__item form__item_el_title" name="name" placeholder="Название"
            type="text" required minLength="2" maxLength="30" />
          <span className="form__input-error title-input-error"></span>
          <input id="src-input" className="form__item form__item_el_src" name="link"
            placeholder="Ссылка на картинку" type="url" required />
          <span className="form__input-error src-input-error"></span>
        </PopupWithForm>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={isImagePopupOpen} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
