import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';
import logo from '../../images/logo.png';
// import AppContext from '../../context/AppContext';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [clickOk, setClickOk] = useState(false);

  // const {setUser} = useContext(AppContext);

  const emailregex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

  const clickSubmit = () => {
    // setUser(email)
    localStorage.setItem('user', JSON.stringify({ email: Email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    setClickOk(true);
  };

  return (
    <div>
      {clickOk && <Redirect to="/comidas" />}
      <img className="img" src={logo} alt="tryoutLogo" />
      {/* <h1 className="login">Login</h1> */}
      <form>
        <input
          data-testid="email-input"
          className="email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          data-testid="password-input"
          className="password"
          type="password"
          name="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          className="login-btn"
          disabled={!(Email.match(emailregex) && senha.length > 6)}
          onClick={() => clickSubmit()}
          value="Entrar"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
