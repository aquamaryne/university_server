import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage';
import ArchieveRoute from './routes/archieve';

function App() {
  return (
      <Router>
        <div>
          <MainPage />
        </div>
        <ArchieveRoute />
      </Router>
  );
}

export default App;
