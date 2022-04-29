export default function updateMovies(state = [], action) {
  switch (action.type) {
    case "UPDATE_MOVIES":
      return { ...state, moviesList: action.payload };
    default:
      return state;
  }
}
