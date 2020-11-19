import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../../services/api';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';
import AppContext from '../../contexts/AppContext';
import AllCards from '../../components/AllCards';
import Loading from '../../components/Loading';

function mealStarter(setCards, setLoading, Meal, filteredData) {
  if (filteredData.length > 0 && Meal) {
    setCards(filteredData);
    setLoading(false);
  } else {
    api.defaultMeals().then((data) => {
      setCards(data.meals);
      setLoading(false);
    });
  }
}

function drinkStarter(setCards, setLoading, Meal, filteredData) {
  if (filteredData && !Meal) {
    setCards(filteredData);
    setLoading(false);
  } else {
    api.defaultDrinks().then((data) => {
      setCards(data.drinks);
      setLoading(false);
    });
  }
}

function meal({
  selecCategory,
  caCh,
  setcaCh,
  filCh,
  setfilCh,
  setCards,
  setLoading,
  filteredData,
}) {
  if (selecCategory && selecCategory !== caCh && selecCategory !== 'All') {
    api.byMealCategory(selecCategory).then((data) => {
      setCards(data.meals);
      setcaCh(selecCategory);
    });
  } else if (filteredData && filteredData !== filCh) {
    setCards(filteredData);
    setfilCh(filteredData);
  } else {
    api.defaultMeals().then((data) => {
      setCards(data.meals);
      setLoading(false);
      setcaCh('');
    });
  }
}

function drink({
  selecCategory,
  caCh,
  setCards,
  setcaCh,
  setLoading,
  filteredData,
  filCh,
  setfilCh,
}) {
  if (selecCategory && selecCategory !== caCh && selecCategory !== 'All') {
    api.byDrinkCategory(selecCategory).then((data) => {
      setCards(data.drinks);
      setcaCh(selecCategory);
    });
  } else if (filteredData && filteredData !== filCh) {
    setCards(filteredData);
    setfilCh(filteredData);
  } else {
    api.defaultDrinks().then((data) => {
      setCards(data.drinks);
      setLoading(false);
      setcaCh('');
    });
  }
}

function Home() {
  const {
    location: { pathname },
  } = useHistory();
  const { selecCategory, filteredData, Meal, setMeal, cards, setCards } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [caCh, setcaCh] = useState('');
  const [filCh, setfilCh] = useState('');

  useEffect(() => {
    if (pathname === '/comidas') {
      setMeal(true);
      mealStarter(setCards, setLoading, Meal, filteredData);
    } else if (pathname === '/bebidas') {
      setMeal(false);
      drinkStarter(setCards, setLoading, Meal, filteredData);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/comidas') {
      setMeal(true);
      meal({
        selecCategory,
        caCh,
        setCards,
        setcaCh,
        setLoading,
        filteredData,
        filCh,
        setfilCh,
      });
    } else if (pathname === '/bebidas') {
      setMeal(false);
      drink({ selecCategory, caCh, setCards, setcaCh, setLoading, filteredData, filCh, setfilCh });
    }
  }, [selecCategory, filteredData]);
  if (loading) return <Loading />;
  return (
    <div>
      <Header />
      <SearchBar />
      <div className="home-body">
        <AllCards cards={cards} Meal={Meal} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
