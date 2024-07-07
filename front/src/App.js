import Authorizations from "./components/keyAuth";
import SideBar from "./components/mainPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "../src/css/theme.css";

function App() {
  return (
    <div className="theme">
      <Router>
        <Routes>
          <Route path="/" element={<Authorizations />} />
          <Route path="/mainPage" element={<SideBar />} />
        </Routes>
      </Router> 
    </div>  
  );
}

export default App;
