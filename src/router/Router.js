import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import FoodsDetails from '../components/FoodsDetails';
import DrinksDetails from '../components/DrinkDetails';
import FoodInProgress from '../components/FoodInProgress';
import DrinkInProgress from '../components/DrinkInProgress';

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/comidas"
          component={ Foods }
        />
        <Route
          exact
          path="/bebidas"
          component={ Drinks }
        />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <FoodsDetails { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <DrinksDetails { ...props } /> }
        />
        <Route
          exact
          path="/comidas/:id/in-progress"
          render={ (props) => <FoodInProgress { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          render={ (props) => <DrinkInProgress { ...props } /> }
        />
        {/* <Route
          exact
          path="/explorar"
          component={ Explorer }
        /> */}
        {/* <Route
          exact
          path="/explorar/comidas"
          component={ ExplorerFoods }
        /> */}
        {/* <Route
          exact
          path="/explorar/bebidas"
          component={ ExplorerDrinks }
        /> */}
        {/* <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ IngredientsFoods }
        /> */}
        {/* <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ IngredientsDrinks }
        /> */}
        {/* <Route
          exact
          path="/explorar/comidas/area"
          component={ RegionFoods }
        /> */}
        <Route
          exact
          path="/perfil"
          component={ Profile }
        />
        {/* <Route
          exact
          path="/receitas-feitas"
          component={ DoneRecipes }
        /> */}
        {/* <Route
          exact
          path="/receitas-favoritas"
          component={ Favorites }
        /> */}
      </Switch>
    );
  }
}
