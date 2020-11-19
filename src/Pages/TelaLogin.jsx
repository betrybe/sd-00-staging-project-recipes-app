import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/open-baladin-roma.png';
import '../CSS/TelaLogin.css';

// HA https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function onclickFuntion(email) {
  if (!localStorage.getItem('mealsToken')) localStorage.setItem('mealsToken', '1');
  if (!localStorage.getItem('cocktailsToken')) localStorage.setItem('cocktailsToken', '1');
  if (!localStorage.getItem('user')) localStorage.setItem('user', JSON.stringify({ email }));
}
/*   localStorage.setItem('doneRecipes', [{
      id: id-da-receita,
      type: comida-ou-bebida,
      area: area-da-receita-ou-texto-vazio,
      category: categoria-da-receita-ou-texto-vazio,
      alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
      name: nome-da-receita,
      image: imagem-da-receita,
      doneDate: quando-a-receita-foi-concluida,
      tags: array-de-tags-da-receita-ou-array-vazio
  }]);
    localStorage.setItem('favoriteRecipes ', [{
      id: id-da-receita,
      type: comida-ou-bebida,
      area: area-da-receita-ou-texto-vazio,
      category: categoria-da-receita-ou-texto-vazio,
      alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
      name: nome-da-receita,
      image: imagem-da-receita
  }]);
    localStorage.setItem('inProgressRecipes', {
      cocktails: {
          id-da-bebida: [lista-de-ingredientes-utilizados],
          ...
      },
      meals: {
          id-da-comida: [lista-de-ingredientes-utilizados],
          ...
      }
  }); */

export default function Login() {
  const [validation, setValidation] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (validateEmail(email) && password.length > 6) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  }, [email, password]);

  return (
    <form className="TelaLogin">
      <img src={Logo} alt="logo" className="loginLogo" />
      <h1 className="loginText">Login</h1>
      <input
        className="loginInput"
        data-testid="email-input"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="loginInput"
        data-testid="password-input"
        type="password"
        minLength="7"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Link to="/comidas">
        <button
          data-testid="login-submit-btn"
          className="loginButton"
          type="button"
          onClick={() => onclickFuntion(email)}
          disabled={validation}
        >
          Entrar
        </button>
      </Link>
    </form>
  );
}
