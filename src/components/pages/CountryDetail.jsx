import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetail() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/callingcode/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCountries(result);
          console.log(countries);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <section className="dark:bg-gray-800 dark:text-gray-200 min-h-screen">
        <div className="container pt-12">
          <Link
            to="/"
            className="shadow-md px-6 py-2 border border-gray-100 dark:border-gray-500 rounded-md text-gray-700 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>{" "}
            Back
          </Link>
          {countries.map((country) => (
            <div
              className="mt-12 grid grid-cols-2 gap-16 items-center"
              key={country.numericCode}
            >
              <img className="w-full" src={country.flag} alt="" />
              <div>
                <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
                  {country.name}
                </h1>
                <div className="py-6 grid grid-cols-2 grid-rows-5 gap-2 text-sm">
                  <div>
                    <span className="font-semibold">Native Name:</span>{" "}
                    <span className="font-light">{country.nativeName}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Top Level Domain:</span>{" "}
                    <span className="font-light">{country.topLevelDomain}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Population:</span>{" "}
                    <span className="font-light">{country.population}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Currencies:</span>{" "}
                    <span className="font-light">
                      {country.currencies[0].code}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Region:</span>{" "}
                    <span className="font-light">{country.region}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Languages:</span>{" "}
                    <span className="font-light">
                      {country.languages.map((lang) => (
                        <span key={lang.iso639_1}>{lang.name}, </span>
                      ))}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold">Sub Region:</span>{" "}
                    <span className="font-light">{country.subregion}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Capital:</span>{" "}
                    <span className="font-light">{country.capital}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default CountryDetail;
