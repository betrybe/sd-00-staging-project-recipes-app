import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import * as api from '../services/api';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import ExplorarArea from '../pages/Explorar/ExplorarArea';
import japaneseMeals from '../../cypress/mocks/japaneseMeals';

const mockDefaultMeals = Promise.resolve(require('../../cypress/mocks/meals'));
jest.spyOn(api, 'defaultMeals').mockImplementation(() => mockDefaultMeals)
const mockAreaList = Promise.resolve(require('../../cypress/mocks/areas'));
jest.spyOn(api, 'mealListArea').mockImplementation(() => mockAreaList);
const mockJapaneseOpt = Promise.resolve(require('../../cypress/mocks/japaneseMeals'));

describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a tela de explorar por local de origem', () => {
  it('A tela tem os data-testids de todos os 12 cards e de todos os locais de origem', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <ExplorarArea />
      </Provider>,
      { route: '/explorar/comidas/area' }
    );
    
    expect(getByTestId('explore-by-area-dropdown')).toBeInTheDocument();
    await waitFor(() => expect(api.mealListArea).toHaveBeenCalled()); 
    expect(getByTestId('All-option')).toBeInTheDocument();
    const areasMock = require('../../cypress/mocks/areas');
    areasMock.meals.forEach(({ strArea: area }) => {
      expect(getByTestId(`${area}-option`)).toBeInTheDocument();
    })
  });
});

const checkTwelveRec = (recipes, testid) => {
  recipes.splice(0, 12).forEach((recipe, i) => {
    expect(testid(`${i}-recipe-card`)).toBeInTheDocument();
    expect(testid(`${i}-card-img`)).toBeInTheDocument();
    expect(testid(`${i}-card-img`)).toHaveAttribute('src', recipe['strMealThumb']);
    expect(testid(`${i}-card-name`)).toBeInTheDocument();
    expect(testid(`${i}-card-name`).innerHTML).toBe(recipe.strMeal);
  })
};

describe('A tela segue as mesmas especificações da tela de receitas principal, a única diferença é que os filtros de categoria são substituídos por um dropdown', () => {
  it('Devem ser carregadas as 12 primeiras receitas de comidas', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <ExplorarArea />
      </Provider>,
      { route: '/explorar/comidas/area' }
    );
    expect(getByTestId('explore-by-area-dropdown')).toBeInTheDocument();
    await waitFor(() => expect(api.mealListArea).toHaveBeenCalled()); 

    jest.spyOn(api, 'byMealArea').mockImplementation(() => mockJapaneseOpt);
    fireEvent.change(getByTestId('explore-by-area-dropdown'), {
      target: { value: 'Japanese'}
    });
    await waitFor(() => expect(api.byMealArea).toHaveBeenCalled());
    checkTwelveRec(japaneseMeals.meals, getByTestId);
  });

  it('Caso as receitas sejam de comida a rota deve mudar para a tela de detalhes da receita', async () => {
    const { history, getByTestId, queryByTestId } = renderWithRouter(
      <Provider>
        <ExplorarArea />
      </Provider>,
      { route: '/explorar/comidas/area' }
    );

    // expect(getByTestId('loading-page')).toBeInTheDocument();
    expect(getByTestId('explore-by-area-dropdown')).toBeInTheDocument();
    await waitFor(() => expect(api.mealListArea).toHaveBeenCalled());
    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());
    // expect(queryByTestId('loading-page')).not.toBeInTheDocument();
  });
});
