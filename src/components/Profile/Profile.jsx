import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TweetCard from "../HomeSection/TweetCard";
import ProfileModal from "./ProfileModal";
import { useSelector, useDispatch } from "react-redux";
import { findUserById, followUserAction } from "../../Store/Auth/Action";
import { getUserTweets, getUserLikedTweets } from "../../Store/Tweet/Action";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tweets");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const auth = useSelector((state) => state.auth);
  const tweet = useSelector((state) => state.tweet);
  const { id } = useParams();

  // console.log("tweet",tweet);
  
  // Get the current logged-in user
  // console.log("auth",auth);
  const currentUser = auth.user;
  // console.log("currentUser",currentUser);

  const profileUser = auth.findUser;
  // console.log("profileUser",profileUser);
  // Check if the profile is of the current user
  const isOwnProfile = currentUser?.id === profileUser?.id;
  const user = profileUser;

  const [isFollowing, setIsFollowing] = useState(false);

  // Update isFollowing state when profile user data changes
  useEffect(() => {
    if (user?.followed !== undefined) {
      setIsFollowing(user.followed);
    }
  }, [user]);

  useEffect(() => {
    // If the profile ID is different from the current user's ID, fetch the profile user
    if(id) {
      dispatch(findUserById(id));
      dispatch(getUserTweets(id));
    }
  }, [id, dispatch]);

  // useEffect(() => {
  //   // Fetch user's tweets when the component mounts or when the user changes
  //   if (user?.id) {
      
  //   }
  // }, [user?.id, dispatch]);

  useEffect(() => {
    // Fetch user's liked tweets when the "likes" tab is active
    if (activeTab === "likes" && user?.id) {
      dispatch(getUserLikedTweets(user.id));
    }
  }, [activeTab, user?.id, dispatch]);

  const handleFollowToggle = () => {
    dispatch(followUserAction(user.id));
    setIsFollowing(!isFollowing);
    // Add API call here to update follow status
  };

  // Get the appropriate tweets based on the active tab
  const getTweetsToDisplay = () => {
    switch (activeTab) {
      case "tweets":
        return tweet.userTweets || [];
      case "likes":
        return tweet.likedTweets || [];
      default:
        return [];
    }
  };

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
            <h2 className="font-bold text-xl">{user?.fullName || "Loading..."}</h2>
            {/* <p className="text-sm text-gray-500">{tweet.userTweets?.length || 0} tweets</p> */}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="h-48 bg-gray-200">
        <img
          src={user?.coverImage || "https://www.orangepet.in/cdn/shop/articles/selective-closeup-cute-kitten-floor_1_800x.jpg?v=1693461218"}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="px-4 pb-4 border-b border-gray-200">
        {/* Avatar and Edit Button */}
        <div className="relative -mt-16 mb-3 flex justify-between items-start">
          <Avatar
            src={user?.profileImage || "https://www.orangepet.in/cdn/shop/articles/selective-closeup-cute-kitten-floor_1_800x.jpg?v=1693461218"}
            alt={user?.fullName || "User"}
            sx={{ width: 120, height: 120, border: "4px solid white" }}
          />
          {isOwnProfile ? (
            // Show Edit Profile button for logged-in user
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-1.5 border border-gray-300 rounded-full font-semibold hover:bg-gray-100">
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
          <h2 className="font-bold text-xl">{user?.fullName || "Loading..."}</h2>
          <p className="text-gray-500">@{user?.username || user?.fullName?.split(" ").join("_").toLowerCase()}</p>
        </div>

        {/* Bio */}
        <p className="mb-4">{user?.bio || "No bio available"}</p>

        {/* Location and Join Date */}
        <div className="flex gap-4 text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <LocationOnIcon fontSize="small" />
            <span>{user?.location || "No location"}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarMonthIcon fontSize="small" />
            <span>{user?.createdAt || "Joined recently"}</span>
          </div>
        </div>

        {/* Following/Followers */}
        <div className="flex gap-4">
          <button className="hover:underline">
            <span className="font-bold">{user?.following?.length || 0}</span>{" "}
            <span className="text-gray-500">Following</span>
          </button>
          <button className="hover:underline">
            <span className="font-bold">{user?.followers?.length || 0}</span>{" "}
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
      {activeTab === "tweets" && (
        <div className="divide-y divide-gray-200">
          {tweet.loading ? (
            <div className="p-4 text-center">Loading tweets...</div>
          ) : getTweetsToDisplay().length > 0 ? (
            getTweetsToDisplay().map((tweet) => (
              <TweetCard key={tweet.id} item={tweet} />
            ))
          ) : (
            <div className="p-4 text-center">No tweets found</div>
          )}
        </div>
      )}

      {/* Replies Section */}
      {activeTab === "replies" && <div className="p-4 text-center">
        
        </div>}

      {/* Media Section */}
      {activeTab === "media" && <div className="p-4 text-center">Media coming soon</div>}

      {/* Likes Section */}
      {activeTab === "likes" && (
        <div className="divide-y divide-gray-200">
          {tweet.loading ? (
            <div className="p-4 text-center">Loading liked tweets...</div>
          ) : getTweetsToDisplay().length > 0 ? (
            getTweetsToDisplay().map((tweet) => (
              <TweetCard key={tweet.id} item={tweet} />
            ))
          ) : (
            <div className="p-4 text-center">No liked tweets found</div>
          )}
        </div>
      )}

      {auth.user?.id == user?.id && <ProfileModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
            userData={user} // Pass the user data here
          />}
    </div>
  );
};

export default Profile;
