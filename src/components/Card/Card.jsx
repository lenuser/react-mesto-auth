import { memo, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import del from "../../images/del.svg";
import Likes from "../Likes/Likes.jsx";

const Card = memo (({ card, onCardClick, onDeleteClick }) => {
  const currentUser = useContext(CurrentUserContext)

  return (
    <article className="element">
      <img
        className="element__image"
        src={card.link}
        alt={`Фотография ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        {currentUser._id === card.owner._id && (
          <button
            className="element__group-del element__group-del_active"
            onClick={() => onDeleteClick(card._id)}
            type="button"
          >
            <img src={del} alt="кнопка удаления" />
          </button>
        )}
        <div className="element__container">
          <Likes likes={card.likes} myid={currentUser._id} cardId={card._id} />
        </div>
      </div>
    </article>
  );
})

export default Card