import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = '828f6afb';
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);

      if (response.data.Response === 'True') {
        setMovieDetails(response.data);
      }

      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center display-4 mb-4">{movieDetails.Title}</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-lg mb-4">
            <img
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              className="card-img-top rounded"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-lg mb-4">
            <div className="card-body">
              <h4 className="card-title text-info mb-4">Details</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Release Year:</strong> <span>{movieDetails.Year}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Genre:</strong> <span>{movieDetails.Genre}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Director:</strong> <span>{movieDetails.Director}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Cast:</strong> <span>{movieDetails.Actors}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>IMDb Rating:</strong> <span>{movieDetails.imdbRating}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Duration:</strong> <span>{movieDetails.Runtime}</span>
                </li>
                <li className="list-group-item">
                  <strong>Plot:</strong>
                  <p>{movieDetails.Plot}</p>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Language:</strong> <span>{movieDetails.Language}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Country:</strong> <span>{movieDetails.Country}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Box Office:</strong> <span>{movieDetails.BoxOffice || 'N/A'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5 mb-5">
        <a href="/" className="btn btn-outline-dark btn-lg">Go Back</a>
      </div>
    </div>
  );
};

export default MovieDetails;
