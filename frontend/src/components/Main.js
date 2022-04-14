import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля" onClick={props.onEditAvatar} />
          <span className="profile__avatar-edit" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" className="profile__edit" onClick={props.onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {
          props.cards.map((card) => (
            <Card key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />)
          )
        }
      </section>
    </main>
  );
}

export default Main;