import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login/Login';
// import Bebidas from './pages/Bebidas/Bebidas';
import ComidaDetalhes from './pages/Comidas/ComidaDetalhes/ComidaDetalhes';
// import BebidaDetalhes from './pages/Bebidas/BebidaDetalhes/BebidaDetalhes';
import Provider from './contexts/Provider';
import ComidaInProgress from './pages/Comidas/ComidaDetalhes/ComidaInProgress';
import Home from './pages/Home/Home';
import Explorar from './pages/Explorar/Explorar';
import ExplorarComOuBeb from './pages/Explorar/ExplorarComOuBeb';
import ExplorarIngredientes from './pages/Explorar/ExplorarIngredientes';
import ExplorarArea from './pages/Explorar/ExplorarArea';
import Perfil from './pages/Perfil/Perfil';
import ReceitasFeitas from './pages/Perfil/ReceitasFeitas/ReceitasFeitas';
import ReceitasFavoritas from './pages/Perfil/ReceitasFavoritas/ReceitasFavoritas';
import NotFound from './components/NotFound';

function App() {
  return (
    <Provider>
      <div>
        <Switch>
          <Route exact path="/comidas" component={Home} />
          <Route exact path="/bebidas" component={Home} />
          <Route exact path="/comidas/:id" component={ComidaDetalhes} />
          <Route exact path="/bebidas/:id" component={ComidaDetalhes} />
          <Route exact path="/comidas/:id/in-progress" component={ComidaInProgress} />
          <Route exact path="/bebidas/:id/in-progress" component={ComidaInProgress} />
          <Route exact path="/explorar/comidas/area" component={ExplorarArea} />
          <Route exact path="/explorar/bebidas/ingredientes" component={ExplorarIngredientes} />
          <Route exact path="/explorar/comidas/ingredientes" component={ExplorarIngredientes} />
          <Route exact path="/explorar/bebidas" component={ExplorarComOuBeb} />
          <Route exact path="/explorar/comidas" component={ExplorarComOuBeb} />
          <Route exact path="/explorar" component={Explorar} />
          <Route exact path="/perfil" component={Perfil} />
          <Route exact path="/receitas-feitas" component={ReceitasFeitas} />
          <Route exact path="/receitas-favoritas" component={ReceitasFavoritas} />
          <Route exact path="/" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
