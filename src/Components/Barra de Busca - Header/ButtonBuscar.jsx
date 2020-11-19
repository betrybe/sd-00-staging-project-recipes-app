import React, { useContext } from 'react';
import ReceitasContext from '../../Context/ReceitasContext';

export default function ButtonBuscar() {
  const { setchangeFilter, changeFilter } = useContext(ReceitasContext);

  return (
    <div>
      <button
        data-testid="exec-search-btn"
        className="Button-buscar"
        onClick={() => setchangeFilter(changeFilter + 1)}
      >
        Buscar
      </button>
    </div>
  );
}
