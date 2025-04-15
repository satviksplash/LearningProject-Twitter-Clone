import React, { useState } from 'react';
import { Button, Typography, Dialog } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Authentication = () => {
  // Modal states
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  
  // Modal handlers
  const handleSignInOpen = () => setOpenSignIn(true);
  const handleSignInClose = () => setOpenSignIn(false);
  const handleCreateAccountOpen = () => setOpenCreateAccount(true);
  const handleCreateAccountClose = () => setOpenCreateAccount(false);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center max-w-md px-6">
        <div className="mb-10 flex justify-center">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-500">
            <g>
              <path fill="#1DA1F2" d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        
        <Typography variant="h3" className="font-bold text-5xl mb-6">
          Happening now
        </Typography>
        
        <Typography variant="h5" className="font-bold text-3xl mb-8">
          Join Twitter today.
        </Typography>

        <div className="flex flex-col items-center">            
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleCreateAccountOpen}
            className="py-2 rounded-full bg-blue-500 hover:bg-blue-600 normal-case mb-4"
            sx={{ 
              borderRadius: '9999px', 
              textTransform: 'none',
              py: 1.5,
              mb: 2,
              backgroundColor: '#1DA1F2',
              '&:hover': {
                backgroundColor: '#1a91da'
              }
            }}
          >
            Create account
          </Button>
          
          <Typography variant="caption" className="text-gray-500 text-xs mb-8 block">
            By signing up, you agree to the Terms of Service and
            Privacy Policy, including Cookie Use.
          </Typography>
          
          <Typography className="font-bold mt-10 mb-4">
            Already have an account?
          </Typography>
          
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={handleSignInOpen}
            className="py-2 rounded-full text-blue-500 border-blue-500 hover:bg-blue-50 normal-case"
            sx={{ 
              borderRadius: '9999px', 
              textTransform: 'none',
              py: 1.5,
              color: '#1DA1F2',
              borderColor: '#1DA1F2',
              '&:hover': {
                backgroundColor: 'rgba(29, 161, 242, 0.1)',
                borderColor: '#1DA1F2'
              }
            }}
          >
            Sign in
          </Button>
        </div>
      </div>

      {/* Sign In Dialog */}
      <Dialog 
        open={openSignIn} 
        onClose={handleSignInClose}
        maxWidth="sm"
        fullWidth
      >
        <LoginForm 
          onClose={handleSignInClose}
          onSwitchToSignup={() => {
            handleSignInClose();
            handleCreateAccountOpen();
          }}
        />
      </Dialog>

      {/* Create Account Dialog */}
      <Dialog 
        open={openCreateAccount} 
        onClose={handleCreateAccountClose}
        maxWidth="sm"
        fullWidth
      >
        <SignupForm onClose={handleCreateAccountClose} />
      </Dialog>
    </div>
  );
};

export default Authentication;