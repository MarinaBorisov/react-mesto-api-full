import {url, token} from './utils';

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
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
    .then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
    .then(this._handleResponse);
  }

  createCard(newCard) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newCard)
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  dislikeCard(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  changeLikeCardStatus(id, isLikeNeeded) {
    if (isLikeNeeded) {
      return fetch(`${this._baseUrl}cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._handleResponse);
    }
    else {
      return fetch(`${this._baseUrl}cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._handleResponse);
    }
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    })
    .then(this._handleResponse);
  }

}

const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

export {api};