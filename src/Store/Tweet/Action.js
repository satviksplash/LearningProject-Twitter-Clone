import { api, getApi } from "../../config/api";
import {
  FIND_TWEET_BY_ID_FAILURE,
  FIND_TWEET_BY_ID_SUCCESS,
  GET_ALL_TWEETS_FAILURE,
  GET_ALL_TWEETS_REQUEST,
  GET_ALL_TWEETS_SUCCESS,
  GET_USER_TWEETS_FAILURE,
  GET_USER_TWEETS_SUCCESS,
  LIKE_TWEET_FAILURE,
  LIKE_TWEET_SUCCESS,
  REPLY_TWEET_FAILURE,
  REPLY_TWEET_SUCCESS,
  RETWEET_FAILURE,
  RETWEET_SUCCESS,
  TWEET_CREATE_FAILURE,
  TWEET_CREATE_SUCCESS,
  TWEET_DELETE_FAILURE,
  TWEET_DELETE_SUCCESS,
  USER_LIKE_TWEET_FAILURE,
  USER_LIKE_TWEET_SUCCESS,
} from "./ActionType";

export const getAllTweets = () => async (dispatch) => {
  try {
    const { data } = await getApi().get("/api/tweets");
    console.log("get all tweets", data);

    dispatch({ type: GET_ALL_TWEETS_SUCCESS, payload: data });
  } catch (err) {
    console.log("catch error  -> ", err);
    dispatch({ type: GET_ALL_TWEETS_FAILURE, payload: err.message });
  }
};

export const getUserTweets = (userId) => async (dispatch) => {
  try {
    const { data } = await getApi().get(`/api/tweets/user/${userId}`);
    console.log(`get user tweets userId : ${userId}`, data);

    dispatch({ type: GET_USER_TWEETS_SUCCESS, payload: data });
  } catch (err) {
    console.log("catch error  -> ", err);
    dispatch({ type: GET_USER_TWEETS_FAILURE, payload: err.message });
  }
};

export const findTweetById = (tweetId) => async (dispatch) => {
  try {
    const { data } = await getApi().get(`/api/tweets/${tweetId}`);
    console.log("find tweet by id", data);

    dispatch({ type: FIND_TWEET_BY_ID_SUCCESS, payload: data });
  } catch (err) {
    console.log("catch error  -> ", err);
    dispatch({ type: FIND_TWEET_BY_ID_FAILURE, payload: err.message });
  }
};

export const getUserLikedTweets = (userId) => async (dispatch) => {
  try {
    const { data } = await getApi().get(`/api/tweets/user/${userId}/likes`);
    console.log("get user liked tweets", data);

    dispatch({ type: USER_LIKE_TWEET_SUCCESS, payload: data });
  } catch (err) {
    console.log("catch error  -> ", err);
    dispatch({ type: USER_LIKE_TWEET_FAILURE, payload: err.message });
  }
}

export const createTweet = (tweetData) => async (dispatch) => {
  console.log("tweetData : ", tweetData);
  try {
    const { data } = await getApi().post(`/api/tweets/create`, tweetData);
    console.log("created tweet : ", data);

    dispatch({ type: TWEET_CREATE_SUCCESS, payload: data });
  } catch (err) {
    console.log("catch error  -> ", err);
    dispatch({ type: TWEET_CREATE_FAILURE, payload: err.message });
  }
};

export const createTweetReply = (tweetData) => async (dispatch) => {
  console.log("tweetData : ", tweetData);
  try {
    const replyRequest = {
      content: tweetData.content,
      tweetId: tweetData.tweetId,
      createdAt: new Date().toISOString(), // Convert to ISO string for LocalDateTime
      image: tweetData.image || null
    };
    const { data } = await getApi().post(`/api/tweets/reply`, replyRequest);
    console.log("reply tweet : ", data);

    dispatch({ type: REPLY_TWEET_SUCCESS, payload: data });
  } catch (err) {
    console.log("catch error  -> ", err);
    dispatch({ type: REPLY_TWEET_FAILURE, payload: err.message });
  }
};

export const createReTweet = (tweetId) => async (dispatch) => {
  try {
    const { data } = await getApi().put(`/api/tweets/${tweetId}/retweet`);
    console.log("created retweet : ", data);

    dispatch({ type: RETWEET_SUCCESS, payload: data });
  } catch (err) {
    console.log("catch error  -> ", err);
    dispatch({ type: RETWEET_FAILURE, payload: err.message });
  }
};

export const likeTweet = (tweetId) => async (dispatch) => {
  try {
    const { data } = await getApi().post(`/api/${tweetId}/like`);
    console.log("liked tweet : ", data);

    dispatch({ type: LIKE_TWEET_SUCCESS, payload: data });
  } catch (err) {
    console.log("catch error  -> ", err);
    dispatch({ type: LIKE_TWEET_FAILURE, payload: err.message });
  }
};

export const deleteTweet = (tweetId) => async (dispatch) => {
  try {
    const { data } = await getApi().delete(`/api/tweets/${tweetId}`);
    console.log("deleted tweet : ", data);

    dispatch({ type: TWEET_DELETE_SUCCESS, payload: tweetId });
  } catch (err) {
    console.log("catch error  -> ", err);
    dispatch({ type: TWEET_DELETE_FAILURE, payload: err.message });
  }
};
