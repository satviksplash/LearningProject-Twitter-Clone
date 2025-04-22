import React, { use, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TweetCard from '../HomeSection/TweetCard';
import { useDispatch, useSelector } from 'react-redux';
import { findTweetById } from '../../Store/Tweet/Action';

const TweetDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useParams().id;
  useEffect(()=>{

  if(id){
    dispatch(findTweetById(id))
  }

  }, []);
  const tweet = useSelector((state) => state.tweet);
  const replies = tweet.tweet?.replyTweets;

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
      <TweetCard item={tweet.tweet} />
      </div>

      {/* Replies Section */}
      <div className="pt-4">
        <div className="px-4 py-2 font-bold text-lg border-b border-gray-200">
          Replies
        </div>
        <div className="divide-y divide-gray-200">
          {replies && replies.map((_, index) => (
            <TweetCard item={_} key={index} isReply={true}/>
          ))}
        </div>
        {replies?.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No replies yet. Be the first to reply!
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetDetails;