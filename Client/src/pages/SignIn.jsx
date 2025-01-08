import {Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice'

export default function SignIn() {
  const [formdata, setFormData] = useState({})
  const {loading, error : errorMessage} = useSelector(state => state.user) //here user is the name we have declared in userSlice.js in redux/user/userSlice.js
  //since we have declared error in the userSlice.js file and use it as errorMessage in SignIn.jsx file so we are using error as errorMessage
  const navigate = useNavigate()

  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value.trim() })
    //while setting the data  we are keeping the previous data usinf '...formData' i.e spread operator
  }
  console.log(formdata);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //while sumbitting the form the page reload so we don't want that therefore we are preventing that using preventDefault() method
    if (!formdata.email || !formdata.password) {
      return dispatch(signInFailure("Please fill all the fields"))
    }
    try { 
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        //here we are sending the data to the server
        method: 'POST',
        //here we are sending the data in json format
        headers: { 'Content-Type': 'application/json' },
        //converting the json data to string for the readable format
        body: JSON.stringify(formdata)
      })
      const data = await res.json();
      //here we are checking if the username is same then throw error message
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left side */}
        <div className='flex-1'>
          <Link to='/' className='text-4xl font-bold dark:text-white'>
             <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Saroj's</span>
             Blog
          </Link>
          <p className='text-sm mt-5'>This is the demo project you can sign in with your email and pasword</p>
        </div>
        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
            <div>
              <Label value='Your email' />
              <TextInput 
                type='email'
                placeholder='name@example.com'
                id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your password' />
              <TextInput 
                type='password'
                placeholder='********'
                id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                    </>
                ) : 'Sign In'
              } 
            </Button> 
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an Account?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
