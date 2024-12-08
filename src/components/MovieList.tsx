import React from 'react';
import { Movie } from '../types/types.ts';
import { Link } from 'react-router-dom'; 

interface MovieListProps {
  movies: Movie[];
  loading: boolean; 
}

const MovieList: React.FC<MovieListProps> = ({ movies, loading }) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-0 mt-2">
      <h2 className="text-center text-light mb-4">Movies List</h2>
      <div className="table-responsive">
        <table className="table table-hover table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Poster</th>
              <th>Name</th>
              <th>Release Date</th>
              <th>IMDb ID</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.imdbID}>
                <td>
                  {movie.Poster !== 'N/A' ? (
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      style={{
                        width: '50px',
                        height: '75px',
                        objectFit: 'cover',
                        borderRadius: '5px',
                      }}
                    />
                  ) : (
                    <i className="bi bi-image" style={{ fontSize: '50px', color: '#ccc' }} />
                  )}
                </td>
                <td>
                  <Link to={`/movie/${movie.imdbID}`} className="text-decoration-none text-info">
                    {movie.Title}
                  </Link>
                </td>
                <td>{movie.Year}</td>
                <td>{movie.imdbID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieList;
