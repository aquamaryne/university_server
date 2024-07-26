import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage';
import ArchieveRoute from './routes/archieve';
import FormRoute from './routes/form';
import WitnessPrintRoute from './routes/witness_print';
import PersonalCardRoute from './routes/personal_card';
import StatisticRoute from './routes/statisctic';
import WitnessRoute from './routes/witness';
import PrintRoute from './routes/print';

function App() {
  return (
      <Router>
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
