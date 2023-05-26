import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function EditProfilePopup(props) {

    const userInfo = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(userInfo.name);
        setDescription(userInfo.about);
    }, [userInfo]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} name="edit" title="Редактировать профиль" isOpen={props.isOpen}>
            <input onChange={handleNameChange} value={name} id="name-input" className="form__item form__item_el_name" name="name" placeholder="Иван"
                type="text" required minLength="2" maxLength="40" />
            <span className="form__input-error name-input-error">
            </span>
            <input onChange={handleDescriptionChange} value={description} id="occupation-input" className="form__item form__item_el_occupation" name="occupation"
                placeholder="Сантехник" type="text" required minLength="2" maxLength="200" />
            <span className="form__input-error occupation-input-error">
            </span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;