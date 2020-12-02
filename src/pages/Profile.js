import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/Footer';

function Profile() {
  // const history = useHistory();

  if (!JSON.parse(localStorage.getItem('user'))) {
    return (
      <>
        <Header title="Perfil" />
        <span>Você não está logado!</span>
        <Footer />
        {/* {  history.push('/') } */}
      </>
    );
  }

  const getEmailFromLocalStorage = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    return email;
  };

  const cleanLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };

  return (
    <>
      <Header title="Perfil" />
      <section className="container profile">
        <span data-testid="profile-email">{ getEmailFromLocalStorage() }</span>
        <Link
          to="/receitas-feitas"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </Link>
        <Link
          to="/receitas-favoritas"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Link>
        <Link
          to="/"
          data-testid="profile-logout-btn"
          onClick={ () => cleanLocalStorage() }
        >
          Sair
        </Link>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
