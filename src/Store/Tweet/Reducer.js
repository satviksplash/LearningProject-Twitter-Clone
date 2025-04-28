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
  GET_ALL_TWEETS_WITH_PAGINATION_FAILURE,
  GET_ALL_TWEETS_WITH_PAGINATION_SUCCESS,
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
      case GET_ALL_TWEETS_REQUEST:
      case GET_USER_TWEETS_REQUEST:

      case REPLY_TWEET_REQUEST:

      return {
        ...state,
        loading: true,
        error: null,
      };

    // All failure cases
    case TWEET_CREATE_FAILURE:
    case TWEET_DELETE_FAILURE:
    case USER_LIKE_TWEET_FAILURE:
    case LIKE_TWEET_FAILURE:
    case RETWEET_FAILURE:
    case FIND_TWEET_BY_ID_FAILURE:
    case GET_ALL_TWEETS_FAILURE:
    case GET_USER_TWEETS_FAILURE:
    case REPLY_TWEET_FAILURE:
    case GET_ALL_TWEETS_WITH_PAGINATION_FAILURE:
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

      case REPLY_TWEET_SUCCESS:
        return {
          ...state,
          loading: false,
          tweets: state.tweets.map(tweet => 
            tweet.id === action.payload.id ? action.payload : tweet
          ),
          tweet: state.tweet?.id === action.payload.id ? action.payload : state.tweet,
          error: null,
        };

    // Tweet deletion
    case TWEET_DELETE_SUCCESS:
  return {
    ...state,
    loading: false,
    // Remove from tweets array
    tweets: state.tweets.filter(tweet => tweet.id !== action.payload),
    // Remove from userTweets
    userTweets: state.userTweets.filter(tweet => tweet.id !== action.payload),
    // If we're in tweet details and a reply was deleted
    tweet: state.tweet ? {
      ...state.tweet,
      // Filter out the deleted reply
      replyTweets: state.tweet.replyTweets?.filter(
        reply => reply.id !== action.payload
      ) || [],
      // Decrease the reply count
      totalReplies: Math.max(0, (state.tweet.totalReplies || 1) - 1)
    } : state.tweet,
    error: null,
  };

    // Get all tweets
    case GET_ALL_TWEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: action.payload,
        error: null,
      };
    case GET_USER_TWEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        userTweets: action.payload,
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
    like: action.payload,
    // Update in tweets array
    tweets: state.tweets.map(tweet => 
      tweet.id === action.payload.tweet.id ? {
        ...tweet,
        liked: !tweet.liked,
        totalLikes: tweet.liked ? tweet.totalLikes - 1 : tweet.totalLikes + 1
      } : tweet
    ),
    // Update in tweet details (both parent and replies)
    tweet: state.tweet ? {
      ...state.tweet,
      // If the liked tweet is the parent tweet
      ...(state.tweet.id === action.payload.tweet.id ? {
        liked: !state.tweet.liked,
        totalLikes: state.tweet.liked ? state.tweet.totalLikes - 1 : state.tweet.totalLikes + 1
      } : {}),
      // If the liked tweet is a reply, update it in replyTweets
      replyTweets: state.tweet.replyTweets?.map(reply =>
        reply.id === action.payload.tweet.id ? {
          ...reply,
          liked: !reply.liked,
          totalLikes: reply.liked ? reply.totalLikes - 1 : reply.totalLikes + 1
        } : reply
      ) || []
    } : state.tweet,
    error: null,
  };

    // Find tweet by ID
    case FIND_TWEET_BY_ID_SUCCESS:
    // case REPLY_TWEET_SUCCESS:
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

    case GET_ALL_TWEETS_WITH_PAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: action.payload.content,
        pagedTweets: action.payload,
        error: null,
      };

    default:
      return state;
  }
};

export default tweetReducer;
