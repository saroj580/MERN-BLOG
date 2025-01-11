import { TextInput, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../redux/user/userSlice'
import { useRef } from 'react'
import { Cloudinary } from '@cloudinary/url-gen';

export default function DashProfile() {
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const fetchUserData = async () => {
    try {
      console.log('Fetching user data for ID:', currentUser._id); // Log the user ID
      const response = await fetch(`http://localhost:8000/api/user/${currentUser._id}`, {
        credentials: 'include'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const updateUserData = async () => {
      const updatedUser = await fetchUserData();
      if (updatedUser) {
        dispatch(updateUser(updatedUser)); // Update the current user state in Redux store
      }
    };
    updateUserData();
  }, [currentUser._id, dispatch]); // Fetch user data when currentUser changes

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const cld = new Cloudinary({ cloud: { cloudName: 'digyyblto' } });
  const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          if (file.size > 2 * 1024 * 1024) { // 2MB limit
              setError('File size must be less than 2MB');
              return;
          }
          setImageFile(file);
          setImageFileUrl(URL.createObjectURL(file));
          uploadImage(); // Upload the image immediately after selection
      }
  };
  console.log(imageFile, imageFileUrl);
  useEffect(() => {
      if (imageFile) {
          uploadImage();
      }
  }, [imageFile]);
  const uploadImage = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
        credentials: 'include', 
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Uploaded file URL:", data.fileUrl);
        setImageFileUrl(data.fileUrl); // Update the image URL
        await updateUserProfile(data.fileUrl);
      } else {
        console.error("Failed to upload image");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const updateUserProfile = async (fileUrl) => {
    try {
      const response = await fetch('http://localhost:8000/api/user/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userId: currentUser._id,
          profilePicture: fileUrl,
        }),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };
    
  const [formData, setFormData] = useState({
      username: currentUser.username,
      email: currentUser.email,
      password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);

      // Validate username
      const usernamePattern = /^[a-zA-Z0-9]+$/;
      if (!usernamePattern.test(formData.username)) {
          setError('Username can only contain letters and numbers');
          return;
      }
      if (formData.username.length < 7 || formData.username.length > 20) {
          setError('Username must be between 7 to 20 characters');
          return;
      }

      try {
          const requestBody = {
              username: formData.username,
              email: formData.email,
              password: formData.password,
              profilePicture: imageFileUrl || currentUser.profilePicture
          };
          console.log('Request Body:', requestBody); // Log the request body
          console.log('Cookies:', document.cookie); // Log the cookies to check for access_token
          console.log('Username:', formData.username); // Log the username
          const response = await fetch(`http://localhost:8000/api/user/update/${currentUser._id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(requestBody),
          });

          const responseText = await response.text();
          let data;
          try {
              data = JSON.parse(responseText);
          } catch (err) {
              console.error('Failed to parse response:', responseText);
              setError('An unexpected error occurred. Please try again.');
              return;
          }

          if (response.ok) {
              const updatedUser = await fetchUserData(); // Fetch updated user data
              setSuccess('Profile updated successfully');
              dispatch(updateUser(updatedUser)); // Update the current user state in Redux store
          } else {
              setError(data.message || 'Failed to update profile');
          }
      } catch (err) {
          setError('Error updating profile');
      }
  };

  return (
      <div className='max-w-lg mx-auto w-full p-3'>
          <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
              <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
                  <img src={imageFileUrl || currentUser.profilePicture} alt="user" className='rounded-full w-full h-full border-4 border-[lightgray] object-cover'/>
              </div>
              <TextInput 
                  type='text' 
                  id='username' 
                  placeholder='username' 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
              <TextInput 
                  type='email' 
                  id='email' 
                  placeholder='email' 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <TextInput 
                  type='password' 
                  id='password' 
                  placeholder='password' 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
              {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
              {success && <p className='text-green-500 text-center mt-3'>{success}</p>}
          </form>
          {error && <p className='text-red-500 text-center mt-3'>{error}</p>}
          {success && <p className='text-green-500 text-center mt-3'>{success}</p>}
          <div className='text-red-500 flex justify-between mt-5'>
              <span className='cursor-pointer'>Delete Account</span>
              <span className='cursor-pointer'>Sign Out</span>
          </div>
      </div>
  )
}
