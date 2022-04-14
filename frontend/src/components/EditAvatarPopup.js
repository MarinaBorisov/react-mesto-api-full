import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
  <PopupWithForm title="Обновить аватар"
    name="avatar"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    buttonText="Сохранить"
  >
    <input type="url"
      className="popup__field popup__field_type_avatar-link"
      id="avatar-link-input"
      name="avatar-link"
      defaultValue=""
      placeholder="Ссылка на картинку"
      required
      ref={avatarRef}
    />
    <span className="popup__input-error avatar-link-input-error" />
  </PopupWithForm>
  );
}

export default EditAvatarPopup; 