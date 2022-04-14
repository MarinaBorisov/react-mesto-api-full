import React from 'react';
import PopupWithForm from './PopupWithForm';


function PopupWithConfirm(props) {
  return (
    <PopupWithForm title="Вы уверены?"
      name="confirm"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
      buttonText="Да"
    />
  );
}

export default PopupWithConfirm; 