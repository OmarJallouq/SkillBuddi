const SearchBar = () => {
    return (
        <div className="search-container">
        <input
          type="text"
          placeholder="Search for skills..."
          className="search-bar"
        />
        <button className="search-button">Search</button>
      </div>
    )
};

export default SearchBar