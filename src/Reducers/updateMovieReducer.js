export default function updateMovies(state = [], action) {
  switch (action.type) {
    case "UPDATE_MOVIES":
      const moviesList = action.payload;
      const lastMovieData = moviesList[moviesList.length - 1];
      return { ...state, moviesList: moviesList, lastMovieData: lastMovieData };
    default:
      return state;
  }
}
