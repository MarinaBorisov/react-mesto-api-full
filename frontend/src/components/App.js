import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithConfirm from './PopupWithConfirm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCardToShow, setSelectedCardToShow] = React.useState({});
  const [selectedCardToDelete, setSelectedCardToDelete] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    api
    .getUserInfo()
    .then(({ email, _id }) => {
      if (_id) {
        setLoggedIn(true);
        setEmail(email);
        history.push('/');
      }
    })
    .catch(() => {
      setLoggedIn(false);
    });
  }, [history]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then(({ about, avatar, name, _id }) => {
          setCurrentUser({
            name: name,
            about: about,
            avatar: avatar,
            _id: _id,
          })
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((card) => {
          setCards(card.reverse())
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCardToShow(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCardToShow({});
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDeletePrepare(cardToDelete) {
    setSelectedCardToDelete(cardToDelete);
    setIsConfirmPopupOpen(true);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api.deleteCard(selectedCardToDelete._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== selectedCardToDelete._id));
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData).then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar).then((avatar) => {
      setCurrentUser(avatar);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdatePlace(newCard) {
    api.createCard(newCard).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(data) {
    auth
      .register(data)
      .then(() => {
        setIsRegistered(true);
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        setIsRegistered(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });      
  }

  function handleSignOut() {
    auth.logOut();
    setLoggedIn(false);
    history.push("/");    
  }

  function handleLogin(data) {
    auth
      .login(data)
      .then(() => {
        setEmail(data.email)
        setLoggedIn(true)
        history.push("/");
      })
      .catch((err) => {

        console.log(err)
      });      
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header 
        onSignOut={handleSignOut} 
        email={email} 
        loggedIn={loggedIn} />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Main}
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeletePrepare}
          loggedIn={loggedIn}
        />
        <Route path="/sign-in">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/sign-up">
          <Register handleRegister={handleRegister} />
        </Route>
      </Switch>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onUpdatePlace={handleUpdatePlace}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <PopupWithConfirm
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
      />
      <ImagePopup
        card={selectedCardToShow}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isRegistered={isRegistered}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
