import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../components/Header';
import HCard from '../../../components/HorizontalCard';
import AppContext from '../../../contexts/AppContext';

function ReceitasFavoritas() {
  const { fav } = useContext(AppContext);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipes) {
      setFavorites(favRecipes);
      setFilters(favRecipes);
    }
  }, [fav]);
  console.log(favorites);
  return (
    <div>
      <Header />
      <div>
        <button data-testid="filter-by-all-btn" onClick={() => setFilters(favorites)}>
          Todas
        </button>
        <button
          data-testid="filter-by-food-btn"
          onClick={() => setFilters(favorites.filter((recipe) => recipe.type === 'comida'))}
        >
          Comidas
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={() => setFilters(favorites.filter((recipe) => recipe.type === 'bebida'))}
        >
          Bebidas
        </button>
      </div>
      {filters.map((card, index) => (
        <HCard card={card} index={index} favOrDone="fav" />
      ))}
      {fav && <span>Favoritos atualizados</span>}
    </div>
  );
}

export default ReceitasFavoritas;
