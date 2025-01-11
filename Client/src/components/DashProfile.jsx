import { TextInput, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef();
    const cld = new Cloudinary({ cloud: { cloudName: 'digyyblto' } });
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file))
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
    
    return (
        <div className='max-w-lg mx-auto w-full p-3'>
          <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
              <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
                  <img src={imageFileUrl || currentUser.profilePicture} alt="user" className='rounded-full w-full h-full border-4 border-[lightgray] object-cover'/>
              </div>
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
                <TextInput type='password' id='password' placeholder='password' />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}
