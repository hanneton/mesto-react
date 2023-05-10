import React from "react";
import api from "../utils/Api.js";
import Card from "./Card.js";

function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [initialCards, setInitialCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getInitialInfo(), api.getInitialCards()])
            .then(([info, cards]) => {
                setUserName(info.name);
                setUserDescription(info.about);
                setUserAvatar(info.avatar);
                setInitialCards(cards);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <main className="content">
            <section className="user-profile content__user-profile">
                <a onClick={props.onEditAvatar} className="user-profile__link" href="#">
                    <img className="user-profile__avatar" src={userAvatar}
                        alt="аватар пользователя" />
                </a>
                <div className="user-profile__info">
                    <div className="user-profile__container">
                        <h1 className="user-profile__name">{userName}</h1>
                        <button onClick={props.onEditProfile} className="user-profile__edit-button" type="button"></button>
                    </div>
                    <p className="user-profile__occupation">{userDescription}</p>
                </div>
                <button onClick={props.onAddPlace} className="user-profile__add-button" type="button"></button>
            </section>
            <section className="elements content__elements">
                {initialCards.map(card => {
                    return (<Card key={card._id} card={card} onCardClick={props.onCardClick} />)
                })}
            </section>
        </main>
    )
}

export default Main;