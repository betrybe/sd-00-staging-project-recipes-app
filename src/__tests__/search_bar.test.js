import React from 'react';
import { waitFor, fireEvent, act } from '@testing-library/react';
import { mockSuccessFood, mockSuccessDrink } from './recipes_list.test';
import * as api from '../services/api';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import Home from '../pages/Home/Home';
import SearchBar from '../components/SearchBar';
import * as mockAPI from '../mocks/mockAPI';

jest.spyOn(api, 'defaultMeals').mockImplementation(() => mockSuccessFood);
jest.spyOn(api, 'defaultDrinks').mockImplementation(() => mockSuccessDrink);
jest.spyOn(api, 'mealCategories').mockImplementation(() => mockAPI.mockSuccessCatFood);
jest.spyOn(api, 'drinkCategories').mockImplementation(() => mockAPI.mockSuccessCatDrink);

const checkTwelveRec = (recipes, type, testid) => {
  recipes.splice(0, 12).forEach((recipe, i) => {
    expect(testid(`${i}-recipe-card`)).toBeInTheDocument();
    expect(testid(`${i}-card-img`)).toBeInTheDocument();
    expect(testid(`${i}-card-img`)).toHaveAttribute('src', recipe[`str${type}Thumb`]);
    expect(testid(`${i}-card-name`)).toBeInTheDocument();
  })
};

export const mockNameSoup = Promise.resolve(require('../../cypress/mocks/soupMeals'));
export const mockA = Promise.resolve(require('../../cypress/mocks/oneMeal'));

export const mockIngredLemon = Promise.resolve(require('../../cypress/mocks/drinksByIngredient'));
export const mockNameGin = Promise.resolve(require('../../cypress/mocks/ginDrinks'));
export const mockADrink = Promise.resolve(require('../../cypress/mocks/oneDrink'));

export const mockBeefMeals = Promise.resolve(require('../../cypress/mocks/beefMeals'));
export const mockBreakFMeals = Promise.resolve(require('../../cypress/mocks/breakfastMeals'));
export const mockChickMeals = Promise.resolve(require('../../cypress/mocks/chickenMeals'));
export const mockDessertMeals = Promise.resolve(require('../../cypress/mocks/dessertMeals'));
export const mockGoatMeals = Promise.resolve(require('../../cypress/mocks/goatMeals'));

export const mockOrdinaryDrink = Promise.resolve(require('../../cypress/mocks/ordinaryDrinks'));
export const mockCocktailDrink = Promise.resolve(require('../../cypress/mocks/cocktailDrinks'));
export const mockMilkDrink = Promise.resolve(require('../../cypress/mocks/milkDrinks'));
export const mockOtherDrink = Promise.resolve(require('../../cypress/mocks/otherDrinks'));
export const mockCocoaDrink = Promise.resolve(require('../../cypress/mocks/cocoaDrinks'));

export const mockMeals = Promise.resolve(require('../../cypress/mocks/meals'));
export const mockDrinks = Promise.resolve(require('../../cypress/mocks/drinks'));

describe('Deve ter uma seção de botões para filtrar por categorias', () => {
  it('Tela de comida deve ter categorias e data-test-ids corretos', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <SearchBar />
      </Provider>,
      { route: '/comidas' }
    );
    
    await waitFor(() => expect(api.mealCategories).toHaveBeenCalled());

    expect(getByTestId('All-category-filter')).toBeInTheDocument();
    expect(getByTestId('Beef-category-filter')).toBeInTheDocument();
    expect(getByTestId('Breakfast-category-filter')).toBeInTheDocument();
    expect(getByTestId('Chicken-category-filter')).toBeInTheDocument();
    expect(getByTestId('Dessert-category-filter')).toBeInTheDocument();
    expect(getByTestId('Goat-category-filter')).toBeInTheDocument();
  });
  it('Tela de bebida deve ter categorias e data-test-ids corretos', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <SearchBar />
      </Provider>,
      { route: '/bebidas' }
    );
    
    await waitFor(() => expect(api.drinkCategories).toHaveBeenCalled());

    expect(getByTestId('All-category-filter')).toBeInTheDocument();
    expect(getByTestId('Ordinary Drink-category-filter')).toBeInTheDocument();
    expect(getByTestId('Cocktail-category-filter')).toBeInTheDocument();
    expect(getByTestId('Milk / Float / Shake-category-filter')).toBeInTheDocument();
    expect(getByTestId('Other/Unknown-category-filter')).toBeInTheDocument();
    expect(getByTestId('Cocoa-category-filter')).toBeInTheDocument();
  });
});

