import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Card from './CardRecomend.jsx';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

/* function convertFoodDone(food) {
  console.log(food);
  const saida = {
    id: food.idMeal,
    type: 'comida',
    area: food.strArea,
    category: food.strCategory,
    alcoholicOrNot: 'Not',
    name: food.strMeal,
    image: food.strMealThumb,
    doneDate,
    tags: food.strTags,
  };
  console.log(saida);
  return saida;
} */

function fotoPrincipal(details) {
  return (
    <img
      src={details.strMealThumb} alt={details.strMeal} className="recipe-photo"
      data-testid="recipe-photo"
    />
  );
}

function addFavority(receita, setFavority) {
  let oldFav = localStorage.getItem('favoriteRecipes');
  if (!oldFav) {
    setFavority(true);
    return localStorage.setItem('favoriteRecipes', JSON.stringify([receita]));
  }
  oldFav = [...JSON.parse(oldFav)];
  if (oldFav.find((el) => el.id === receita.id)) {
    setFavority(false);
    return localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(oldFav.filter((el) => el.id !== receita.id)),
    );
  }
  const temp = [...oldFav, receita];
  setFavority(true);
  return localStorage.setItem('favoriteRecipes', JSON.stringify(temp));
}

export function convertFavorite(food, setFavority) {
  let type = 'Drink';

  if (food.idMeal) {
    type = 'Meal';
  }
  const saida = {
    id: food[`id${type}`],
    type: type === 'Drink' ? 'bebida' : 'comida',
    category: food.strCategory,
    alcoholicOrNot: type === 'Meal' ? '' : 'Alcoholic',
    name: food[`str${type}`],
    image: food[`str${type}Thumb`],
    area: food.strArea !== undefined ? food.strArea : '',
    /* doneDate, */
    /*  tags: food.strTags, */
  };
  addFavority(saida, setFavority);
  return saida;
}

/* export function uploadDoneRecipes(receita) {
  const { id, type, area, category, alcoholicOrNot, name, image, doneDate, tags } = receita;
} */

export function loopIndex(indexArr, IndexAtual) {
  let index = indexArr;
  if (indexArr < 0) index = 5;
  return index % 6 === IndexAtual % 6;
}

function ReverseArrayFoto(sugestDrink, indexRecom, setIndexRecom, location) {
  if (indexRecom < 0) {
    setIndexRecom(5);
    return (
      sugestDrink
        /* .filter((_, index) => index === 5 % 6 || loopIndex(index - 1, 5))
      .reverse() */
        .map((item, index) => (
          <Card
            key={item.strDrink}
            title={item.strDrink}
            index={index}
            source={item.strDrinkThumb}
            show={indexRecom}
            id={item.idDrink}
          />
        ))
    );
  }
  return (
    sugestDrink
      /* .filter((_, index) => index === indexRecom % 6 || loopIndex(index - 1, indexRecom)) */
      .map((item, index) => (
        <Card
          key={item.strDrink}
          title={item.strDrink}
          index={index}
          source={item.strDrinkThumb}
          show={indexRecom}
          location={location}
          id={item.idDrink}
        />
      ))
  );
}

export function funcIngredients(ingredientes, details) {
  for (let i = 1; i < 20; i += 1) {
    if (
      details[`strIngredient${i}`] !== null &&
      details[`strIngredient${i}`] !== '' &&
      details[`strIngredient${i}`] !== undefined
    ) {
      ingredientes.push({
        ingrediente: details[`strIngredient${i}`],
        quantidade: details[`strMeasure${i}`],
      });
    }
  }
  return ingredientes;
}

// HA https://www.codegrepper.com/code-examples/basic/copy+string+to+clipboard+javascript
export function CopyURL() {
  window.navigator.clipboard.writeText(window.location.toString());
}
function funcLinks(details, favority, setFavority, copiador, copy) {
  return (
    <div className="campoTitle">
      <h1 className="recipe-title" data-testid="recipe-title">
        {details.strMeal}
      </h1>
      <Link onClick={() => convertFavorite(details, setFavority)}>
        <img
          src={favority ? blackHeart : whiteHeart}
          alt="like icon"
          className="icon"
          data-testid="favorite-btn"
        />
      </Link>
      <Link
        onClick={() => {
          copiador(true);
          CopyURL();
        }}
      >
        <img src={shareIcon} alt="like icon" className="icon" data-testid={'share-btn'} />
      </Link>
      {copy ? <span>Link copiado!</span> : null}
    </div>
  );
}

export default function Detalhes(props) {
  const [favority, setFavority] = useState(false);
  const [copy, copiador] = useState(false);
  const {
    details, favoriteRecipes, status, indexRecom, setIndexRecom,
    sugestDrink, idDaReceita, location,
  } = props;
  useEffect(() => setFavority(favoriteRecipes), []);

  const novosIngredientes = funcIngredients([], details);
  return (
    <div>
      {fotoPrincipal(details)}
      <div className="DetelhesBuddy">
        {funcLinks(details, favority, setFavority, copiador, copy)}
        <h5 className="recipe-category" data-testid="recipe-category">
          {details.strCategory}
        </h5>
        <h3 className="subTitle">Ingredients</h3>
        <ul className="yellowCamp">
          {novosIngredientes.map((item, index) => (
            <li key={item.ingrediente} data-testid={`${index}-ingredient-name-and-measure`}>
              {item.ingrediente}- {item.quantidade}
            </li>
          ))}
        </ul>
        <h3 className="subTitle">Instructions:</h3>
        <p className="yellowCamp" data-testid="instructions">{details.strInstructions}</p>
        <h3 className="subTitle">Video</h3>
        <ReactPlayer url={details.strYoutube} data-testid="video" width="100%" height="100%" />
        <h3 className="subTitle">Recomendações</h3>
        <div style={{ display: 'flex', flex: 1, flexGrow: 1, flexDirection: 'row' }}>
          <button onClick={() => setIndexRecom(indexRecom - 1)}>{'<'}</button>
          {ReverseArrayFoto(sugestDrink, indexRecom, setIndexRecom, location)}
          <button onClick={() => setIndexRecom(indexRecom + 1)}>{'>'}</button>
        </div>
      </div>
      {status === 'done' ? null : (
        <Link to={`/comidas/${idDaReceita}/in-progress`}>
          <button data-testid="start-recipe-btn" className="start-recipe-btn">
            {status === 'nothing' ? 'Inicia Receita' : 'Continuar Receita'}
          </button>
        </Link>
      )}
    </div>
  );
}

Detalhes.propTypes = {
  details: propTypes.instanceOf(Object).isRequired,
  favoriteRecipes: propTypes.func.isRequired,
  status: propTypes.string.isRequired,
  indexRecom: propTypes.number.isRequired,
  setIndexRecom: propTypes.func.isRequired,
  sugestDrink: propTypes.arrayOf(propTypes.instanceOf(Object)).isRequired,
  idDaReceita: propTypes.number.isRequired,
  location: propTypes.string.isRequired,
};
