import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EstablishmentDetailPage from './components/features/establishments/DetailsPage';
import HomePage from './components/HomePage';

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/establishment/:id' element={<EstablishmentDetailPage />} />
    </Routes>
  </Router>
);

export default App;
