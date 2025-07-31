import React from 'react';
import { FaSearch } from 'react-icons/fa';
const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="flex justify-center my-6">
      <div className="flex items-center gap-3 bg-white text-black px-4 py-2 rounded-full w-full max-w-md shadow-md focus-within:ring-2 focus-within:ring-yellow-400 transition">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search best Product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow outline-none bg-transparent placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default Search;
