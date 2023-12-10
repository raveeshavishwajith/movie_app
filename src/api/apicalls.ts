const apikey: string = 'a2644a0b4cdbeab1fe1379c71c40213c';
export const baseImagePath = (size: string, path: string) => {
  return `https://raw.githubusercontent.com/raveeshavishwajith/movie_app_images/main/${size}/${path}`;
};
export const nowPlayingMovies: string = `https://movie-app-gvu5.onrender.com/now_playing`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
export const upComingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
export const searchMovies = (keyword: string) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
};
export const movieDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};
export const movieCastDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};