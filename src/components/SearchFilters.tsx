import React from 'react';

interface Props {
  searchTerm: string;
  year: string;
  mediaType: string;
  onSearchChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onMediaTypeChange: (value: string) => void;
  onSearchClick: () => void; 
}

const SearchFilters: React.FC<Props> = ({
  searchTerm,
  year,
  mediaType,
  onSearchChange,
  onYearChange,
  onMediaTypeChange,
  onSearchClick, 
}) => {
  return (
    <div className="mb-3 d-flex justify-content-start gap-3">
      <div className="d-flex flex-column align-items-start">
        <label htmlFor="search" className="mb-1">Search</label>
        <div className="d-flex">
          <input
            type="text"
            id="search"
            className="form-control"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex flex-column align-items-start">
        <label htmlFor="year" className="mb-1">Year</label>
        <input
          type="number"
          id="year"
          className="form-control"
          placeholder="Enter year"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
        />
      </div>
      <div className="d-flex flex-column align-items-start">
        <label htmlFor="mediaType" className="mb-1">Media Type</label>
        <select
          id="mediaType"
          className="form-control"
          value={mediaType}
          onChange={(e) => onMediaTypeChange(e.target.value)}
        >
          <option value="movie">Movies</option>
          <option value="series">TV Series</option>
          <option value="episode">TV Episodes</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;
