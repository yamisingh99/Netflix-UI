import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from './Carousel';

function Movies() {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://netflix54.p.rapidapi.com/search/',
        params: {
          query: 'stranger',
          offset: '0',
          limit_titles: '50',
          limit_suggestions: '20',
          lang: 'en'
        },
        headers: {
          'X-RapidAPI-Key': 'a0f08a216bmshabaaae52d0da575p1d8045jsne88862676f23',
          'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        const sug = response.data.suggestions;
        console.log(sug);
        setSuggestions(sug);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Carousel</h2>
      {loading ? (
        <p>Loading...</p> // Display loading message while fetching data
      ) : (
        <Carousel items={suggestions} />
      )}
    </div>
  );
}

export default Movies;
