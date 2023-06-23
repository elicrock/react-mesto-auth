import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

const Register = ({ onRegister }) => {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  // useEffect(() => {
  //   setValues({});
  // }, [setValues]);

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__inputs">
          <input type="email" name="email" className="login__input" minLength="2" maxLength="30" placeholder="Email" value={values.email} onChange={handleChange} required />
          <input type="password" name="password" className="login__input" minLength="6" maxLength="18" placeholder="Пароль" value={values.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="login__button">Зарегистрироваться</button>
      </form>
      <p className="login__sign-in">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></p>
    </div>
  );
};

export default Register;