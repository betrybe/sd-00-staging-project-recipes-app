import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './header.css';
import profileIcon from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import AppContext from '../contexts/AppContext';

const pageName = (history, setName, searchIcon) => {
  switch (history.location.pathname) {
    case '/comidas':
      searchIcon(true);
      return setName('Comidas');
    case '/bebidas':
      searchIcon(true);
      return setName('Bebidas');
    case '/explorar':
      return setName('Explorar');
    case '/explorar/comidas':
      return setName('Explorar Comidas');
    case '/explorar/bebidas':
      return setName('Explorar Bebidas');
    case '/explorar/comidas/ingredientes':
      return setName('Explorar Ingredientes');
    case '/explorar/bebidas/ingredientes':
      return setName('Explorar Ingredientes');
    case '/explorar/comidas/area':
      searchIcon(true);
      return setName('Explorar Origem');
    case '/receitas-feitas':
      return setName('Receitas Feitas');
    case '/receitas-favoritas':
      return setName('Receitas Favoritas');
    case '/perfil':
      return setName('Perfil');
    default:
      return false;
  }
};

function Header() {
  const history = useHistory();
  const { searchBarOn, setSearchBarOn } = useContext(AppContext);

  const [headerName, setHeaderName] = useState();
  const [hasSearch, setHasSearch] = useState(false);

  useEffect(() => {
    pageName(history, setHeaderName, setHasSearch);
  }, [history.location.pathname]);

  return (
    <div className="navbar header-comp">
      <button
        className="navbar-toggler"
        data-testid="profile-top-btn"
        onClick={() => history.push('/perfil')}
        src={profileIcon}
      >
        <img alt="profile" src={profileIcon} />
      </button>
      <h5 className="header-title" data-testid="page-title">
        {headerName}
      </h5>
      {hasSearch && (
        <button
          className="navbar-toggler"
          data-testid="search-top-btn"
          onClick={() => setSearchBarOn(!searchBarOn)}
          src={search}
        >
          <img alt="search" src={search} />
        </button>
      )}
    </div>
  );
}

export default Header;
