import React from 'react';
import { useForm } from "../hooks/useForm";

const Login = ({ onLogin }) => {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
    setValues(values);
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__inputs">
          <input type="email" className="login__input" placeholder="Email" value={values.email} onChange={handleChange} required />
          <input type="password" className="login__input" placeholder="Пароль" value={values.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="login__button">Войти</button>
      </form>
    </div>
  );
};

export default Login;