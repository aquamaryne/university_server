import Authorizations from "./components/keyAuth";
import MainPage from "./components/mainPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authorizations />} />
        <Route path="/components/mainPage" element={<MainPage />} />
      </Routes>
    </Router>   
  );
}

export default App;
