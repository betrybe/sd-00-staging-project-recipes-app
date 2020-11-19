export const ApiSearchMealByName = (name) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then((response) => response
    .json()
    .then((meal) => meal.meals)
    .catch((error) => error))
);

export const ApiSearchByFirstLetter = (letter) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`).then((response) => response
    .json()
    .then((meal) => meal.meals)
    .catch((error) => error))
);

export const ApiSearchByMainIngredient = (mainIngredient) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`).then(
    (response) => response
      .json()
      .then((meal) => meal.meals)
      .catch((error) => error),
  )
);

export const searchMealById = (id) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => response
    .json()
    .then((meal) => meal.meals)
    .catch((error) => error))
);
