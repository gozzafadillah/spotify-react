import { useEffect, useState } from "react";
import ApiSpotify from "../apis/spotify.api";

const useRecommendation = ({ genre }) => {
  const [recommendation, setRecommendation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecommendation = async () => {
      try {
        const response = await ApiSpotify.GetRecommendation({ genre });
        setRecommendation(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getRecommendation();
  }, [genre]);

  return { recommendation, loading };
};

export default useRecommendation;
