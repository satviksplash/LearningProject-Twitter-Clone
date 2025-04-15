import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DialogTitle, DialogContent, TextField, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Store/Auth/Action';

// Validation schema
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .required('Phone or email is required')
    .test('is-email-or-phone', 'Enter a valid email or phone number', function(value) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const phoneRegex = /^\d{10,15}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  month: Yup.string()
    .required('Month is required'),
password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[^\w]/, 'Password must contain at least one special character')
    .required('Password is required'),
  day: Yup.string()
    .required('Day is required'),
  year: Yup.string()
    .required('Year is required')
    .test('is-valid-age', 'You must be at least 13 years old', function(value) {
      const currentYear = new Date().getFullYear();
      return currentYear - parseInt(value) >= 13;
    })
});

const SignupForm = ({ onClose }) => {
    const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    month: '',
    day: '',
    year: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const createdAt = `${values.month} ${values.day}, ${values.year}`;
    const formattedValues = {...values, createdAt };

    delete formattedValues.month;
    delete formattedValues.day;
    delete formattedValues.year;

    formattedValues.fullName = formattedValues.name;
    delete formattedValues.name;

    dispatch(registerUser(formattedValues));
    console.log("Create Account Form Data:", formattedValues);
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
          Create your account
        </Typography>
        
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-4">
                <Field
                  as={TextField}
                  name="name"
                  label="Name" 
                  variant="outlined" 
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </div>
              
              <div className="mb-4">
                <Field
                  as={TextField}
                  name="email"
                  label="Phone or email" 
                  variant="outlined" 
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </div>

              {/* Add password field before date of birth */}
              <div className="mb-4">
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password" 
                  variant="outlined" 
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>
              
              <Typography variant="subtitle2" className="font-bold mb-2">
                Date of birth
              </Typography>
              <Typography variant="caption" className="block text-gray-500 mb-4">
                This won't be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.
              </Typography>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Field
                  as={TextField}
                  name="month"
                  label="Month"
                  select
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                  error={touched.month && Boolean(errors.month)}
                  helperText={touched.month && errors.month}
                >
                  <option value=""></option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </Field>
                
                <Field
                  as={TextField}
                  name="day"
                  label="Day"
                  select
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                  error={touched.day && Boolean(errors.day)}
                  helperText={touched.day && errors.day}
                >
                  <option value=""></option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </Field>
                
                <Field
                  as={TextField}
                  name="year"
                  label="Year"
                  select
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                  error={touched.year && Boolean(errors.year)}
                  helperText={touched.year && errors.year}
                >
                  <option value=""></option>
                  {[...Array(100)].map((_, i) => {
                    const year = 2025 - i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </Field>
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
                Next
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
};

export default SignupForm;