import { useState, useEffect } from "react";
import ApiSpotify from "../apis/spotify.api";

const useDetailtrack = ({ id }) => {
  const [detailtrack, setDetailtrack] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(id);

  useEffect(() => {
    const getDetailtrack = async () => {
      try {
        setLoading(true);
        const response = await ApiSpotify.GetTrack({ id });
        setDetailtrack(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching track details:", error);
        setDetailtrack([]);
        setLoading(false);
      }
    };

    getDetailtrack();
  }, [id]);

  return { detailtrack, loading };
};

export default useDetailtrack;
