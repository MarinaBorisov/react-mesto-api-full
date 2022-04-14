import React from 'react';
import Popup from './Popup';

function ImagePopup({card, onClose}) {
  return (
    <Popup isOpen={card.link} name="img" onClose={onClose}>
      <figure className="popup__figure">
        <img className="popup__img" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup; 