import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль"
      name="profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input type="text"
        className="popup__field popup__field_type_name"
        id="name-input"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleNameChange} />
      <span className="popup__input-error name-input-error" />
      <input type="text"
        className="popup__field popup__field_type_description"
        id="description-input"
        name="description"
        placeholder="Профессия"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleDescriptionChange} />
      <span className="popup__input-error description-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup; 