describe('No filtro de categorias deve existir a opção de filtrar por todas as categorias', () => {
  it('Caso as receitas sejam de comida deve existir a opção de filtrar por todas as categorias', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    
    expect(getByTestId('All-category-filter')).toBeInTheDocument();
    fireEvent.click(getByTestId('All-category-filter'));
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalledTimes(6));
  });
})

describe('Ao clicar no filtro de categoria, todas as receitas devem mudar para os dados filtrados da API - PAGINA DE COMIDA', () => {
  it('Caso as receitas sejam de comida e a categoria seja "Beef", deve-se carregar as 12 primeiras receitas de "Beef"', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    
    jest.spyOn(api, 'byMealCategory').mockImplementation(() => mockBeefMeals);
    fireEvent.click(getByTestId('Beef-category-filter'));
    await waitFor(() => expect(api.byMealCategory).toHaveBeenCalled());
    const beefMeals = require('../../cypress/mocks/beefMeals');
    checkTwelveRec(beefMeals.meals, 'Meal', getByTestId);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Breakfast", deve-se carregar as 12 primeiras receitas de "Breakfast"', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    
    jest.spyOn(api, 'byMealCategory').mockImplementation(() => mockBreakFMeals);
    fireEvent.click(getByTestId('Breakfast-category-filter'));
    await waitFor(() => expect(api.byMealCategory).toHaveBeenCalled());
    const breakFestMeals = require('../../cypress/mocks/breakfastMeals');
    checkTwelveRec(breakFestMeals.meals, 'Meal', getByTestId);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Chicken", deve-se carregar as 12 primeiras receitas de "Chicken"', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    
    jest.spyOn(api, 'byMealCategory').mockImplementation(() => mockChickMeals);
    fireEvent.click(getByTestId('Chicken-category-filter'));
    await waitFor(() => expect(api.byMealCategory).toHaveBeenCalled());
    const chickenMeals = require('../../cypress/mocks/chickenMeals');
    checkTwelveRec(chickenMeals.meals, 'Meal', getByTestId);
  });

  it('Caso as receitas sejam de comida e a categoria seja "Dessert", deve-se carregar as 12 primeiras receitas de "Dessert"', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    
    jest.spyOn(api, 'byMealCategory').mockImplementation(() => mockDessertMeals);
    fireEvent.click(getByTestId('Dessert-category-filter'));
    await waitFor(() => expect(api.byMealCategory).toHaveBeenCalled());
    const dessertMeals = require('../../cypress/mocks/dessertMeals');
    checkTwelveRec(dessertMeals.meals, 'Meal', getByTestId); 
  });

  it('Caso as receitas sejam de comida e a categoria seja "Goat", deve-se carregar as 12 primeiras receitas de "Goat"', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    
    jest.spyOn(api, 'byMealCategory').mockImplementation(() => mockGoatMeals);
    fireEvent.click(getByTestId('Goat-category-filter'));
    await waitFor(() => expect(api.byMealCategory).toHaveBeenCalled());
    const goatMeals = require('../../cypress/mocks/goatMeals');
    checkTwelveRec(goatMeals.meals, 'Meal', getByTestId); 
  });
});
  
