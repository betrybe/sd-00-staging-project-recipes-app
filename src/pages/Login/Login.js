import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';
import AppContext from '../../contexts/AppContext';

function emailInput(handleEmail) {
  return (
    <div className="form-group">
      <label htmlFor="email">
        E-mail:
        <input
          data-testid="email-input"
          type="email"
          name="email"
          id="email"
          onChange={(e) => handleEmail(e)}
          className="form-control form-input"
          placeholder="Email"
        />
        {/* <small id="emailHelp" class="form-text text-muted">
          We'll never share your email <br/> with anyone else.
        </small> */}
      </label>
    </div>
  );
}

function passwordInput(handlePassword) {
  return (
    <div className="form-group">
      <label htmlFor="password">
        Senha:
        <input
          data-testid="password-input"
          type="password"
          name="senha"
          id="password"
          onChange={(e) => handlePassword(e)}
          className="form-control form-input"
          placeholder="Senha"
        />
      </label>
    </div>
  );
}

function checkEmail(email, setEmailChecked) {
  const regex = /\S+@\S+\.\S+/;
  if (regex.test(email) === true) {
    setEmailChecked(true);
    return true;
  }
  setEmailChecked(false);
  return false;
}

function checkPassword(password, setPasswordChecked) {
  if (password.length > 6) {
    setPasswordChecked(true);
    return true;
  }
  setPasswordChecked(false);
  return false;
}

function Login() {
  const [emailChecked, setEmailChecked] = useState(false);
  const [passwordChecked, setPasswordChecked] = useState(false);
  const { email, setEmail, setPassword } = useContext(AppContext);
  const history = useHistory();

  const handleEmail = (e) => {
    if (checkEmail(e.target.value, setEmailChecked) === true) setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    if (checkPassword(e.target.value, setPasswordChecked) === true) setPassword(e.target.value);
  };

  const saveToStorage = (histo) => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));

    histo.push('/comidas');
  };

  /*  const teclaEnter = (tecla, email) => {
      if (tecla.key === 'Enter' && emailChecked && passwordChecked) saveToStorage(email);
    };
   */
  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="page-title">Login</h2>
        <form>
          {emailInput(handleEmail)}
          {passwordInput(handlePassword)}
        </form>
        <div to="/comidas" className="enter-button">
          <button
            className="btn button-laranja"
            data-testid="login-submit-btn"
            type="button"
            disabled={!(emailChecked && passwordChecked)}
            onClick={() => saveToStorage(history)}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
