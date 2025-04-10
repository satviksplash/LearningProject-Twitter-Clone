import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RepeatIcon from "@mui/icons-material/Repeat";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const TweetCard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // State to toggle the menu
  const [liked, setLiked] = useState(false); // State to toggle like/unlike

  const loggedInUserId = 5; // Hardcoded logged-in user ID - replace with actual auth
  const tweetUserId = 5; // Hardcoded tweet user ID - replace with actual data
  const isLoggedInUser = loggedInUserId === tweetUserId; // Check if the logged-in user is the tweet owner
  
  const handleDelete = () => {
    console.log("Tweet deleted");
    setShowMenu(false); // Close the menu after deletion
    // Add your delete logic here
  };
  const handleEdit = () => {
    console.log("Tweet editted");
    setShowMenu(false); // Close the menu after deletion
    // Add your edit logic here
  };

  const handleLikeToggle = () => {
    setLiked(!liked); // Toggle like/unlike state
  };



  return (
    <div className="p-4 border-b border-gray-300 hover:bg-gray-100">
      {/* Retweet Info */}
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <RepeatIcon fontSize="small" />
        <p className="ml-1">John Doe retweeted</p>
      </div>

      {/* Main Tweet Content */}
      <div className="flex space-x-3">
        {/* Avatar */}
        <Avatar
          onClick={() => navigate(`/profile/${5}`)}
          className="cursor-pointer"
          alt="John Doe"
          src="https://res.cloudinary.com/demo/image/upload/kitten.jpg"
        />

        {/* Tweet Details */}
        <div className="w-full">
          {/* Header (Name, Username, Timestamp) */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">John Doe</span>
              <span className="text-gray-600">@johndoe · 2m</span>
            </div>

            {/* More Options Icon */}
            <div className="relative">
              <MoreHorizIcon
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowMenu(!showMenu)}
              />
              {isLoggedInUser && showMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleEdit()}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tweet Content */}
          <p className="mt-2 text-gray-800">
            This is a hardcoded tweet for demonstration purposes. 🚀
          </p>

          {/* Tweet Image */}
          {
            <div className="mt-3">
              <img
                src="https://res.cloudinary.com/demo/image/upload/kitten.jpg"
                alt="Tweet"
                className="w-full h-auto rounded-lg"
              />
            </div>
          }

          <div className="flex justify-between items-center mt-4 text-gray-500">
            {/* Comments */}
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
              <CommentIcon fontSize="small" />
              <span className="text-sm">12</span>
            </div>

            {/* Retweet/Repost */}
            <div className="flex items-center space-x-1 cursor-pointer hover:text-green-500">
              <RepeatIcon fontSize="small" />
              <span className="text-sm">5</span>
            </div>

            {/* Like/Unlike */}
            <div
              className="flex items-center space-x-1 cursor-pointer hover:text-red-500"
              onClick={handleLikeToggle}
            >
              {liked ? (
                <FavoriteIcon fontSize="small" className="text-red-500" />
              ) : (
                <FavoriteBorderIcon fontSize="small"/>
              )}
              <span className="text-sm">{liked ? "1" : "0"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
