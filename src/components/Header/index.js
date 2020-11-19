import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import profileIcon from '../../images/profileIcon.png';
import searchIcon from '../../images/searchIcon.png';

import './index.css';
import SearchBar from './SearchBar';

const Header = ({ children, hideSearch }) => {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <div className="header-top">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={profileIcon} alt="profile icon" />
        </Link>
        <h2 data-testid="page-title">{children}</h2>
        {hideSearch ? <div className="search-icon-hidden" /> : (
          <input
            data-testid="search-top-btn"
            src={searchIcon}
            type="image"
            onClick={() => {
              setDisplay(!display);
            }}
            alt="search icon"
          />
        )}
      </div>
      <div className="header-bottom">{display && <SearchBar recipeType={children} />}</div>
    </>
  );
};

export default Header;

Header.defaultProps = {
  hideSearch: false,
};

Header.propTypes = {
  hideSearch: PropTypes.bool,
  children: PropTypes.string.isRequired,
};