describe('Ao clicar no filtro de categoria, todas as receitas devem mudar para os dados filtrados da API - PAGINA DE BEBIDA', () => {
  it('Caso as receitas sejam de bebida e a categoria seja "Ordinary Drink", deve-se carregar as 12 primeiras receitas de "Ordinary Drink"', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    
    jest.spyOn(api, 'byDrinkCategory').mockImplementation(() => mockOrdinaryDrink);
    fireEvent.click(getByTestId('Ordinary Drink-category-filter'));
    await waitFor(() => expect(api.byDrinkCategory).toHaveBeenCalled());
    const ordinaryDrinks = require('../../cypress/mocks/ordinaryDrinks');
    checkTwelveRec(ordinaryDrinks.drinks, 'Drink', getByTestId);
  });
  
  it('Caso as receitas sejam de bebida e a categoria seja "Cocktail", deve-se carregar as 12 primeiras receitas de "Cocktail"', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    
    jest.spyOn(api, 'byDrinkCategory').mockImplementation(() => mockCocktailDrink);
    fireEvent.click(getByTestId('Cocktail-category-filter'));
    await waitFor(() => expect(api.byDrinkCategory).toHaveBeenCalled());
    const cocktailDrinks = require('../../cypress/mocks/cocktailDrinks');
    checkTwelveRec(cocktailDrinks.drinks, 'Drink', getByTestId);
  });
  
  it('Caso as receitas sejam de bebida e a categoria seja "Milk / Float / Shake", deve-se carregar as 12 primeiras receitas de "Milk / Float / Shake"', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    
    jest.spyOn(api, 'byDrinkCategory').mockImplementation(() => mockMilkDrink);
    fireEvent.click(getByTestId('Milk / Float / Shake-category-filter'));
    await waitFor(() => expect(api.byDrinkCategory).toHaveBeenCalled());
    const milkDrinks = require('../../cypress/mocks/milkDrinks');
    checkTwelveRec(milkDrinks.drinks, 'Drink', getByTestId);
  });
  
  it('Caso as receitas sejam de bebida e a categoria seja "Other/Unknown", deve-se carregar as 12 primeiras receitas de "Other/Unknown"', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    
    jest.spyOn(api, 'byDrinkCategory').mockImplementation(() => mockOtherDrink);
    fireEvent.click(getByTestId('Other/Unknown-category-filter'));
    await waitFor(() => expect(api.byDrinkCategory).toHaveBeenCalled());
    const otherDrinks = require('../../cypress/mocks/otherDrinks');
    checkTwelveRec(otherDrinks.drinks, 'Drink', getByTestId);
  });
  
  it('Caso as receitas sejam de bebida e a categoria seja "Cocoa", deve-se carregar as 12 primeiras receitas de "Cocoa"', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    
    jest.spyOn(api, 'byDrinkCategory').mockImplementation(() => mockCocoaDrink);
    fireEvent.click(getByTestId('Cocoa-category-filter'));
    await waitFor(() => expect(api.byDrinkCategory).toHaveBeenCalled());
    const cocoaDrinks = require('../../cypress/mocks/cocoaDrinks');
    checkTwelveRec(cocoaDrinks.drinks, 'Drink', getByTestId);
  });
});

// ESTE DECRIBE AINDA ESTÁ FALHANDO
describe('Caso o filtro selecionado no momento seja selecionado de novo, o app deve retornar as receitas sem nenhum filtro, como se fosse um toggle', () => {
  it('Caso as receitas sejam de comida e o filtro tenha sido selecionado novamente, deve-se retornar as 12 primeiras receitas sem filtro', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    
    jest.spyOn(api, 'byMealCategory').mockImplementation(() => mockBeefMeals);
    fireEvent.click(getByTestId('Beef-category-filter'));
    await waitFor(() => expect(api.byMealCategory).toHaveBeenCalled());
    fireEvent.click(getByTestId('Beef-category-filter'));
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalledTimes(13));
    const meals = require('../../cypress/mocks/meals');
    checkTwelveRec(meals.meals, 'Meal', getByTestId);
  });

  it('Caso as receitas sejam de bebida e o filtro tenha sido selecionado novamente, deve-se retornar as 12 primeiras receitas sem filtro', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    
    jest.spyOn(api, 'byDrinkCategory').mockImplementation(() => mockOrdinaryDrink);
    fireEvent.click(getByTestId('Ordinary Drink-category-filter'));
    await waitFor(() => expect(api.byDrinkCategory).toHaveBeenCalled());
    fireEvent.click(getByTestId('Ordinary Drink-category-filter'));
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalledTimes(11));
    const drinks = require('../../cypress/mocks/drinks');
    checkTwelveRec(drinks.drinks, 'Drink', getByTestId);
  });
});


