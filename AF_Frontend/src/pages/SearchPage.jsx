import React, { useState } from "react";

// Mock data for demonstration
const mockData = [
  { id: 1, title: "React Tutorial", description: "Learn React from scratch." },
  {
    id: 2,
    title: "JavaScript Basics",
    description: "Master the fundamentals of JavaScript.",
  },
  {
    id: 3,
    title: "Node.js Guide",
    description: "Build scalable backend applications with Node.js.",
  },
  {
    id: 4,
    title: "CSS Styling",
    description: "Create beautiful designs with CSS.",
  },
  {
    id: 5,
    title: "Python Programming",
    description: "Get started with Python programming.",
  },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // Initialize with empty array

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim()) {
      // Filter mock data based on the query
      const filteredResults = mockData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]); // Show no results if the query is empty
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
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        ) : query.trim() ? ( // Show "No results found" only if the query is not empty
          <p className="text-center text-gray-600">No results found.</p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
