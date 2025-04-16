import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Store/Auth/Action';
import { Avatar } from '@mui/material';

const RightPart = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResult, loading } = useSelector((state) => state.auth);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(searchUser(searchQuery));
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, dispatch]);

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="sticky top-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Twitter"
            className="w-full bg-gray-100 rounded-full py-2 px-10 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && setShowResults(true)}
          />
          <SearchIcon className="absolute left-3 top-2.5 text-gray-500" />
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="mt-2 bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto z-10">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : searchResult && searchResult.length > 0 ? (
              searchResult.map((user) => (
                <div 
                  key={user.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleUserClick(user.id)}
                >
                  <Avatar 
                    src={user.profileImage || "https://images.vexels.com/media/users/3/129733/isolated/preview/a558682b158debb6d6f49d07d854f99f-casual-male-avatar-silhouette.png"} 
                    alt={user.fullName} 
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="font-semibold">{user.fullName}</p>
                    <p className="text-gray-500">@{user.fullName.split(" ").join("_").toLowerCase()}</p>
                  </div>
                </div>
              ))
            ) : searchQuery.trim() ? (
              <p className="p-3 text-gray-500">No users found</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPart;