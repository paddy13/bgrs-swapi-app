import Loader from "./utils/loader";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { updateMovies, fetchNewCharacters } from './Actions';
import CardComponent from "./Component/CardComponent";
import LastMovieDetails from "./Component/LastMovieDetails";

function App() {
  //Using selectors to fetch the state frpom store instead of stateMapToProps (Used Earlier)
  const characters = useSelector(({characterReducer}) => characterReducer.results, shallowEqual);
  const currentPage = useSelector(({characterReducer}) => characterReducer.current, shallowEqual);
  const moviesList = useSelector(({updateMovieReducer}) => updateMovieReducer.moviesList, shallowEqual);
  const lastMovieData = useSelector(({updateMovieReducer}) => updateMovieReducer.lastMovieData, shallowEqual);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    getNextCharacters(currentPage);
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  //Fetching and dispaching action in here to fetch intial characterdata
  const getNextCharacters = async pageUrl => {
    setLoading(true);
    const charData = [];
    const response = await fetch(pageUrl);
    const data = await response.json();

    for (const result of data.results) {
      charData.push({
        name: result.name,
        url: result.url
      });
    }

    dispatch(fetchNewCharacters(charData));
    setLoading(false);
  };

  // This function handles the change in character.
  // Fetch the movies and dispatch action to update movies.
  const handleChange = async (event) => {
    const url = event.target.value;
    setLoading(true);
    setValue(url);

    const response = await fetch(url);
    const data = await response.json();
    const moviesList = [];

    if (data.films) {
      for (const film of data.films) {
        const filmRes = await fetch(film);
        const filmData = await filmRes.json();
        moviesList.push(filmData);
      }
    }

    dispatch(updateMovies(moviesList));
    setLoading(false);
  };

  return (
    <div>
      <p style={{textAlign: 'center' }}>Select a Character from dropdown to see the movie list they were in!!</p>
      <select style={{ margin: '2%'}} value={value} onChange={handleChange} className="form-select form-select-sm w-50 mx-auto">
        <option key="default" value="">Select a Character</option>
        {characters &&
          characters.map((option, i) => (
            <option key={i} value={option.url}>
              {option.name}
            </option>
          ))
        }
      </select>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card style={{ width: '90%%', margin: '1%'}}>
            {(moviesList && moviesList.length) ? (
              <CardComponent 
                moviesList={moviesList}
              />
            ) : (
              <h3> No movies to display!! Select a character from the dropdown!!</h3>
            )}
          </Card>

          <div>
            {lastMovieData && 
              <LastMovieDetails 
                title={lastMovieData.title}
                releaseDate={lastMovieData.release_date}
              />
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
