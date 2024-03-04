import Authorizations from "./components/keyAuth";
import MainPage from "./components/mainPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "../src/css/theme.css";
import Witness from "./components/witness";

function App() {
  return (
    <div className="theme">
      <Router>
        <Routes>
          <Route path="/" element={<Authorizations />} />
          <Route path="/mainPage" element={<MainPage />} />
        </Routes>
      </Router> 
    </div>  
  );
}

export default App;
