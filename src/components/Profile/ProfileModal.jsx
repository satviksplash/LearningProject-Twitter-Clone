import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDispatch } from 'react-redux';
import uploadToCloudnary from '../../Utils/uploadToCloudnary';
import { updateUserProfile } from '../../Store/Auth/Action';

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
  console.log("userData in profile modal",userData);
  const [coverPreview, setCoverPreview] = useState(userData?.coverImage || '');
  const [profilePreview, setProfilePreview] = useState(userData?.profileImage || '');
  const dispatch = useDispatch();
  const initialValues = {
    name: userData?.fullName || '',
    bio: userData?.bio || '',
    location: userData?.location || '',
    coverImage: userData?.coverImage || '',
    profileImage: userData?.profileImage || '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Form values:', values);
      // Add your API call here to update profile
      if(values.coverImage){
        values.coverImage = await uploadToCloudnary(values.coverImage);
      }
      if(values.profileImage){
        values.profileImage = await uploadToCloudnary(values.profileImage);
      }
      dispatch(updateUserProfile(values));

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
                    {coverPreview && (
                      <img
                        src={coverPreview}
                        alt="Cover"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <label className="cursor-pointer bg-black/50 p-2 rounded-full hover:bg-black/70 transition">
                        <AddPhotoAlternateIcon className="text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              setCoverPreview(imageUrl);
                              setFieldValue('coverImage', file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Profile Image */}
                <div className="mb-6 relative">
                  <div className="absolute -top-16 left-4">
                    <div className="w-32 h-32 rounded-full bg-gray-300 relative overflow-hidden">
                      {profilePreview && (
                        <img
                          src={profilePreview}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition">
                        <label className="cursor-pointer">
                          <AddPhotoAlternateIcon className="text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                setProfilePreview(imageUrl);
                                setFieldValue('profileImage', file);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
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