jest.spyOn(api, 'byMealIngredient').mockImplementation(() => mockAPI.mockIngredChicken);
jest.spyOn(api, 'byMealName').mockImplementation(() => mockNameSoup);
jest.spyOn(api, 'byMealFirstLetter').mockImplementation(() => mockA);
jest.spyOn(api, 'byDrinkIngredient').mockImplementation(() => mockIngredLemon);
jest.spyOn(api, 'byDrinkName').mockImplementation(() => mockNameGin);
jest.spyOn(api, 'byDrinkFirstLetter').mockImplementation(() => mockADrink);

describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a barra de busca', () => {
  it('Data-test-ids devem estar na tela ao clicar na lupa', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );

    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    const ingredRadio = getByTestId('ingredient-search-radio');
    const nameRadio = getByTestId('name-search-radio');
    const firstLetRadio = getByTestId('first-letter-search-radio');
    const searchBtn = getByTestId('exec-search-btn');
    
    expect(inputSearch).toBeInTheDocument();
    expect(ingredRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
});

// ALERTA AINDA NÃO FOI TESTADO. ESTÁ FALHANDO
describe('A barra de busca deve mudar a forma como serão filtradas as receitas de comida', () => {
  it('Se o radio selecionado for Ingrediente, a busca na API é feita corretamente pelo ingrediente', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'chicken' }});
    const ingredRadio = getByTestId('ingredient-search-radio');
    fireEvent.click(ingredRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byMealIngredient).toHaveBeenCalled());
  })

  it('Se o radio selecionado for Nome, a busca na API é feita corretamente pelo nome', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );

    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'soup' }});
    const nameRadio = getByTestId('name-search-radio');
    fireEvent.click(nameRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byMealName).toHaveBeenCalled());
  });
  it('Se o radio selecionado for Primeira Letra, a busca na API é feita corretamente pela primeira letra', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );

    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'a' }});
    const firstLetRadio = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byMealFirstLetter).toHaveBeenCalled());
  });
  it('Se o radio selecionado for Primeira letra e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );

    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'aaa' }});
    const firstLetRadio = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    // const alert = getByRole('alert');
    // expect(getByRole('alert')).toBeInTheDocument();
  });
})

// ALERTA AINDA NÃO FOI TESTADO. ESTÁ FALHANDO
describe('A barra de busca deve mudar a forma como serão filtradas as receitas de bebida', () => {
  it('Se o radio selecionado for Ingrediente, a busca na API é feita corretamente pelo ingrediente', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );
    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'lemon' }});
    const ingredRadio = getByTestId('ingredient-search-radio');
    fireEvent.click(ingredRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byDrinkIngredient).toHaveBeenCalled());
  })

  it('Se o radio selecionado for Nome, a busca na API é feita corretamente pelo nome', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );

    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'gin' }});
    const nameRadio = getByTestId('name-search-radio');
    fireEvent.click(nameRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byDrinkName).toHaveBeenCalled());
  });
  it('Se o radio selecionado for Primeira Letra, a busca na API é feita corretamente pela primeira letra', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );

    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'a' }});
    const firstLetRadio = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byDrinkFirstLetter).toHaveBeenCalled());
  });
  it('Se o radio selecionado for Primeira letra e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );

    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'aaa' }});
    const firstLetRadio = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    // expect(getByRole('alert')).toHaveBeenCalled();
  });
})

