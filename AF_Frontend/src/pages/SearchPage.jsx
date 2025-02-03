import React, { useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const getQueriedData = async (q) => {
    try {
      const response = await axios.get(
        `https://your-backend-url.com/api/search/${q}`
      );
      setResults(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim()) {
      getQueriedData(searchQuery);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {/* Search Bar */}
      <div className="w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search for tutorials..."
          value={query}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Display Results */}
      <div className="mt-8 w-full max-w-2xl">
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={item.profileImage}
                  alt={`${item.username}'s profile picture`}
                  className="rounded-full h-12 w-12 object-cover mr-3"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-sm">{item.username}</p>
                  <p className="text-xs text-gray-500">
                    {item.firstName + " " + item.lastName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : query.trim() ? (
          <p className="text-center text-gray-600">No results found.</p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
