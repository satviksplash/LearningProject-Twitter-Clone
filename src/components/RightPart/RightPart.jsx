import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const RightPart = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Placeholder users data - replace with actual data/API call
  const users = [
    { id: 1, username: 'johndoe', name: 'John Doe', avatar: 'https://via.placeholder.com/40' },
    { id: 2, username: 'janedoe', name: 'Jane Doe', avatar: 'https://via.placeholder.com/40' },
  ];

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          />
          <SearchIcon className="absolute left-3 top-2.5 text-gray-500" />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-4 bg-white rounded-lg shadow-lg">
            {filteredUsers.map(user => (
              <div 
                key={user.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
              >
                <img 
                  src={user.avatar} 
                  alt={user.username} 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-500">@{user.username}</p>
                </div>
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <p className="p-3 text-gray-500">No users found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPart;