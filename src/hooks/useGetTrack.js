import { useEffect, useState } from "react";
import ApiSpotify from "../apis/spotify.api";

const useGetTracks = ({ deleteStatus, setDeleteStatus }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMePlaylist = async () => {
      try {
        const response = await ApiSpotify.GetMeTrack();
        setTracks(response);
        setLoading(false);
        setDeleteStatus(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMePlaylist();
  }, [deleteStatus]);

  return { tracks, loading };
};

export default useGetTracks;
