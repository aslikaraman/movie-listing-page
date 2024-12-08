import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieListingPage from './pages/MovieListingPage.tsx'; 
import MovieDetails from './pages/MovieDetails.tsx'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieListingPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
