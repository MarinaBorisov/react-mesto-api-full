import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__trash ${isOwn ? 'elements__trash_visible' : 'elements__trash_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `elements__like-button ${isLiked && 'elements__like-button_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="elements__element">
      <img className="elements__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="elements__description">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="elements__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card; 