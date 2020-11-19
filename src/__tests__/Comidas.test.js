import React from 'react';
import {
  // fireEvent,
  waitFor,
} from '@testing-library/react';
import renderWithRouter from '../__render__/renderWithRouter';
import Provider from '../context/AppProvider';
import Comidas from '../pages/Comidas';

import mealsMock from '../../cypress/mocks/meals';
import categoriesMock from '../../cypress/mocks/mealCategories';

import * as mealApi from '../services/MealApi';

jest.mock('../services/MealApi');

afterEach(() => {
  mealApi.getMeals.mockClear();
  mealApi.getMealsCategories.mockClear();
  // getMealsByCategory.mockClear();
});

const apiMock = () => {
  mealApi.getMeals.mockImplementationOnce(() => Promise.resolve(mealsMock));
  mealApi.getMealsCategories.mockImplementationOnce(() => Promise.resolve(categoriesMock));
};

apiMock();

describe('Testes na tela de comida', () => {
  it('Verificando se tem os 12 cards na tela de comidas', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Comidas />
      </Provider>,
      ['/comidas'],
    );
    await waitFor(() => expect(mealApi.getMeals).toHaveBeenCalled());
    [
      'Corba',
      'Kumpir',
      'Dal fry',
      'Poutine',
      'Lasagne',
      'Timbits',
      'Wontons',
      'Kafteji',
      'Big Mac',
      'Kapsalon',
      'Fish pie',
      'Pancakes',
    ].forEach((title, index) => expect(getByTestId(`${index}-card-name`)).toHaveTextContent(title));
  });
});
