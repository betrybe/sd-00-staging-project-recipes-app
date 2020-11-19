import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';
import Perfil from '../pages/Perfil/Perfil';

describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a tela de perfil', () => {
  it('Todos o data-testid do email e de todos os botões', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Perfil />
      </Provider>,
      { route: '/perfil' }
    );
    expect(getByTestId('profile-email')).toBeInTheDocument();
    expect(getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('profile-logout-btn')).toBeInTheDocument();
  });
});

describe('Ao clicar no botão de "Receitas Favoritas", a rota deve mudar para a tela de receitas favoritas', () => {
  it('Redireciona para a rota correta', () => {
    const { history, getByTestId } = renderWithRouter(
      <Provider>
        <Perfil />
      </Provider>,
      { route: '/perfil' }
    );
    
    const favBtn = getByTestId('profile-favorite-btn');
    expect(favBtn).toBeInTheDocument();
    fireEvent.click(favBtn);
    const { location: { pathname }} = history;
    expect(pathname).toBe('/receitas-favoritas');
  });
});

describe('Ao clicar no botão de "Receitas Feitas", a rota deve mudar para a tela de receitas feitas', () => {
  it('Redireciona para a rota correta', () => {
    const { history, getByTestId } = renderWithRouter(
      <Provider>
        <Perfil />
      </Provider>,
      { route: '/perfil' }
    );
    
    const doneBtn = getByTestId('profile-done-btn');
    expect(doneBtn).toBeInTheDocument();
    fireEvent.click(doneBtn);
    const { location: { pathname }} = history;
    expect(pathname).toBe('/receitas-feitas');
  });
});

describe('Ao clicar no botão de "Sair", o `localStorage` deve ser limpo e a rota deve mudar para a tela de login', () => {
  it('Limpa todas as chaves da localStorage', () => {
    const { history, getByTestId } = renderWithRouter(
      <Provider>
        <Perfil />
      </Provider>,
      { route: '/perfil' }
    );
    
    const logoutBtn = getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    fireEvent.click(logoutBtn);
    const { location: { pathname }} = history;
    expect(pathname).toBe('/');
  });
});
