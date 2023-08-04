import AxiosInstance from "../config/axiosConfig";

const ApiSpotify = {
  async SearchMusic(search) {
    try {
      const listData = await AxiosInstance.get(
        `/search?q=${search}&type=track`
      );
      return listData;
    } catch (error) {
      throw error;
    }
  },
  async GetRecommendation({ genre }) {
    try {
      const listData = await AxiosInstance.get(
        `/recommendations?market=ID&seed_genres=${genre}`
      );
      return listData;
    } catch (error) {
      throw error;
    }
  },
  async GetTrack({ id }) {
    try {
      const listData = await AxiosInstance.get(`/tracks/${id}`);
      return listData;
    } catch (error) {
      throw error;
    }
  },
  async GetMeTrack() {
    try {
      const listData = await AxiosInstance.get(`/me/tracks`);
      return listData.data;
    } catch (error) {
      throw error;
    }
  },

  async SaveCurrTrackUser({ ids }) {
    try {
      const listData = await AxiosInstance.put(`/me/tracks?ids=${ids}`);
      return listData.data;
    } catch (error) {
      throw error;
    }
  },

  async RemoveCurrTrackUser({ ids }) {
    try {
      AxiosInstance.delete(`/me/tracks?ids=${ids}`);
    } catch (error) {
      throw error;
    }
  },
};

export default ApiSpotify;
