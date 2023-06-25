import React from 'react';
import { useForm } from "../hooks/useForm";

const Login = ({ onLogin }) => {
  const { values, handleChange } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__inputs">
          <input type="email" name="email" className="login__input" minLength="2" maxLength="30" placeholder="Email" value={values.email || ''} onChange={handleChange} required />
          <input type="password" name="password" className="login__input" minLength="6" maxLength="18" placeholder="Пароль" value={values.password || ''} onChange={handleChange} required />
        </div>
        <button type="submit" className="login__button">Войти</button>
      </form>
    </div>
  );
};

export default Login;