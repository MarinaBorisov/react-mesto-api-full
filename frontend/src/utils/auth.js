import {url} from './utils';

class Auth {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  register(data) {
    return fetch(`${this._baseUrl}/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  login(data) {
    return fetch(`${this._baseUrl}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }
  
  logOut() {
    return fetch(`${this._baseUrl}/signout`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
  };

}

const auth = new Auth({
  baseUrl: url,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export {auth};