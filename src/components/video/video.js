import React from "react";
import  { useReducer, useEffect } from "react";

import Search from "./search";
import './video.css';



const VIDEO_API_URL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDWcJB3l9Ir65XDKNLT2gKqfVkr-rGuzCc&part=snippet&order=viewCount&maxResults=3";


const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
const VideoItem = ({ movie }) => {
  const poster =
    movie["snippet"]["thumbnails"]["medium"]["url"] === "" ? DEFAULT_PLACEHOLDER_IMAGE : movie["snippet"]["thumbnails"]["medium"]["url"];
  return (
    <div className="movie">

      <div>
        <img
          width="100%"
          alt={`The video titled: ${movie["snippet"]["title"]}`}
          src={poster}
        />
      </div>
	        <h2>{renderHTML(movie["snippet"]["title"])}</h2>
      <p>({movie["snippet"]["publishTime"]})</p>
    </div>
  );
};



const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
	console.log("ACTION: "+action.type);
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



const Video = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    
        fetch(VIDEO_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        console.log(jsonResponse);
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.items
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_MOVIES_REQUEST"
    	});
	
        fetch(VIDEO_API_URL+`&q=${searchValue}`)
      	.then(response => response.json())
      	.then(jsonResponse => {
			console.log(jsonResponse);
          	dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.items
          	});
      	});
	  };

    const { movies, errorMessage, loading } = state;
    return (
    <div className="video">
      <Search search={search} />
      <p className="video-intro">Sharing a few of our favorite videos</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <VideoItem key={`${index}-${movie.name}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default Video;