import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import Header from '../components/Header';
import App from '../App';
import Home from '../pages/Home/Home';

// const mockHistoryPush = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useHistory: () => ({
//     push: mockHistoryPush,
//   }),
// }));

// expect(mockHistoryPush).toHaveBeenCalledWith('/perfil');

const checkTitleWithIcon = (testId, queryId, altText, title) => {
  const profileIcon = testId('profile-top-btn');
  expect(profileIcon).toBeInTheDocument();
  const searchIcon = queryId('search-top-btn');
  expect(searchIcon).toBeInTheDocument();
  const pageTitle = testId('page-title');
  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle.innerHTML).toBe(title);

  const imgProfle = altText('profile');
  expect(imgProfle.src).toBe('http://localhost/profileIcon.svg');
  const imgSearch = altText('search');
  expect(imgSearch.src).toBe('http://localhost/searchIcon.svg');
}

const checkTitleNoIcon = (testId, queryId, altText, title) => {
  const profileIcon = testId('profile-top-btn');
  expect(profileIcon).toBeInTheDocument();
  const searchIcon = queryId('search-top-btn');
  expect(searchIcon).not.toBeInTheDocument();
  const pageTitle = testId('page-title');
  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle.innerHTML).toBe(title);

  const imgProfle = altText('profile');
  expect(imgProfle.src).toBe('http://localhost/profileIcon.svg');
}

describe('Deve apresentar um ícone para a tela de perfil, um título e um ícone para a busca (caso exista no protótipo) com os atributos corretos (data-testid)', () => {
  it('Tela de comida', () => {
    const { history, getByTestId, queryByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/comidas' }
    );

    history.push('/comidas');
    checkTitleWithIcon(getByTestId, queryByTestId, getByAltText, 'Comidas');
  })
  it('Tela de bebidas', () => {
    const { history, getByTestId, queryByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/bebidas' }
    );
    expect(history.location.pathname).toBe('/bebidas');
    checkTitleWithIcon(getByTestId, queryByTestId, getByAltText, 'Bebidas');
  })
  it('Tela de explorar', () => {
    const { history, getByTestId, queryByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/explorar' }
    );

    expect(history.location.pathname).toBe('/explorar');
    checkTitleNoIcon(getByTestId, queryByTestId, getByAltText, 'Explorar');
  });
  it('Tela de explorar comidas', () => {
    const { history, getByTestId, queryByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/explorar/comidas' }
    );

    expect(history.location.pathname).toBe('/explorar/comidas');
    checkTitleNoIcon(getByTestId, queryByTestId, getByAltText, 'Explorar Comidas');
  });
  it('Tela de explorar bebidas', () => {
    const { history, getByTestId, queryByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/explorar/bebidas' }
    );

    expect(history.location.pathname).toBe('/explorar/bebidas');
    checkTitleNoIcon(getByTestId, queryByTestId, getByAltText, 'Explorar Bebidas');
  });
  it('Tela de explorar ingredientes vindo de explorar comidas', () => {
    const { history, getByTestId, queryByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/explorar/comidas/ingredientes' }
    );

    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
    checkTitleNoIcon(getByTestId, queryByTestId, getByAltText, 'Explorar Ingredientes');
  });
  it('Tela de explorar ingredientes vindo de explorar bebidas', () => {
    const { history, getByTestId, queryByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/explorar/bebidas/ingredientes' }
    );

    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
    checkTitleNoIcon(getByTestId, queryByTestId, getByAltText, 'Explorar Ingredientes');
  });
  it('Tela de explorar origem vindo de explorar comidas', () => {
    const { history, getByTestId, queryByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/explorar/comidas/area' }
    );

    expect(history.location.pathname).toBe('/explorar/comidas/area');
    checkTitleWithIcon(getByTestId, queryByTestId, getByAltText, 'Explorar Origem');
  });
  it('Tela de receitas feitas', () => {
    const { history, getByTestId, queryByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/receitas-feitas' }
    );

    expect(history.location.pathname).toBe('/receitas-feitas');
    checkTitleNoIcon(getByTestId, queryByTestId, getByAltText, 'Receitas Feitas');
  });
  it('Tela de receitas favoritas', () => {
    const { history, getByTestId, queryByTestId, getByAltText } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/receitas-favoritas' }
    );

    expect(history.location.pathname).toBe('/receitas-favoritas');
    checkTitleNoIcon(getByTestId, queryByTestId, getByAltText, 'Receitas Favoritas');
  });
});

describe('Ao clicar no botão de perfil, deve-se ir para a tela de perfil', () => {
  it('Deve conter um icone de perfil que leva pra rota /perfil', () => {
    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
      { route: '/comidas'}
    );
    const profileIcon = getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    fireEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/perfil');
  })
})

import { waitFor } from '@testing-library/react';
import { mockSuccessFood, mockSuccessDrink } from './recipes_list.test';
import * as api from '../services/api';
jest.spyOn(api, 'defaultMeals').mockImplementation(() => mockSuccessFood);
jest.spyOn(api, 'defaultDrinks').mockImplementation(() => mockSuccessDrink);

describe('Header, icone lupa (search)', () => {
  it('Deve conter um icone de lupa que abre a barra de busca', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>,
      { route: '/comidas'}
    );

    await waitFor(() => expect(api.defaultMeals).toHaveBeenCalled());

    const searchIcon = getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    fireEvent.click(searchIcon);

    const searchInp = getByTestId('search-input'); 
    expect(searchInp).toBeInTheDocument();
    expect(getByTestId('exec-search-btn')).toBeInTheDocument();
    expect(getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(getByTestId('name-search-radio')).toBeInTheDocument();
    expect(getByTestId('first-letter-search-radio')).toBeInTheDocument();
  })
})
