import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EstablishmentDetailPage from './components/features/establishments/DetailsPage';
import FavouritesTable from './components/features/favourites/FavouritesTable';
import HomePage from './components/HomePage';
import { AppProvider } from './context/AppContext';
import { FavouritesProvider } from './context/FavouritesContext';

const App = () => (
  <AppProvider>
    <FavouritesProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/establishment/:id' element={<EstablishmentDetailPage />} />
        </Routes>
        <FavouritesTable />
      </Router>
    </FavouritesProvider>
  </AppProvider>
);

export default App;
