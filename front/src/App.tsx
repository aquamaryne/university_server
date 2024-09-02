import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage';
import ArchieveRoute from './routes/archieve';
import FormRoute from './routes/form';
import WitnessPrintRoute from './routes/witness_print';
import PersonalCardRoute from './routes/personal_card';
import StatisticRoute from './routes/statisctic';
import WitnessRoute from './routes/witness';
import PrintRoute from './routes/print';
import Register from './components/register';
import PrivateRoute from './routes/privateRoute';
import { AuthProvider } from './routes/authContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={ <Register/> } />
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/mainPage' element={ <MainPage /> } />
          </Route>
        </Routes>
        {/* <div>
          <MainPage />
        </div> */}
        <ArchieveRoute />
        <FormRoute />
        <WitnessPrintRoute />
        <PersonalCardRoute />
        <StatisticRoute />
        <WitnessRoute />
        <PrintRoute />
      </Router>
    </AuthProvider>
  );
}

export default App;
