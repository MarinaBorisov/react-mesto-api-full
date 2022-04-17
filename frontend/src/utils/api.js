import {url} from './utils';

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include', 
      method: 'GET',    
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  };

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._handleResponse);
  };

  createCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include', 
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      })
    })
      .then(this._handleResponse);
  };

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      credentials: 'include', 
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse);
  };

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      credentials: 'include',
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  changeLikeCardStatus(id, isLikeNeeded) {
    if (isLikeNeeded) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        credentials: 'include',
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._handleResponse);
    }
    else {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._handleResponse);
    }
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      }),
    })
    .then(this._handleResponse);
  }

}

const api = new Api({
  baseUrl: url,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export {api};