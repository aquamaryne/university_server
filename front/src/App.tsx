import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/mainPage' element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
