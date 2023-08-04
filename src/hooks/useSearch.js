import { useState, useEffect } from "react";
import ApiSpotify from "../apis/spotify.api";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useSearchMusic = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // Debounce delay: 500ms
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchMusic = async () => {
      try {
        if (debouncedSearchTerm) {
          const listData = await ApiSpotify.SearchMusic(debouncedSearchTerm);
          setSearchResults([listData]);
        } else {
          setSearchResults([]); // Clear search results if search term is empty
        }
      } catch (error) {
        console.error("Error searching music:", error);
        setSearchResults([]);
      }
    };

    searchMusic();
  }, [debouncedSearchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return {
    searchTerm,
    searchResults,
    handleChange,
  };
};

export default useSearchMusic;
