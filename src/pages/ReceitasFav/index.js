import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import copyToClipboard from 'clipboard-copy';

import Header from '../../components/Header';

import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

const toggleFavorite = (id, setFavoritedRecipes, favoritedRecipes) => {
  const aux = favoritedRecipes.filter((recipe) => recipe.id !== id);
  setFavoritedRecipes(aux);
  return localStorage.setItem('favoriteRecipes', JSON.stringify(aux));
};

const mapFavoriteRecipes = (favoritedRecipes, setFavoritedRecipes) => favoritedRecipes.map(({
  id, type, area, category, alcoholicOrNot, name, image,
}, index) => (
  <div>
    <Link to={`/${type}s/${id}`}>
      <img
        className="done-recipes-img"
        data-testid={`${index}-horizontal-image`}
        src={image}
        alt={image}
      />
    </Link>
    {type === 'comida' && (
    <p data-testid={`${index}-horizontal-top-text`}>
      {area}
      {' '}
      -
      {category}
    </p>
    )}
    {type === 'bebida' && <p data-testid={`${index}-horizontal-top-text`}>{alcoholicOrNot}</p>}
    <Link to={`/${type}s/${id}`}>
      <p data-testid={`${index}-horizontal-name`}>{name}</p>
    </Link>
    <input
      className="done-recipes-btn"
      onClick={() => {
        copyToClipboard(`http://localhost:3000/${type}s/${id}`);
        document.getElementById('share-btn').innerHTML = 'Link copiado!';
      }}
      id="share-btn"
      data-testid={`${index}-horizontal-share-btn`}
      type="image"
      src={shareIcon}
      alt="share icon"
    />
    <input
      className="done-recipes-btn"
      onClick={() => toggleFavorite(id, setFavoritedRecipes, favoritedRecipes)}
      id="share-btn"
      data-testid={`${index}-horizontal-favorite-btn`}
      type="image"
      src={blackHeartIcon}
      alt="share icon"
    />
  </div>
));

const ReceitasFavoritas = () => {
  const [favoritedRecipes, setFavoritedRecipes] = useState(recipes);
  return (
    <div>
      <Header hideSearch>Receitas Favoritas</Header>
      <div>
        <button type="button" onClick={() => setFavoritedRecipes(recipes)} data-testid="filter-by-all-btn">
          All
        </button>
        <button
          type="button"
          onClick={() => setFavoritedRecipes(recipes.filter((recipe) => recipe.type === 'comida'))}
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={() => setFavoritedRecipes(recipes.filter((recipe) => recipe.type === 'bebida'))}
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {mapFavoriteRecipes(favoritedRecipes, setFavoritedRecipes)}
    </div>
  );
};

export default ReceitasFavoritas;
