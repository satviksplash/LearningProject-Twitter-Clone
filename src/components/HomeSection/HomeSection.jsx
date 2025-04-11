import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import TweetCard from "./TweetCard";

const HomeSection = () => {
  const [tweets, setTweets] = useState([]);

  const [tweetText, setTweetText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [tweetImage, setTweetImage] = useState(null);

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
      setTweetImage(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const handleTweetSubmit = () => {
    if (tweetText.trim() || tweetImage) {
      const newTweet = {
        content: tweetText,
        image: tweetImage,
        timeStamp: Date.now(),
      };
      console.log(newTweet);
      // Here you would typically send the new tweet to your backend API
      // setTweets([newTweet, ...tweets]); // Add the new tweet to the list
      setTweetText(""); // Clear the text input
      setTweetImage(null); // Clear the image input
      setIsTyping(false); // Reset typing state
    }
  };

  return (
    <div className="flex flex-col w-full h-screen border-x border-gray-300">
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
        {tweetImage && (
          <div className="mt-2">
            <button
              onClick={() => setTweetImage(null)}
              className=" bg-gray-900 bg-opacity-50 text-white rounded p-1 mb-1  hover:bg-opacity-70"
            >
              ✕
            </button>
            <img
              src={tweetImage}
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
        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => (
          <TweetCard />
        ))}

        <div className="p-4 text-gray-500 text-center">
          No tweets yet. Start tweeting!
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
