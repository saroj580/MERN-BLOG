import { TextInput, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef();
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
        console.log("uploading image...");
        
        
    }
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
