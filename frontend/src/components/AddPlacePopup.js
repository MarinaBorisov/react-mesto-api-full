import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdatePlace({
      name: placeName,
      link: placeLink
    });
  }
  
  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm title="Новое место"
      name="place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input type="text"
        className="popup__field popup__field_type_place-name"
        id="place-name-input"
        name="place-name"
        value={placeName}
        onChange={handlePlaceNameChange}
        placeholder="Название"
        required
        minLength="2"
        maxLength="30" />
      <span className="popup__input-error place-name-input-error" />
      <input type="url"
        className="popup__field popup__field_type_place-link"
        id="place-link-input"
        name="place-link"
        value={placeLink}
        onChange={handlePlaceLinkChange}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error place-link-input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;