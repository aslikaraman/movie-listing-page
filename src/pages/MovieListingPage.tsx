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
  const [showPagination, setShowPagination] = useState<boolean>(true);
  const [noTvEpisodes, setNoTvEpisodes] = useState<boolean>(false);

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

      if (mediaType === 'episode' && movies.length === 0) {
        setNoTvEpisodes(true);
        setShowPagination(false);
      } else {
        setNoTvEpisodes(false);
        setShowPagination(true);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, year, mediaType]);

  const handleSearchClick = async () => {
    setCurrentPage(1);
    const { movies, totalResults } = await fetchMovies(
      currentPage,
      searchTerm,
      year,
      mediaType
    );
    setMovies(movies);
    setTotalResults(totalResults);

    if (mediaType === 'episode' && movies.length === 0) {
      setNoTvEpisodes(true);
      setShowPagination(false);
    } else {
      setNoTvEpisodes(false);
      setShowPagination(true);
    }
  };

  const totalPages = Math.ceil(totalResults / 10);

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

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <MovieList
            movies={movies}
            movieTitleClass="text-secondary" 
          />
          {showPagination && totalResults > 10 && (
            <div className="text-center mb-4">
              <Pagination
                currentPage={currentPage}
                totalResults={totalResults}
                onPageChange={setCurrentPage}
                paginationBtnClass="btn-outline-secondary" 
                totalPages={totalPages}
              />
            </div>
          )}
          {noTvEpisodes && (
            <div className="alert alert-warning" role="alert">
              There are no TV episodes found for the given search.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MoviesListingPage;
