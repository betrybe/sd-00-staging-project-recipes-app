import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../__render__/renderWithRouter';

import Login from '../pages/Login';

describe('Login tests', () => {
  it('Contém os inputs para email e senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const inputEmail = getByTestId('email-input');
    const inputSenha = getByTestId('password-input');
    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
  });

  it('É possivel escrever o email e senha nos inputs', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const inputEmail = getByTestId('email-input');
    const inputSenha = getByTestId('password-input');
    fireEvent.change(inputEmail, { target: { value: 'teste123@bol.com' } });
    expect(inputEmail.value).toBe('teste123@bol.com');
    fireEvent.change(inputSenha, { target: { value: '1234567' } });
    expect(inputSenha.value).toBe('1234567');
  });

  it('O botão de login está desabilitado ao iniciar o aplicativo', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const loginBtn = getByTestId('login-submit-btn');
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
  });

  it('Ao inserir um email válido e senha maior que 6 caractéres o botão deve ser habilitado', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const inputEmail = getByTestId('email-input');
    const inputSenha = getByTestId('password-input');
    const loginBtn = getByTestId('login-submit-btn');
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
    fireEvent.change(inputEmail, { target: { value: 'teste123@bol.com' } });
    expect(loginBtn).toBeDisabled();
    fireEvent.change(inputSenha, { target: { value: '123456' } });
    expect(loginBtn).toBeDisabled();
    fireEvent.change(inputSenha, { target: { value: '1234567' } });
    expect(loginBtn).not.toBeDisabled();
    fireEvent.change(inputEmail, { target: { value: 'teste123@bol' } });
    expect(loginBtn).toBeDisabled();
  });
});
