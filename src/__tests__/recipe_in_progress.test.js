import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { fireEvent, waitFor } from '@testing-library/react';
import Provider from '../contexts/Provider';
import * as api from '../services/api';
import { mockSuccessFood, mockSuccessDrink } from './recipes_list.test';
import * as share from '../services/share';
import * as inProgress from '../services/in-progress';
import ComidaInProgress from '../pages/Comidas/ComidaDetalhes/ComidaInProgress';

const comida = Promise.resolve(require('../../cypress/mocks/oneMeal'));
const bebida = Promise.resolve(require('../../cypress/mocks/oneDrink'));

document.execCommand = jest.fn();

jest.spyOn(api, 'defaultMeals').mockImplementation(() => mockSuccessFood);
jest.spyOn(api, 'defaultDrinks').mockImplementation(() => mockSuccessDrink);
jest.spyOn(api, 'byMealId').mockImplementation(() => comida);
jest.spyOn(api, 'byDrinkId').mockImplementation(() => bebida);
jest.spyOn(share, 'share').mockImplementation(() => console.log('tooth'));
jest.spyOn(inProgress, 'disabling').mockImplementation(false);
jest.spyOn(inProgress, 'handleFinalizarReceita');

describe('Testar a página In Progress', () => {
  test('Verifica se todos elementos necessarios foram renderizados', async () => {
    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <ComidaInProgress />
      </Provider>,
      { route: '/comidas/52771/in-progress' },
    );

    await waitFor(() => {
      expect(api.byMealId).toHaveBeenCalled();
    });

    expect(history.location.pathname).toBe('/comidas/52771/in-progress');

    const finishBut = getByTestId('finish-recipe-btn');
    const photo = getByTestId('recipe-photo');
    const title = getByTestId('recipe-title');
    const category = getByTestId('recipe-category');
    const favorite = getByTestId('favorite-btn');
    const sharebt = getByTestId('share-btn');
    const instructions = getByTestId('instructions');

    expect(finishBut).toBeInTheDocument();

    expect(photo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(sharebt).toBeInTheDocument();

    const ingredient1 = getByTestId('penne rigate - 1 pound');
    const ingredient2 = getByTestId('olive oil - 1/4 cup');
    const ingredient3 = getByTestId('garlic - 3 cloves');
    const ingredient4 = getByTestId(/chopped tomatoes - 1 tin/);
    const ingredient5 = getByTestId('red chile flakes - 1/2 teaspoon');
    const ingredient6 = getByTestId('italian seasoning - 1/2 teaspoon');
    const ingredient7 = getByTestId('basil - 6 leaves');
    const ingredient8 = getByTestId('Parmigiano-Reggiano - spinkling');

    fireEvent.change(ingredient1, { target: { checked: true } });
    fireEvent.change(ingredient2, { target: { checked: true } });
    fireEvent.change(ingredient3, { target: { checked: true } });
    fireEvent.change(ingredient4, { target: { checked: true } });
    fireEvent.change(ingredient5, { target: { checked: true } });
    fireEvent.change(ingredient6, { target: { checked: true } });
    fireEvent.change(ingredient7, { target: { checked: true } });
    fireEvent.change(ingredient8, { target: { checked: true } });

    expect(ingredient1).toBeChecked();
    expect(finishBut).not.toBeDisabled();

    fireEvent.click(sharebt);
    expect(share.share).toHaveBeenCalled();
    fireEvent.click(favorite);

    fireEvent.click(finishBut);
    expect(inProgress.handleFinalizarReceita).toBeCalled();
    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  test('Verifica se todos elementos necessarios foram renderizados', async () => {
    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <ComidaInProgress />
      </Provider>,
      { route: '/bebidas/178319/in-progress' },
    );

    await waitFor(() => {
      expect(api.byMealId).toHaveBeenCalled();
    });

    expect(history.location.pathname).toBe('/bebidas/178319/in-progress');

    const finishBut = getByTestId('finish-recipe-btn');
    const photo = getByTestId('recipe-photo');
    const title = getByTestId('recipe-title');
    const category = getByTestId('recipe-category');
    const favorite = getByTestId('favorite-btn');
    const sharebt = getByTestId('share-btn');
    const instructions = getByTestId('instructions');

    expect(finishBut).toBeInTheDocument();

    expect(photo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(sharebt).toBeInTheDocument();

    const ingredient1 = getByTestId('Hpnotiq - 2 oz');
    const ingredient2 = getByTestId('Pineapple Juice - 1 oz');
    const ingredient3 = getByTestId('Banana Liqueur - 1 oz');

    fireEvent.change(ingredient1, { target: { checked: true } });
    fireEvent.change(ingredient2, { target: { checked: true } });
    fireEvent.change(ingredient3, { target: { checked: true } });

    expect(ingredient1).toBeChecked();
    expect(finishBut).not.toBeDisabled();

    fireEvent.click(sharebt);
    expect(share.share).toHaveBeenCalled();
    fireEvent.click(favorite);

    fireEvent.click(finishBut);
    expect(inProgress.handleFinalizarReceita).toBeCalled();
    expect(history.location.pathname).toBe('/receitas-feitas');
  });
});
