import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import HCard from '../../../components/HorizontalCard';

function ReceitasFeitas() {
  const [filters, setFilters] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      setDone(doneRecipes);
      setFilters(doneRecipes);
    }
  }, []);

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={() => setFilters(done)}
        >
          Todas
        </button>
        <button
          data-testid="filter-by-food-btn"
          onClick={() => setFilters(done.filter((recipe) => recipe.type === 'comida'))}
        >
          Comidas
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={() => setFilters(done.filter((recipe) => recipe.type === 'bebida'))}
        >
          Bebidas
        </button>
      </div>
      <div>
        {filters.map((card, index) => (<HCard card={card} index={index} favOrDone="done" />))}
      </div>
    </div>
  );
}

export default ReceitasFeitas;

