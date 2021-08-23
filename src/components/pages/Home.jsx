import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["capital", "name"]);
  const [filterParam, setFilterParam] = useState(["All"]);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCountries(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function search(countries) {
    return countries.filter((country) => {
      if (country.region == filterParam) {
        return searchParam.some((newItem) => {
          return (
            country[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) >
            -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            country[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) >
            -1
          );
        });
      }
    });
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="dark:bg-gray-800 dark:text-white">
        <div className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 container">
          <div className="flex items-center rounded-md gap-2 pr-10 shadow pl-4 text-gray-400 focus-within:text-gray-600 dark:bg-gray-600 dark:text-white">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search for a country"
              className="border-0 outline-none focus:ring-0 dark:bg-gray-600 dark:text-white dark:placeholder-white"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <select
            className="shadow w-44 border-0 rounded-md px-3 text-gray-500 focus:ring-0 dark:bg-gray-600 dark:text-white"
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            aria-label="Filter Countries By Region"
          >
            <option value="All">Filter By Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <div className="container grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-12 py-6">
          {search(countries).map((country) => (
            <Link
              to={`/${country.callingCodes}`}
              key={country.numericCode}
              className="w-full md:max-w-xs shadow-lg rounded-b-lg dark:bg-gray-700"
            >
              <div className="w-full">
                <img
                  className="w-full h-36 rounded-t-md"
                  src={country.flag}
                  alt=""
                />
              </div>
              <div className="px-5 py-3">
                <h1 className="font-bold py-3">{country.name}</h1>
                <p className="font-semibold text-sm">
                  Population:{" "}
                  <span className="font-light">{country.population}</span>
                </p>
                <p className="font-semibold text-sm">
                  Region: <span className="font-light">{country.region}</span>
                </p>
                <p className="font-semibold text-sm pb-3">
                  Capital: <span className="font-light">{country.capital}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
