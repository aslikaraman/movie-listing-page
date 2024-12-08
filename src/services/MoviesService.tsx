import axios from 'axios';
import { Movie } from '../types/types.ts';

export const fetchMovies = async (
  page: number,
  searchTerm: string,
  year: string,
  type: string
): Promise<{ movies: Movie[]; totalResults: number }> => {
  const apiKey = '828f6afb'; 
  let baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=${type}&page=${page}`;
  
  if (year) {
    baseUrl += `&y=${year}`;
  }
  try {
    const response = await axios.get(baseUrl);
    if (response.data.Response === 'True') {
      return {
        movies: response.data.Search,
        totalResults: Number(response.data.totalResults),
      };
    } else {
      console.error('Error fetching movies:', response.data.Error);
      return { movies: [], totalResults: 0 };
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { movies: [], totalResults: 0 };
  }
};
