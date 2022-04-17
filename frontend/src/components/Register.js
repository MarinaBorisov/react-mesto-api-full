import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({handleRegister}) {
  return (
    <AuthForm title="Регистрация" buttonText="Зарегистрироваться" onSubmit={handleRegister} />
  );
}

export default withRouter(Register);
