const initialState = {
  results: [],
  current: "https://swapi.dev/api/people/"
};

export default function characterReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CHARS': {
      return { ...state, results: action.payload };
    }
    default:
      return state;
  }
};
