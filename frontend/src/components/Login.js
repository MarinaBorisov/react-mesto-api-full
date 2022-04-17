import React from 'react';
import AuthForm from './AuthForm';

function Login({handleLogin}) {
  return (
    <AuthForm title="Вход" buttonText="Войти" onSubmit={handleLogin} />
  );
}

export default Login;