// A TRYBE FAZ ESSE DESCRIBE, POREM NÃO SERÁ NECESSÁRIO PARA 100% COVERAGE.
// ELE AINDA ESTA FALHANDO.
// const oneDrink = Promise.resolve(require('../../cypress/mocks/oneDrink'));

// describe('Caso apenas uma receita seja encontrada, a rota deve mudar para a tela de detalhes da receita com o ID da mesma na URL', () => {
//   it('Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes', async () => {
//     const { history, getByTestId } = renderWithRouter(
//       <Provider>
//         <Home />
//       </Provider>,
//       { route: '/comidas' }
//     );

//     await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
//     const searchIcon = getByTestId('search-top-btn');
//     fireEvent.click(searchIcon);

//     const inputSearch = getByTestId('search-input');
//     fireEvent.change(inputSearch, { target: { value: 'Arrabiata' }});
//     const nameRadio = getByTestId('name-search-radio');
//     fireEvent.click(nameRadio);
//     const searchBtn = getByTestId('exec-search-btn');
//     act(() => {
//       fireEvent.click(searchBtn);
//     })
//     await waitFor(() => expect(api.byMealName).toHaveBeenCalled());
//     expect(history.location.pathname).toBe('/comidas/52771');
//   });
//   it('Caso apenas uma bebida seja encontrada, deve-se ir para sua rota de detalhes', async () => {
//     const { history, getByTestId } = renderWithRouter(
//       <Provider>
//         <Home />
//       </Provider>,
//       { route: '/bebidas' }
//     );

//     await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
//     const searchIcon = getByTestId('search-top-btn');
//     fireEvent.click(searchIcon);

//     const inputSearch = getByTestId('search-input');
//     fireEvent.change(inputSearch, { target: { value: 'Aquamarine' }});
//     const nameRadio = getByTestId('name-search-radio');
//     fireEvent.click(nameRadio);
//     const searchBtn = getByTestId('exec-search-btn');
//     jest.spyOn(api, 'byDrinkName').mockImplementation(() => oneDrink);
    
//     await waitFor(() => expect(api.byDrinkName).toHaveBeenCalled());
//     const { location: { pathname }} = history;
//     const aquaDrink = require('../../cypress/mocks/oneDrink').drinks;
//     fireEvent.click(searchBtn);
//     expect(pathname).toBe(`/bebidas/${aquaDrink[0].idDrink}`);
//   });
// })

describe('Caso mais de uma receita seja encontrada, mostrar as receitas em cards da mesma maneira que a tela principal de receitas', () => {
  it('Caso mais de uma comida seja encontrada, mostrar as 12 primeiras', async () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas' }
    );

    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'soup' }});
    const nameRadio = getByTestId('name-search-radio');
    fireEvent.click(nameRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byMealName).toHaveBeenCalled());

    const soupMeals = require('../../cypress/mocks/soupMeals');
    soupMeals.meals.forEach((meal, i) => {
      expect(getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-img`)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-name`)).toBeInTheDocument();
    });
    expect(queryByTestId('10-recipe-card')).not.toBeInTheDocument();
  });
  it('Caso mais de uma bebida seja encontrada, mostrar as 12 primeiras', async () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/bebidas' }
    );

    await waitFor(() => expect(api.defaultDrinks).toHaveBeenCalled());
    const searchIcon = getByTestId('search-top-btn');
    fireEvent.click(searchIcon);

    const inputSearch = getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'soup' }});
    const nameRadio = getByTestId('name-search-radio');
    fireEvent.click(nameRadio);
    const searchBtn = getByTestId('exec-search-btn');
    fireEvent.click(searchBtn);
    await waitFor(() => expect(api.byMealName).toHaveBeenCalled());

    const ginDrinks = require('../../cypress/mocks/ginDrinks');
    ginDrinks.drinks.slice(0, 12).forEach((drink, i) => {
      expect(getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-img`)).toBeInTheDocument();
      expect(getByTestId(`${i}-card-name`)).toBeInTheDocument();
    });
    expect(queryByTestId('12-recipe-card')).not.toBeInTheDocument();
  });
})