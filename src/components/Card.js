
function Card({ onCardClick, card }) {
    function handleClick() {
        onCardClick(card);
    }
    return (
        <figure className="element">
            <img onClick={handleClick} src={card.link} alt={card.name} className="element__pic" />
            <figcaption className="element__caption">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-container">
                    <button className="element__like-button" type="button" aria-label="кнопка лайк"></button>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </figcaption>
            <button className="element__trash-btn"></button>
        </figure>
    )
}

export default Card;