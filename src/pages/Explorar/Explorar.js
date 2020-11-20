import React from 'react';
import { useHistory } from 'react-router-dom';
import './explorar.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Explorar() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <div className="explorar-container">
        <button
          data-testid="explore-food"
          className="btn"
          onClick={() => history.push('/explorar/comidas')}
        >
          Explorar Comidas
        </button>
        <button
          data-testid="explore-drinks"
          className="btn"
          onClick={() => history.push('/explorar/bebidas')}
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}
