import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 0,
};

// Validation Schema
const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  bio: Yup.string()
    .max(160, 'Bio must be 160 characters or less'),
  location: Yup.string()
    .max(30, 'Location must be 30 characters or less')
});

const ProfileModal = ({ open, handleClose, userData }) => {
  const initialValues = {
    name: userData?.name || '',
    bio: userData?.bio || '',
    location: userData?.location || '',
    coverImage: userData?.coverImage || '',
    profileImage: userData?.profileImage || '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Form values:', values);
      // Add your API call here to update profile
      handleClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setSubmitting(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-profile-modal"
    >
      <Box sx={style}>
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => (
            <Form>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-8">
                  <CloseIcon 
                    className="cursor-pointer"
                    onClick={handleClose}
                  />
                  <h2 className="text-xl font-bold">Edit Profile</h2>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 bg-black text-white rounded-full font-semibold hover:bg-gray-800 disabled:opacity-50"
                >
                  Save
                </button>
              </div>

              {/* Form Content */}
              <div className="p-4">
                {/* Cover Image */}
                <div className="mb-6">
                  <div className="h-48 bg-gray-200 rounded-lg relative">
                    {initialValues.coverImage && (
                      <img
                        src={initialValues.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFieldValue('coverImage', URL.createObjectURL(file));
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Profile Image */}
                <div className="mb-6 relative">
                  <div className="absolute -top-16 left-4">
                    <div className="w-32 h-32 rounded-full bg-gray-300 relative">
                      {initialValues.profileImage && (
                        <img
                          src={initialValues.profileImage}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFieldValue('profileImage', URL.createObjectURL(file));
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 mt-16">
                  {/* Name */}
                  <div>
                    <Field
                      name="name"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-10"
                      placeholder="Name"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <Field
                      as="textarea"
                      name="bio"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Bio"
                      rows="3"
                    />
                    {errors.bio && touched.bio && (
                      <div className="text-red-500 text-sm mt-1">{errors.bio}</div>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <Field
                      name="location"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Location"
                    />
                    {errors.location && touched.location && (
                      <div className="text-red-500 text-sm mt-1">{errors.location}</div>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ProfileModal;