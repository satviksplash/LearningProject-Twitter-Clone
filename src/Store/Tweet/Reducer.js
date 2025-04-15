import {
  TWEET_CREATE_REQUEST,
  TWEET_CREATE_SUCCESS,
  TWEET_CREATE_FAILURE,
  TWEET_DELETE_REQUEST,
  TWEET_DELETE_SUCCESS,
  TWEET_DELETE_FAILURE,
  GET_ALL_TWEETS_REQUEST,
  GET_ALL_TWEETS_SUCCESS,
  GET_ALL_TWEETS_FAILURE,
  GET_USER_TWEETS_REQUEST,
  GET_USER_TWEETS_SUCCESS,
  GET_USER_TWEETS_FAILURE,
  USER_LIKE_TWEET_REQUEST,
  USER_LIKE_TWEET_SUCCESS,
  USER_LIKE_TWEET_FAILURE,
  LIKE_TWEET_REQUEST,
  LIKE_TWEET_SUCCESS,
  LIKE_TWEET_FAILURE,
  FIND_TWEET_BY_ID_REQUEST,
  FIND_TWEET_BY_ID_SUCCESS,
  FIND_TWEET_BY_ID_FAILURE,
  REPLY_TWEET_REQUEST,
  REPLY_TWEET_SUCCESS,
  REPLY_TWEET_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,
  tweets: [],
  tweet: null,
  likedTweets: [],
  userTweets: [],
  like: null,
  error: null,
};

export const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    // All request cases
    case TWEET_CREATE_REQUEST:
    case TWEET_DELETE_REQUEST:
    case USER_LIKE_TWEET_REQUEST:
    case LIKE_TWEET_REQUEST:
    case RETWEET_REQUEST:
    case FIND_TWEET_BY_ID_REQUEST:
      // case GET_ALL_TWEETS_REQUEST:
      // case GET_USER_TWEETS_REQUEST:

      // case REPLY_TWEET_REQUEST:

      return {
        ...state,
        loading: true,
        error: null,
      };

    // All failure cases
    case TWEET_CREATE_REQUEST:
    case TWEET_DELETE_REQUEST:
    case USER_LIKE_TWEET_REQUEST:
    case LIKE_TWEET_REQUEST:
    case RETWEET_REQUEST:
    case FIND_TWEET_BY_ID_REQUEST:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Tweet creation
    case TWEET_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: [action.payload, ...state.tweets],
        userTweets: [action.payload, ...state.userTweets],
        error: null,
      };

    // Tweet deletion
    case TWEET_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: state.tweets.filter(
          (tweet) => tweet.id !== action.payload
        ),
        userTweets: state.userTweets.filter(
          (tweet) => tweet.id !== action.payload
        ),
        error: null,
      };

    // Get all tweets
    case GET_ALL_TWEETS_SUCCESS:
    case GET_USER_TWEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: action.payload,
        error: null,
      };

    // User liked tweets
    case USER_LIKE_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        likedTweets: action.payload,
        error: null,
      };

    // Like/Unlike tweet
    case LIKE_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        like:action.payload,
        error: null,
      };

    // Find tweet by ID
    case FIND_TWEET_BY_ID_SUCCESS:
    case REPLY_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        tweet: action.payload,
        error: null,
      };

    // Reply to tweet
    
    

    // Retweet
    case RETWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: [action.payload, ...state.tweets],
        userTweets: [action.payload, ...state.userTweets],
        error: null,
      };

    default:
      return state;
  }
};

export default tweetReducer;
