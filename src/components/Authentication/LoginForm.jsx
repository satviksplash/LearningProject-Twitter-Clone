import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DialogTitle, DialogContent, TextField, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Store/Auth/Action';

// Validation schema
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required('email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

const LoginForm = ({ onClose, onSwitchToSignup }) => {

    const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Sign In Form Data:", values);
    dispatch(loginUser(values));
    setSubmitting(false);
  };

  return (
    <>
      <DialogTitle>
        <div className="flex justify-between items-center">
          <IconButton 
            edge="start" 
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-500 mx-auto">
            <g>
              <path fill="#1DA1F2" d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
          <div className="w-10"></div> {/* Empty div for centering */}
        </div>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5" className="font-bold text-center mb-6">
          Sign in to Twitter
        </Typography>
        
        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-6">
                <Field
                  as={TextField}
                  name="email"
                  label="Email" 
                  variant="outlined" 
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </div>
              
              <div className="mb-6">
                <Field
                  as={TextField}
                  name="password"
                  label="Password" 
                  type="password" 
                  variant="outlined" 
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>
              
              <Button 
                type="submit"
                variant="contained" 
                fullWidth 
                disabled={isSubmitting}
                className="py-2 rounded-full bg-black hover:bg-gray-900 normal-case mt-4 mb-4"
                sx={{ 
                  borderRadius: '9999px', 
                  textTransform: 'none',
                  py: 1.5,
                  backgroundColor: 'black',
                  '&:hover': {
                    backgroundColor: '#333'
                  }
                }}
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
        
        <Button 
          variant="text" 
          fullWidth 
          className="normal-case text-blue-500"
          sx={{ 
            textTransform: 'none',
            color: '#1DA1F2'
          }}
        >
          Forgot password?
        </Button>
        
        <Typography className="mt-6 text-center text-gray-600">
          Don't have an account? 
          <Button 
            onClick={onSwitchToSignup}
            sx={{ 
              textTransform: 'none',
              color: '#1DA1F2'
            }}
          >
            Sign up
          </Button>
        </Typography>
      </DialogContent>
    </>
  );
};

export default LoginForm;