import useSWR from "swr";
import { FetchWithToken } from "./spotify";

export default function useUser() {
  const { data, mutate, error } = useSWR(
    "https://api.spotify.com/v1/me",
    FetchWithToken
  );

  return {
    user: data,
    mutate,
    loggedOut: error?.status === 401,
  };
}
