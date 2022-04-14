import React from 'react';
import Popup from './Popup';

function PopupWithForm({isOpen, name, onClose, ...props}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_type_${name}`} name={`popup-${name}`} onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className={`popup__button-save ${name === "confirm" && "popup__button-save_type_confirm"}`}>
            {props.buttonText}
          </button>
        </form>
    </Popup>
  );
}

export default PopupWithForm; 