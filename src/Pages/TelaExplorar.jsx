import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import BarraHeader from '../Components/Barra de Busca - Header/Header';

export default function TelaExplorar() {
  return (
    <div>
      <BarraHeader title={'Explorar'} showTop="true" />
      <MenuInferior />
    </div>
  );
}
