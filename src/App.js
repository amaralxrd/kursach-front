import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Header from './components/Header/Header';
import Tariff from './components/Tariff/Tariff';
import Coworking from './components/Coworking/Coworking';
import Ticket from './components/Ticket/Ticket';
import { getTickets } from './store/actions/ticketActions';
import { getCoworking } from './store/actions/coworkingActions';
import { getTariffs } from './store/actions/tariffActions';

import classes from './App.module.scss'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTickets())
    dispatch(getCoworking())
    dispatch(getTariffs())
  }, [])

  return (
    <div className={classes.app}>
      <Header />
      <Routes>
        <Route path="/tariff" element={<Tariff />} />
        <Route path="/coworking" element={<Coworking />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
    </div>
  );
}

export default App;
