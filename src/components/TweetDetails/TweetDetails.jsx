import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TweetCard from '../HomeSection/TweetCard';

const TweetDetails = () => {
  const navigate = useNavigate();

  // Hardcoded data for now - replace with API call using useEffect
  const mainTweet = {
    id: 1,
    content: "This is the main tweet 🚀",
    userId: 5,
    timestamp: "2h",
    likes: 45,
    retweets: 5,
    comments: 12,
  };

  // Hardcoded replies - replace with API call
  const replies = [
    {
      id: 2,
      content: "This is a reply 👋",
      userId: 6,
      timestamp: "1h",
    },
    {
      id: 3,
      content: "Another reply 🎉",
      userId: 7,
      timestamp: "30m",
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-2">
          <ArrowBackIcon 
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="font-bold text-xl">Tweet</span>
        </div>
      </div>

      {/* Main Tweet */}
      <div className="border-b border-gray-200">
        <TweetCard />
      </div>

      {/* Replies Section */}
      <div className="pt-4">
        <div className="px-4 py-2 font-bold text-lg border-b border-gray-200">
          Replies
        </div>
        <div className="divide-y divide-gray-200">
          {replies.map((_, index) => (
            <TweetCard key={index} />
          ))}
        </div>
        {replies.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No replies yet. Be the first to reply!
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetDetails;