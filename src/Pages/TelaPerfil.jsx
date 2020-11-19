import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import BarraHeader from '../Components/Barra de Busca - Header/Header';

export default function TelaPerfil() {
  return (
    <div>
      <BarraHeader title={'Perfil'} showTop="true" />
      <MenuInferior />
    </div>
  );
}
