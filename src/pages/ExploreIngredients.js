import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Footer from '../components/Footer';
import ExploreCard from '../components/explore/ExploreCard';
import { fetchMealIngredients, fetchDrinkIngredients } from '../services';

const ZERO = 0;
const TWELVE = 12;

function ExploreFoodIngredients({ type }) {
  const [ingredients, setIngredients] = useState([]);

  const APIkey = (type === 'comidas')
    ? 'strIngredient'
    : 'strIngredient1';

  const fetchIngredients = async () => {
    const list = await fetchMealIngredients()

    const teste = list.meals;

    const teste2 = teste.slice(ZERO, TWELVE);

      // const teste = list.slice(ZERO, TWELVE)
      console.log('teste', teste2)

    setIngredients(teste2);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <section>
        {
          ingredients.map((el, index) => (
            <ExploreCard
              key={ index }
              index={ index }
              name={ el[APIkey] }
              type={ type }
            />
          ))
        }
      </section>
      <Footer />
      { console.log('ING:', ingredients) }
    </>
  );
}

ExploreFoodIngredients.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreFoodIngredients;
