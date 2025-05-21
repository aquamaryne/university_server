import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ArchieveRoute from './routes/archieve';
import FormRoute from './routes/form';
import PersonalCardRoute from './routes/personal_card';
import StatisticRoute from './routes/statisctic';
import WitnessRoute from './routes/witness';
import PrintRoute from './routes/print';
import Register from './components/register';
import PrivateRoute from './routes/privateRoute';
import { AuthProvider } from './routes/authContext';
import Layout from './components/layout';
import MainPage from './components/mainPage';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/mainPage" element={<MainPage />} />
              <Route path="/view/archieve/*" element={<ArchieveRoute />} />
              <Route path="/view/form/*" element={<FormRoute />} />
              <Route path="/view/personal_card/*" element={<PersonalCardRoute />} />
              <Route path="/view/statistic/*" element={<StatisticRoute />} />
              <Route path="/view/witness/*" element={<WitnessRoute />} />
              <Route path="/view/print/*" element={<PrintRoute />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to='/mainPage' replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
