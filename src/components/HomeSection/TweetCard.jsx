import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RepeatIcon from "@mui/icons-material/Repeat";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyModal from "./ReplyModal";
import { useDispatch, useSelector } from "react-redux";
import { createReTweet, deleteTweet, likeTweet } from "../../Store/Tweet/Action";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
const formatDate = (dateString) => {  
  if (!dateString) return "";

  const tweetDate = dayjs(dateString);
  const now = dayjs();
  const diffInMinutes = now.diff(tweetDate, 'minute');
  const diffInHours = now.diff(tweetDate, 'hour');
  const diffInDays = now.diff(tweetDate, 'day');

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours - 5}h`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d`;
  } else {
    return tweetDate.format("MMM D"); // e.g., "Apr 16"
  }
};

const TweetCard = ({item}) => {

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // State to toggle the menu

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // console.log(" auth : ",auth);

  const loggedInUserId = auth?.user?.id; // Hardcoded logged-in user ID - replace with actual auth
  const tweetUserId = item?.user?.id; // Hardcoded tweet user ID - replace with actual data
  const isLoggedInUser = loggedInUserId === tweetUserId; // Check if the logged-in user is the tweet owner

  const handleDelete = () => {
    dispatch(deleteTweet(item.id));
    console.log("Tweet deleted");
    setShowMenu(false); // Close the menu after deletion
    // Add your delete logic here
  };
  const handleEdit = () => {
    console.log("Tweet editted");
    setShowMenu(false); // Close the menu after deletion
    // Add your edit logic here
  };

  const handleRetweet = () => {
    dispatch(createReTweet(item.id));
    console.log("Tweet retweeted");
  }

  const handleLikeToggle = () => {
    // setLiked(!liked); // Toggle like/unlike state
    // Add your like/unlike logic here
    dispatch(likeTweet(item.id));
    console.log("Tweet liked/unliked");

  };

  return (
    <div className="p-4 border-b border-gray-300 hover:bg-gray-100">
      {/* Retweet Info */}
      {item?.retweet && <div className="flex items-center text-sm text-gray-500 mb-2">
        <RepeatIcon fontSize="small" />
        <p className="ml-1">{item?.user?.fullName} retweeted</p>
      </div>}

      {/* Main Tweet Content */}
      <div className="flex space-x-3">
        {/* Avatar */}
        <Avatar
          onClick={() => navigate(`/profile/${item?.user?.id}`)}
          className="cursor-pointer"
          alt="John Doe"
          src={item?.user?.profileImage || "https://res.cloudinary.com/demo/image/upload/kitten.jpg"}
        />

        {/* Tweet Details */}
        <div className="w-full ">
          {/* Header (Name, Username, Timestamp) */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{item?.user?.fullName}</span>
              <span className="text-gray-600">@{item?.user?.fullName.split(" ").join("_").toLowerCase()} · {formatDate(item?.createdAt)}</span>
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
          <div
            onClick={() => navigate(`/tweet/${item.id}`)}
            className="cursor-pointer"
          >
            <p className="mt-2 text-gray-800">
              {item?.content}
            </p>

            {/* Tweet Image */}
            {item?.image &&  <div className="mt-3">
              <img
                src={item.image}
                alt="Tweet"
                className="w-full h-auto rounded-lg"
              />
            </div>}
          </div>

          <div className="flex justify-between items-center mt-4 text-gray-500">
            {/* Comments */}
            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
              <div onClick={() => setIsReplyModalOpen(true)}>
                <CommentIcon fontSize="small" />
              </div>
              <span className="text-sm">{item?.totalReplies}</span>
            </div>

            {/* Retweet/Repost */}
            <div className="flex items-center space-x-1 cursor-pointer hover:text-green-500">
              <RepeatIcon  onClick={handleRetweet} fontSize="small" />
              <span className="text-sm">{item?.totalRetweets}</span>
            </div>

            {/* Like/Unlike */}
            <div
              className="flex items-center space-x-1 cursor-pointer hover:text-red-500"
              onClick={handleLikeToggle}
            >
              {item?.liked ? (
                <FavoriteIcon fontSize="small" className="text-red-500" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
              <span className="text-sm">{item?.totalLikes}</span>
            </div>
          </div>
        </div>
      </div>

      <ReplyModal 
  open={isReplyModalOpen}
  handleClose={() => setIsReplyModalOpen(false)}
  item={item}
/>
    </div>
  );
};

export default TweetCard;
