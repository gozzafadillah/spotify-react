import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const uri = "http://localhost:3000/callback";

const ErrorResponse = ({ response, body }) => {
  return <div>{response.statusText}</div>;
};

const randomBytes = (size) => {
  return crypto.getRandomValues(new Uint8Array(size));
};

const base64url = (bytes) => {
  return btoa(String.fromCharCode(...bytes))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const generateCodeChallenge = async (code_verifier) => {
  const codeVerifierBytes = new TextEncoder().encode(code_verifier);
  const hashBuffer = await crypto.subtle.digest("SHA-256", codeVerifierBytes);
  return base64url(new Uint8Array(hashBuffer));
};

const fetchJSON = async (input, init) => {
  const response = await fetch(input, init);
  const body = await response.json();
  if (!response.ok) {
    throw new ErrorResponse({ response, body });
  }
  return body;
};

export const LoginSpotify = (props) => {
  const beginLogin = async () => {
    const code_verifier = base64url(randomBytes(96));
    const state = base64url(randomBytes(96));

    const params = new URLSearchParams({
      client_id: "034a122046c748ba90a4ab9b532d3024",
      response_type: "code",
      redirect_uri: uri,
      code_challenge_method: "S256",
      code_challenge: await generateCodeChallenge(code_verifier),
      state: state,
      scope: ["user-library-modify", "user-library-read"],
    });

    sessionStorage.setItem("code_verifier", code_verifier);
    sessionStorage.setItem("state", state);

    window.location.href = `https://accounts.spotify.com/authorize?${params}`;
  };

  return (
    <button className={props.dataName} onClick={beginLogin}>
      Begin Login
    </button>
  );
};

export const CompleteLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeLogin = async () => {
      const code_verifier = sessionStorage.getItem("code_verifier");
      const state = sessionStorage.getItem("state");

      const params = new URLSearchParams(window.location.search);

      if (params.has("error")) {
        throw new Error(params.get("error"));
      } else if (!params.has("state")) {
        throw new Error("State missing from response");
      } else if (params.get("state") !== state) {
        throw new Error("State mismatch");
      } else if (!params.has("code")) {
        throw new Error("Code missing from response");
      }

      try {
        await createAccessToken({
          grant_type: "authorization_code",
          code: params.get("code"),
          redirect_uri: `${window.location.origin}/callback`,
          code_verifier: code_verifier,
        });
        // Redirect to home page after successful login
        window.location.href = "/home";
      } catch (error) {
        // Handle the error here
        console.error(error);
        // You can show an error message or redirect to an error page if needed
      }
    };

    completeLogin();
  }, [navigate]);

  return <div>Completing Login...</div>;
};

export const Logout = () => {
  localStorage.removeItem("tokenSet");
};

export const FetchWithToken = async (input) => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new ErrorResponse(new Response(undefined, { status: 401 }), {});
  }

  return fetchJSON(input, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

const createAccessToken = async (params) => {
  const response = await fetchJSON("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: "034a122046c748ba90a4ab9b532d3024",
      ...params,
    }),
  });

  const accessToken = response.access_token;
  const expires_at = Date.now() + 1000 * response.expires_in;

  localStorage.setItem("tokenSet", JSON.stringify({ ...response, expires_at }));

  return accessToken;
};

export const getAccessToken = async () => {
  let tokenSet = JSON.parse(localStorage.getItem("tokenSet"));

  if (!tokenSet) return;

  if (tokenSet.expires_at < Date.now()) {
    tokenSet = await createAccessToken({
      grant_type: "refresh_token",
      refresh_token: tokenSet.refresh_token,
    });
  }

  return tokenSet.access_token;
};
