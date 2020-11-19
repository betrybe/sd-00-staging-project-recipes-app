import React, { useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getDrinks, getDrinksCategories, getDrinksByCategory } from '../../services/DrinkApi';
import './index.css';

const listDrinks = (drinkArray) => drinkArray.map((drink, index) => (
  <div className="recipe-card" key={drink.strDrink} data-testid={`${index}-recipe-card`}>
    <Link to={`/bebidas/${drink.idDrink}`}>
      <img
        className="thumbnail"
        data-testid={`${index}-card-img`}
        src={drink.strDrinkThumb}
        alt="thumbnail da comida"
      />
      <p data-testid={`${index}-card-name`}>{drink.strDrink}</p>
    </Link>
  </div>
));

const listCategories = (setDataDrink, dataDrinkCategories, setDrinkCategory, drinkCategory) => (
  <div>
    <button
      type="button"
      onClick={async () => {
        await getDrinks().then((data) => setDataDrink(data.drinks.slice(0, 12)));
        await setDrinkCategory(false);
      }}
      data-testid="All-category-filter"
    >
      All
    </button>
    {dataDrinkCategories.map(({ strCategory }) => (
      <button
        type="button"
        key={strCategory}
        onClick={() => {
          if (drinkCategory !== strCategory) setDrinkCategory(strCategory);
          else {
            setDrinkCategory(false);
            getDrinks().then((data) => setDataDrink(data.drinks.slice(0, 12)));
          }
        }}
        data-testid={`${strCategory}-category-filter`}
      >
        {strCategory}
      </button>
    ))}
  </div>
);

const Bebidas = () => {
  const {
    dataDrink,
    setDataDrink,
    setDataDrinkCategories,
    dataDrinkCategories,
    drinkCategory,
    setDrinkCategory,
  } = useContext(AppContext);

  useEffect(() => {
    getDrinksCategories().then((data) => setDataDrinkCategories(data.drinks.slice(0, 5)));
  }, [setDataDrinkCategories]);

  useEffect(() => {
    if (drinkCategory) {
      getDrinksByCategory(drinkCategory).then((data) => setDataDrink(data.drinks.slice(0, 12)));
    }
  }, [drinkCategory, setDataDrink]);

  let drinkArray = dataDrink;
  if (!Array.isArray(dataDrink)) {
    drinkArray = [];
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else if (dataDrink.length === 1) return <Redirect to={`/bebidas/${dataDrink[0].idDrink}`} />;
  else if (dataDrink.length === 0) {
    getDrinks().then((data) => setDataDrink(data.drinks.slice(0, 12)));
  }
  if (drinkArray.length > 12) drinkArray = drinkArray.slice(0, 12);
  return (
    <div className="recipes-container">
      <Header>Bebidas</Header>
      {listCategories(setDataDrink, dataDrinkCategories, setDrinkCategory, drinkCategory)}
      {listDrinks(drinkArray)}
      <Footer />
    </div>
  );
};

export default Bebidas;
