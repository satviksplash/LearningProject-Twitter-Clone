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


  const currentUser = auth.user;
  // console.log("currentUser",currentUser);

  const profileUser = auth.findUser;
  // console.log("profileUser",profileUser);

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
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="hover:bg-gray-200 p-2 rounded-full cursor-pointer transition-colors">
            <ArrowBackIcon
              className="text-gray-700"
              onClick={() => navigate(-1)}
            />
          </div>
          <div>
            <h2 className="font-bold text-xl leading-6">{user?.fullName || "Loading..."}</h2>
            <p className="text-sm text-gray-500">{tweet.userTweets?.length || 0} tweets</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative px-4 pb-4 border-b border-gray-200">
        {/* Cover Image with overlay */}
        <div className="h-48 bg-gray-200 relative">
          <img
            src={user?.coverImage || "https://www.orangepet.in/cdn/shop/articles/selective-closeup-cute-kitten-floor_1_800x.jpg?v=1693461218"}
            alt="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>

        {/* Avatar and Edit/Follow Button */}
        <div className="relative -mt-16 mb-3 flex justify-between items-start px-4">
          {/* Avatar with white border */}
          <div className="ring-4 ring-white rounded-full shadow-md">
            <Avatar
              src={user?.profileImage || "https://www.orangepet.in/cdn/shop/articles/selective-closeup-cute-kitten-floor_1_800x.jpg?v=1693461218"}
              alt={user?.fullName || "User"}
              sx={{ width: 120, height: 120 }}
            />
          </div>

          {isOwnProfile ? (
            // Edit Profile button with better visibility
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="px-4 py-2 bg-white border-2 border-gray-300 rounded-full font-bold text-gray-800 
                         hover:bg-gray-100 transition-colors duration-200 shadow-md
                         active:scale-95 transform"
            >
              Edit Profile
            </button>
          ) : (
            // Follow/Unfollow button with enhanced styling
            <button
              onClick={handleFollowToggle}
              className={`px-5 py-2 rounded-full font-bold transition-all duration-200 
                         shadow-md active:scale-95 transform
                         ${isFollowing 
                           ? "bg-white border-2 border-gray-300 text-gray-800 hover:border-red-500 hover:text-red-600 hover:bg-red-50" 
                           : "bg-black text-white border-2 border-transparent hover:bg-gray-800"}`}
            >
              {isFollowing ? (
                <span className="flex items-center gap-1">
                  <span className="group-hover:hidden">Following</span>
                  <span className="hidden group-hover:inline text-red-600">Unfollow</span>
                </span>
              ) : (
                "Follow"
              )}
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-3">
          <div>
            <h2 className="font-bold text-xl leading-6">{user?.fullName || "Loading..."}</h2>
            <p className="text-gray-500 text-sm">@{user?.username || user?.fullName?.split(" ").join("_").toLowerCase()}</p>
          </div>

          {/* Bio */}
          <p className="text-gray-800 whitespace-pre-wrap">{user?.bio || "No bio available"}</p>

          {/* Location and Join Date */}
          <div className="flex gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1 hover:underline cursor-pointer">
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
            <button className="hover:underline transition-colors">
              <span className="font-bold">{user?.following?.length || 0}</span>{" "}
              <span className="text-gray-500">Following</span>
            </button>
            <button className="hover:underline transition-colors">
              <span className="font-bold">{user?.followers?.length || 0}</span>{" "}
              <span className="text-gray-500">Followers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["Tweets", "Followers", "Followings", "Likes"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-4 hover:bg-gray-100 transition-colors relative ${
              activeTab === tab.toLowerCase()
                ? "font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
            {activeTab === tab.toLowerCase() && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>
            )}
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
      {activeTab === "followers" && (
        <div className="divide-y divide-gray-200">
          {user?.followers?.length > 0 ? (
            user.followers.map((follower) => (
              <div 
                key={follower.id} 
                className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  navigate(`/profile/${follower.id}`)
                  setActiveTab("tweets")
                }}
              >
                <Avatar
                  src={follower.profileImage || "https://www.orangepet.in/cdn/shop/articles/selective-closeup-cute-kitten-floor_1_800x.jpg?v=1693461218"}
                  alt={follower.fullName}
                  sx={{ width: 50, height: 50, mr: 2 }}
                  className="ring-2 ring-gray-200"
                />
                <div className="flex-1">
                  <h3 className="font-bold hover:underline">{follower.fullName}</h3>
                  <p className="text-gray-500 text-sm">@{follower.username || follower.fullName?.split(" ").join("_").toLowerCase()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No followers yet</p>
            </div>
          )}
        </div>
      )}

      {/* Media Section */}
      {activeTab === "followings" && (
        <div className="divide-y divide-gray-200">
          {user?.following?.length > 0 ? (
            user.following.map((following) => (
              <div 
                key={following.id} 
                className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  navigate(`/profile/${following.id}`)
                  setActiveTab("tweets")
                }}
              >
                <Avatar
                  src={following.profileImage || "https://www.orangepet.in/cdn/shop/articles/selective-closeup-cute-kitten-floor_1_800x.jpg?v=1693461218"}
                  alt={following.fullName}
                  sx={{ width: 50, height: 50, mr: 2 }}
                />
                <div className="flex-1">
                  <h3 className="font-bold">{following.fullName}</h3>
                  <p className="text-gray-500">@{following.username || following.fullName?.split(" ").join("_").toLowerCase()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>Not following anyone yet</p>
            </div>
          )}
        </div>
      )}

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