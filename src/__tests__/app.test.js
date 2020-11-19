import React from 'react';
import { fireEvent, getByTestId, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../contexts/Provider';

describe('Todos os elementos devem respeitar os atributos descritos no protótipo para a tela de login', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    expect(getByTestId('email-input')).toBeInTheDocument();
    expect(getByTestId('password-input')).toBeInTheDocument();
    expect(getByTestId('login-submit-btn')).toBeInTheDocument();
  });
});