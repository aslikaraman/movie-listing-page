import React, { useState, useEffect } from 'react';
import SearchFilters from '../components/SearchFilters.tsx';
import MovieList from '../components/MovieList.tsx';
import { Movie } from '../types/types.tsx';
import Pagination from '../components/Pagination.tsx';
import { fetchMovies } from '../services/MoviesService.tsx';

const MoviesListingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('pokemon');
  const [year, setYear] = useState<string>('');
  const [mediaType, setMediaType] = useState<string>('movie');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [noResultsFound, setNoResultsFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { movies, totalResults } = await fetchMovies(
        currentPage,
        searchTerm,
        year,
        mediaType
      );
      setMovies(movies);
      setTotalResults(totalResults);
      setLoading(false);

      setNoResultsFound(movies.length === 0);
    };

    fetchData();
  }, [currentPage, searchTerm, year, mediaType]);

  const handleSearchClick = async () => {
    setCurrentPage(1);
    setLoading(true);
    const { movies, totalResults } = await fetchMovies(
      currentPage,
      searchTerm,
      year,
      mediaType
    );
    setMovies(movies);
    setTotalResults(totalResults);
    setLoading(false);

    setNoResultsFound(movies.length === 0);
  };

  const totalPages = Math.ceil(totalResults / 10);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center">Loading...</div>;
    }

    if (noResultsFound) {
      return (
        <div className="alert alert-warning text-center" role="alert">
          No results found for the given search criteria. Please try again with
          different inputs.
        </div>
      );
    }

    return (
      <>
        <MovieList movies={movies} loading={loading} />
        {totalResults > 10 && (
          <div className="text-center mb-4">
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4 text-secondary">Movies List</h2>
      <SearchFilters
        searchTerm={searchTerm}
        year={year}
        mediaType={mediaType}
        onSearchChange={setSearchTerm}
        onYearChange={setYear}
        onMediaTypeChange={setMediaType}
        onSearchClick={handleSearchClick}
      />
      {renderContent()}
    </div>
  );
};

export default MoviesListingPage;
