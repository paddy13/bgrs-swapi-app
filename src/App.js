import Loader from "./utils/loader";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { useState, useEffect } from "react";
import { updateMovies } from "./Actions/updateMovie";
import CardComponent from "./Component/CardComponent";
import LastMovieDetails from "./Component/LastMovieDetails";

function App(props) {
  const [value, setValue] = useState("");
  const [lastMovieData, setLastMovieData] = useState({});
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    var charData = [];
    async function fetchCharData() {
      const response = await fetch("https://swapi.dev/api/people");
      const data = await response.json();

      for (const result of data.results) {
        charData.push({
          name: result.name,
          url: result.url
        });
      }
      setCharacters(charData);
    }

    fetchCharData();
  }, [])

  const handleChange = async (event) => {
    setLoading(true);
    const url = event.target.value;
    setValue(url);
    setLastMovieData({});

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

    props.updateMovies(moviesList);
    if (moviesList.length) {
      setLastMovieData(moviesList[moviesList.length - 1]);
    }
    setLoading(false);
  };

  return (
    <div>
      <p style={{textAlign: 'center' }}>Select a Character from dropdown to see the movie list they were in!!</p>
      <select style={{ margin: '2%'}} value={value} onChange={handleChange} className="form-select form-select-sm w-50 mx-auto">
        {characters &&
          characters.map((option, i) => (
            <option key={i} value={option.url}>
              {option.name}
            </option>
          ))}
      </select>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card style={{ width: '90%%', margin: '1%'}}>
            {(props.moviesList && props.moviesList.length) ? (
              <CardComponent 
                moviesList={props.moviesList}
              />
            ) : (
              <h3> No movies to display!! Select a character from the dropdown!!</h3>
            )}
          </Card>

          <div>
            <LastMovieDetails 
              title={lastMovieData.title}
              releaseDate={lastMovieData.release_date}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const { updateMovieReducer } = state;
  return {
    moviesList: updateMovieReducer.moviesList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateMovies: updateMovies
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
