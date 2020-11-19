export const searchCockTailByName = (name) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`).then(
    (response) => response
      .json()
      .then((drink) => drink.drinks)
      .catch((error) => error),
  )
);

export const searchCockTailByLetter = (letter) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`).then(
    (response) => response
      .json()
      .then((drink) => drink.drinks)
      .catch((error) => error),
  )
);

export const searchCockTailByIngredient = (mainIngredient) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${mainIngredient}`).then(
    (response) => response
        .json()
        .then((drink) => drink.drinks)
        .catch((error) => error),
  )
);

export const searchCockTailById = (id) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) =>
    response
      .json()
      .then((drink) => drink.drinks)
      .catch((error) => error),
  )
);
