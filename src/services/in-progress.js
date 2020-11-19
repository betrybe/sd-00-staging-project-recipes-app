import * as storage from './localStorage';

export function disabling() {
  let disabled = true;
  let checked = 0;
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => (input.checked ? (checked += 1) : 0));
  if (checked > 0 && checked === inputs.length) {
    disabled = false;
  }
  return disabled;
}


function isChecked(setUtilizados, utilizados, history, id, e) {
  const line = document.getElementsByClassName(`${e.target.id}`)[0];
  line.style.textDecoration = 'line-through';
  setUtilizados([...utilizados, e.target.id]);
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (history.location.pathname.includes('comidas')) {
    LS.meals[id] = [...utilizados, e.target.id];
  } else if (history.location.pathname.includes('bebidas')) {
    LS.cocktails[id] = [...utilizados, e.target.id];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(LS));
}

function notChecked(setUtilizados, utilizados, history, id, e) {
  const line1 = document.getElementsByClassName(`${e.target.id}`)[0];
  line1.style.textDecoration = 'none';
  const newArr = utilizados.filter((data) => data !== e.target.id);
  setUtilizados(newArr);
  const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (history.location.pathname.includes('comidas')) {
    LS.meals[id] = newArr;
  } else if (history.location.pathname.includes('bebidas')) {
    LS.cocktails[id] = newArr;
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(LS));
}

export function handleFinalizarReceita(history, details, Meal) {
  history.push('/receitas-feitas');
  storage.removeIPLS(Meal, details);
  storage.setDoneLS(Meal, details);
}

export function handleDashed(e, setUtilizados, utilizados, id, history) {
  if (e.target.checked) {
    isChecked(setUtilizados, utilizados, history, id, e);
  } else {
    notChecked(setUtilizados, utilizados, history, id, e);
  }
}
