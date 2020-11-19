/* import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../CSS/TelaReceitaProcesso.css';

function fotoPrincipal(details) {
  let title = details.strMeal;
  let foto = details.strMealThumb;
  if (details.strDrink) {
    title = details.strDrink;
    foto = details.strDrinkThumb;
  }
  return <img src={foto} alt={title} className="recipe-photo" data-testid="recipe-photo" />;
}

function funcLinks(details, favority, setFavority, copiador, copy) {
  let title = details.strMeal;
  if (details.strDrink) title = details.strDrink;
  return (
    <div className="campoTitle">
      <h1 className="recipe-title" data-testid="recipe-title">
        {title}
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
      JSON.stringify(oldFav.filter((el) => el.id !== receita.id))
    );
  }
  const temp = [...oldFav, receita];
  setFavority(true);
  return localStorage.setItem('favoriteRecipes', JSON.stringify(temp));
}

export function convertFavorite(details, setFavority) {
  let type = 'Drink';

  if (details.idMeal) {
    type = 'Meal';
  }
  const saida = {
    id: details[`id${type}`],
    type: type === 'Drink' ? 'bebida' : 'comida',
    category: details.strCategory,
    alcoholicOrNot: type === 'Meal' ? '' : 'Alcoholic',
    name: details[`str${type}`],
    image: details[`str${type}Thumb`],
    area: details.strArea !== undefined ? details.strArea : '',
  };
  addFavority(saida, setFavority);
  return saida;
}

export function loopIndex(indexArr, IndexAtual) {
  let index = indexArr;
  if (indexArr < 0) index = 5;
  return index % 6 === IndexAtual % 6;
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
  const endereco = window.location.toString();
  const index = endereco.indexOf('/in-progress');
  window.navigator.clipboard.writeText(endereco.substring(0, index));
}

function checkboxON(setContCheck, event) {
  if (event.target.checked) {
    setContCheck((contCheck) => contCheck + 1);
  } else {
    setContCheck((contCheck) => contCheck - 1);
  }
}

function localSProcess(details, event) {
  const type = details.idMeal ? 'Meal' : 'Drink';
  const chave = details.idMeal ? 'meals' : 'cocktails';
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
  }
  const localSAtual = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!localSAtual[chave][details[`id${type}`]]) {
    localSAtual[chave][details[`id${type}`]] = [];
  }
  if (localSAtual[chave][details[`id${type}`]].includes(event.target.id)) {
    localSAtual[chave][details[`id${type}`]] = localSAtual[chave][details[`id${type}`]].filter(
      (e) => e !== event.target.id
    );
  } else {
    localSAtual[chave][details[`id${type}`]].push(event.target.id);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(localSAtual));
}

function carregaLocalStorage(details, setContCheck) {
  const type = details.idMeal ? 'Meal' : 'Drink';
  const chave = details.idMeal ? 'meals' : 'cocktails';
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
  }
  const localSAtual = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!localSAtual[chave][details[`id${type}`]]) return null;
  const ingredientes = localSAtual[chave][details[`id${type}`]];
  setContCheck(0);
  ingredientes.forEach((ingredient) => {
    checkboxON(setContCheck, { target: { checked: true } });
    //document.getElementById(ingredient).checked = true;
  });
}

export default function Detalhes(props) {
  const [favority, setFavority] = useState(false);
  useEffect(() => setFavority(favoriteRecipes), []);

  const [copy, copiador] = useState(false);

  const [contCheck, setContCheck] = useState(0);
  const { details, favoriteRecipes, status } = props;
  useEffect(() => carregaLocalStorage(details, setContCheck), []);
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
          {novosIngredientes.map((item) => {
            return (
              <div data-testid="0-ingredient-step">
                <input
                  type="checkbox"
                  className="ingredient-step"
                  id={item.ingrediente}
                  onClick={(event) => {
                    checkboxON(setContCheck, event);
                    localSProcess(details, event);
                  }}
                />
                <label for={item.ingrediente}>
                  {item.ingrediente}- {item.quantidade}
                </label>
              </div>
            );
          })}
        </ul>
        <h3 className="subTitle">Instructions:</h3>
        <p className="yellowCamp" data-testid="instructions">
          {details.strInstructions}
        </p>
      </div>
      {status === 'done' ? null : (
        <Link to={`/receitas-feitas`}>
          <button
            data-testid="finish-recipe-btn"
            className="finish-recipe-btn"
            disabled={contCheck !== novosIngredientes.length}
          >
            Finalizar receita
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
  idDaReceita: propTypes.number.isRequired,
  location: propTypes.string.isRequired,
};
 */
