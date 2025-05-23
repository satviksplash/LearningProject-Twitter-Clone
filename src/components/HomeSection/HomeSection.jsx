import React, { useEffect, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import TweetCard from "./TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { createTweet, getAllTweets, getAllTweetsWithPagination } from "../../Store/Tweet/Action";
import uploadToCloudnary from "../../Utils/uploadToCloudnary";

const HomeSection = () => {
  const dispatch = useDispatch();
  const tweet =  useSelector((state) => state.tweet);
  // console.log(tweet);
  // const [tweets, setTweets] = useState([]);
  const [tweetText, setTweetText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [tweetImage, setTweetImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [page, setPage] = useState(0);

  const  totalPages = tweet.pagedTweets?.totalPages;
  const  totalElements = tweet.pagedTweets?.totalElements;

  const handleTweetChange = (e) => {
    const text = e.target.value;
    if (text.length <= 250) {
      setTweetText(text);
      setIsTyping(text.length > 0); // Show character count only when typing
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTweetImage(file); // Store the actual file
      setImagePreview(URL.createObjectURL(file)); // Store URL for preview only
    }
  };

  useEffect(()=>{
    // console.log("in useEffect")
    dispatch(getAllTweetsWithPagination(page));
  }, [dispatch, page,  tweet.like])


  const handleTweetSubmit =  async () => {
    if (tweetText.trim() || tweetImage) {
      const url = await uploadToCloudnary(tweetImage); // Now passing the actual file
      const newTweet = {
        content: tweetText,
        image: url,
        createdAt: new Date().toISOString(),
      };
      dispatch(createTweet(newTweet));
      setTweetText("");
      setTweetImage(null);
      setImagePreview(null); // Clear preview
      setIsTyping(false);

      setPage(0);
      dispatch(getAllTweetsWithPagination(0));
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen border-x border-gray-300">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-300">
        <h1 className="text-xl font-bold">Home</h1>
      </div>

      {/* Tweet Input Box */}
      <div className="p-4 border-b border-gray-300">
        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
          placeholder="What's happening?"
          value={tweetText}
          onChange={handleTweetChange}
        ></textarea>
        {isTyping && (
          <div className="text-right text-sm text-gray-500">
            {tweetText.length}/250
          </div>
        )}
        {imagePreview && ( // Change tweetImage to imagePreview for display
      <div className="mt-2">
        <button
          onClick={() => {
            setTweetImage(null);
            setImagePreview(null);
          }}
          className="bg-gray-900 bg-opacity-50 text-white rounded p-1 mb-1 hover:bg-opacity-70"
        >
          ✕
        </button>
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full h-auto rounded-lg"
        />
      </div>
    )}
        <div className="flex justify-between items-center mt-2">
          {/* Image Upload Icon */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="text-blue-500 hover:text-blue-600 text-xl">
              <ImageIcon />
            </span>
          </label>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            onClick={handleTweetSubmit}
            disabled={!tweetText.trim() && !tweetImage} // Disable button if no text or image
          >
            Tweet
          </button>
        </div>
      </div>

      {/* Tweets Feed */}
<div className="flex flex-col mx-5 my-5">
  {tweet.tweets.map((item, index) => (
    <TweetCard item={item} key={index}/>
  ))}

  {tweet.tweets.length === 0 && (
    <div className="p-4 text-gray-500 text-center">
      No tweets yet. Start tweeting!
    </div>
  )}

  {/* Pagination Bar */}
  {totalPages > 1 && (
    <div className="flex items-center justify-center gap-2 mt-4 py-4">
      {/* Previous Page Button */}
      <button 
        onClick={() => setPage(prev => Math.max(0, prev - 1))}
        disabled={page === 0}
        className={`px-3 py-1 rounded-full border ${
          page === 0 
            ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
            : 'text-gray-600 border-gray-300 hover:bg-gray-50'
        }`}
      >
        ←
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              page === index
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Next Page Button */}
      <button 
        onClick={() => setPage(prev => Math.min(totalPages - 1, prev + 1))}
        disabled={page === totalPages - 1}
        className={`px-3 py-1 rounded-full border ${
          page === totalPages - 1
            ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
            : 'text-gray-600 border-gray-300 hover:bg-gray-50'
        }`}
      >
        →
      </button>

      {/* Total tweets info */}
      <span className="text-sm text-gray-500 ml-4">
        {totalElements} tweets
      </span>
    </div>
  )}
</div>
    </div>
  );
};

export default HomeSection;
