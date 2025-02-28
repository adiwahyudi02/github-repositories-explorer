import axios from "axios";

/**
 * Axios instance for making requests from the client-side application.
 * This is used to access internal API routes under the `/api` directory.
 */
export const axiosClient = axios.create({
  baseURL: "/api",
});

/**
 * Axios instance for making requests from the server-side (e.g., in API routes or getServerSideProps).
 * This is useful for accessing external APIs, such as GitHub's API, without exposing sensitive information.
 */
export const axiosServer = axios.create({
  baseURL: "https://api.github.com",
});
