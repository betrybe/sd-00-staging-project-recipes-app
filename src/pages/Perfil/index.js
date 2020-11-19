import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.css';

const Perfil = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { email: '' };
  const userEmail = user.email;

  const [clickOk, setClickOk] = useState(false);

  const clickF = () => {
    localStorage.clear();
    setClickOk(true);
  };

  return (
    <div>
      <Header hideSearch>Perfil</Header>
      {clickOk && <Redirect to="/" />}
      {userEmail
      && (
      <div>
        <p data-testid="profile-email" className="txt">{userEmail}</p>
        <div className="btns">
          <Link className="botao" to="/receitas-feitas" data-testid="profile-done-btn">
            Receitas Feitas
          </Link>
          <Link className="botao" to="/receitas-favoritas" data-testid="profile-favorite-btn">
            Receitas Favoritas
          </Link>
          <Link className="botao" to="/" data-testid="profile-logout-btn" onClick={() => clickF()}>
            Sair
          </Link>
        </div>
      </div>
      )}
      <Footer />
    </div>
  );
};

export default Perfil;
