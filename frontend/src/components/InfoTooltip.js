import React from 'react';
import withSuccess from '../images/success-icon.svg';
import withError from '../images/error-icon.svg';

function InfoTooltip({ isOpen, onClose, isRegistered }) {
  return (
    <section className={`popup popup_info ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button onClick={onClose} type="button" className="popup__close popup__close_register button"></button>
        <img className="popup__status-icon" src={isRegistered ? withSuccess : withError} alt="Статус операции" />
        <p className="popup__status-text">{isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;
