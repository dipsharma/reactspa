import  { useReducer, useEffect } from "react";
import './music.css';

const MUSIC_API_URL = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rj&api_key=f5ddf06f9284ae017512914bbf7f4466&format=json";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const MusicItem = ({ movie }) => {
  const poster =
    movie["image"][2]["#text"] === "" ? DEFAULT_PLACEHOLDER_IMAGE : movie["image"][2]["#text"];
  return (
    <div className="item">

      <div>
        <img
          width="200"
          alt={`The music titled: ${movie.name}`}
          src={poster}
        />
      </div>
	        <h2>{movie["name"]}</h2>
      <p>({movie["date"]["#text"]})</p>
    </div>
  );
};


const Music = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    
        fetch(MUSIC_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        console.log(jsonResponse);
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.recenttracks.track
        	});
      	});
  	}, []);



    const { movies, errorMessage, loading } = state;

    return (
    <div className="music">
      

      <p className="music-intro">Sharing a few of our favourite music albums</p>
      <div className="items">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <MusicItem key={`${index}-${movie.name}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default Music;