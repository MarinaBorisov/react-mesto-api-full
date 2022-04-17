import React from 'react';
import logo from '../images/logo.svg';
import { Route, Switch, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <a href="#"><img className="header__logo" src={logo} alt="Логотип" /></a>
      <div className="header__user-info">
        <Switch>
          <Route exact path="/">
              <p className="header__email">{props.email}</p>
              <button className="header__button" onClick={props.onSignOut}>Выйти</button>
          </Route>
          <Route path="/sign-up">
              <Link to="/sign-in" className="header__button">Войти</Link>
          </Route>
          <Route path="/sign-in">
              <Link to="/sign-up" className="header__button">Регистрация</Link>
          </Route>
        </Switch>
      </div>

    </header>
  );
}

export default Header;