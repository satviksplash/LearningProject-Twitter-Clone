import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TweetCard from "../HomeSection/TweetCard";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tweets");
  const [isFollowing, setIsFollowing] = useState(false);
  // Placeholder user data - replace with API call later

  // Hardcoded user data - replace with API call later

  const user = {
    id: 5,
    name: "John Doe",
    username: "johndoe",
    bio: "🚀 Full Stack Developer | Building awesome things",
    location: "San Francisco, CA",
    joinedDate: "Joined March 2024",
    following: 234,
    followers: 567,
    coverImage:
      "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
    avatar:
      "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
  };
  // Hardcoded logged-in user ID - replace with actual auth
  const loggedInUserId = 2;

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // Add API call here to update follow status
  };

  //     const renderContent = () => {
  //     switch (activeTab) {
  //       case 'tweets':
  //         return (
  //           <div className="divide-y divide-gray-200">
  //             {[1, 2, 3].map((_, index) => (
  //               <TweetCard key={index} />
  //             ))}
  //           </div>
  //         );
  //       case 'replies':
  //         return <div>Replies content</div>;
  //       case 'media':
  //         return <div>Media content</div>;
  //       case 'likes':
  //         return <div>Likes content</div>;
  //       default:
  //         return null;
  //     }
  //   };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3 px-4 py-2">
          <ArrowBackIcon
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div>
            <h2 className="font-bold text-xl">{user.name}</h2>
            <p className="text-sm text-gray-500">1,234 tweets</p>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="h-48 bg-gray-200">
        <img
          src={user.coverImage}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="px-4 pb-4 border-b border-gray-200">
        {/* Avatar and Edit Button */}
        <div className="relative -mt-16 mb-3 flex justify-between items-start">
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{ width: 120, height: 120, border: "4px solid white" }}
          />
          {user.id === loggedInUserId ? (
            // Show Edit Profile button for logged-in user
            <button className="px-4 py-1.5 border border-gray-300 rounded-full font-semibold hover:bg-gray-100">
              Edit Profile
            </button>
          ) : (
            // Show Follow/Unfollow button for other profiles
            <button
              onClick={handleFollowToggle}
              className={`px-4 py-1.5 rounded-full font-semibold ${
                isFollowing
                  ? "border border-gray-300 hover:border-red-300 hover:text-red-600 hover:bg-red-50"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="mb-4">
          <h2 className="font-bold text-xl">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>
        </div>

        {/* Bio */}
        <p className="mb-4">{user.bio}</p>

        {/* Location and Join Date */}
        <div className="flex gap-4 text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <LocationOnIcon fontSize="small" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarMonthIcon fontSize="small" />
            <span>{user.joinedDate}</span>
          </div>
        </div>

        {/* Following/Followers */}
        <div className="flex gap-4">
          <button className="hover:underline">
            <span className="font-bold">{user.following}</span>{" "}
            <span className="text-gray-500">Following</span>
          </button>
          <button className="hover:underline">
            <span className="font-bold">{user.followers}</span>{" "}
            <span className="text-gray-500">Followers</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["Tweets", "Replies", "Media", "Likes"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-4 hover:bg-gray-100 ${
              activeTab === tab.toLowerCase()
                ? "border-b-4 border-blue-500 font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tweets Section */}
      {activeTab == "tweets" && (
        <div className="divide-y divide-gray-200">
          {/* Using the existing TweetCard component */}
          {[1, 2, 3].map((_, index) => (
            <TweetCard key={index} />
          ))}
        </div>
      )}

      {/* Replies Section */}
      {activeTab === "replies" && <div>Replies</div>}

      {/* Media Section */}
      {activeTab === "media" && <div>Media</div>}

      {/* Likes Section */}
      {activeTab === "likes" && <div>Likes</div>}
    </div>
  );
};

export default Profile;
