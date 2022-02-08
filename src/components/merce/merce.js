import React from "react";
import  { useReducer, useEffect } from "react";
import './merce.css';


const productjsons=`{
  "kind": "youtube#searchListResponse",
  "etag": "KMiB_gAg6t8FgpAWXeDHOANaJAo",
  "nextPageToken": "CAQQAA",
  "regionCode": "BD",
  "pageInfo": {
    "totalResults": 1000000,
    "resultsPerPage": 4
  },
  "items": [
    {
      "kind": "youtube#searchResult",
      "etag": "vgw9D-MOCyQK9mWQcZOWsoCnLvI",
      "id": {
        "kind": "youtube#video",
        "videoId": "DWBlN9o6Azc"
      },
      "snippet": {
        "publishedAt": "2019-09-27T16:04:41Z",
        "channelId": "UCftwRNsjfRo08xYE31tkiyw",
        "title": "Mark Cuban Answers Business Questions From Twitter | Tech Support | WIRED",
        "description": "Mark Cuban uses the power of Twitter to answer common questions about business and being a mogul. How do you start a ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/DWBlN9o6Azc/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/DWBlN9o6Azc/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/DWBlN9o6Azc/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "WIRED",
        "liveBroadcastContent": "none",
        "publishTime": "2019-09-27T16:04:41Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "KJt6NoZDeTupv-tuRCeehuM0v48",
      "id": {
        "kind": "youtube#video",
        "videoId": "ARoGZIN5oC4"
      },
      "snippet": {
        "publishedAt": "2018-12-15T07:22:10Z",
        "channelId": "UC2U_ApECr-ifnTu9GIHcAEg",
        "title": "Elon Musk on Millennials and How To Start A Business",
        "description": "Elon Musk Biography: https://amzn.to/2q1A5yv Elon Musk Merchandise: https://amzn.to/2BOwerg Published on Jan 26, 2016 Elon ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/ARoGZIN5oC4/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/ARoGZIN5oC4/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/ARoGZIN5oC4/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Elon Musk Viral Videos",
        "liveBroadcastContent": "none",
        "publishTime": "2018-12-15T07:22:10Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "oCPrndCSD_PZXcUzBHLh18q0WG4",
      "id": {
        "kind": "youtube#video",
        "videoId": "CQHPNu36ai0"
      },
      "snippet": {
        "publishedAt": "2019-04-24T19:05:40Z",
        "channelId": "UCGeBogGDZ9W3dsGx-mWQGJA",
        "title": "Ray J: From Kim K to Tech Business Mogul - IMPAULSIVE EP. 66",
        "description": "Ray J proves he has moved on from home movies to bigger and better things... family life, business investing, and mending past ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/CQHPNu36ai0/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/CQHPNu36ai0/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/CQHPNu36ai0/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "IMPAULSIVE",
        "liveBroadcastContent": "none",
        "publishTime": "2019-04-24T19:05:40Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "umiIg_NM3JhtDJRWWAB9_xzedgE",
      "id": {
        "kind": "youtube#video",
        "videoId": "syoZLG6vrlE"
      },
      "snippet": {
        "publishedAt": "2020-11-12T09:22:23Z",
        "channelId": "UCkD68_FrlQ7BvZi3VcpjOPw",
        "title": "Tech = Business for all pupose in the world",
        "description": "Gaming er dope. Er du gira på å leve av skillsa dine? Tech er fremtida. Make it your business.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/syoZLG6vrlE/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/syoZLG6vrlE/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/syoZLG6vrlE/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Handelshøyskolen BI",
        "liveBroadcastContent": "none",
        "publishTime": "2020-11-12T09:22:23Z"
      }
    }
  ]
}`;



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
          alt={`The Product titled: ${movie["snippet"]["title"]}`}
          src={poster}
        />
      </div>
	        <h3>{renderHTML(movie["snippet"]["title"])}</h3>
     
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



const Merce = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
				Promise.resolve(productjsons).then(JSON.parse).then(jsonResponse => {
        console.log(jsonResponse);
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.items
        	});
			
			
      	});
  	}, []);



    const { movies, errorMessage, loading } = state;

    return (
    <div className="merce">
      <h1 className="merce-intro">Sharing a few of our favorite Products</h1>
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

export default Merce;