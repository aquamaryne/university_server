import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, RouteProps } from 'react-router-dom';
import MainPage from './components/mainPage';
import ArchieveRoute from './routes/archieve';
import FormRoute from './routes/form';
import WitnessPrintRoute from './routes/witness_print';
import PersonalCardRoute from './routes/personal_card';
import StatisticRoute from './routes/statisctic';
import WitnessRoute from './routes/witness';
import PrintRoute from './routes/print';
import Register from './components/register';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={ <Register/> } />
        </Routes>
        <div>
          <MainPage />
        </div>
        <ArchieveRoute />
        <FormRoute />
        <WitnessPrintRoute />
        <PersonalCardRoute />
        <StatisticRoute />
        <WitnessRoute />
        <PrintRoute />
      </Router>
  );
}

export default App;
