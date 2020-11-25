import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/Context';

export default function SearchBar(props) {
  const { setFilters } = useContext(RecipesContext);
  const { id } = props;
  const [searchOptions, setSearchOptions] = useState({
    searchText: '',
    searchType: '',
    category: id,
  });

  function handleSearch({ target }) {
    setSearchOptions({ ...searchOptions, [target.name]: target.value });
  }

  function submitSearch() {
    const { searchText, searchType } = searchOptions;
    const singleChar = 1;
    if (searchType === 'first-letter' && searchText.length > singleChar) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (searchText !== '' && searchType !== '') {
      setFilters({ ...searchOptions });
    } else {
      console.log('digite algo e escolha um tipo de pesquisa!');
    }
  }

  return (
    <form>
      <label htmlFor="search-input">
        <input
          type="text"
          id="search-input"
          name="searchText"
          onChange={ handleSearch }
          data-testid="search-input"
        />
      </label>
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          id="ingredient-search-radio"
          onChange={ handleSearch }
          name="searchType"
          value="ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          name="searchType"
          onChange={ handleSearch }
          id="name-search-radio"
          value="name"
          data-testid="name-search-radio"
        />
        Nome
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          name="searchType"
          onChange={ handleSearch }
          value="first-letter"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      <button
        type="button"
        onClick={ submitSearch }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  id: PropTypes.string.isRequired,
};
