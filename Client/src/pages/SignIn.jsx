import {Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [formdata, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value.trim() })
    //while setting the data  we are keeping the previous data usinf '...formData' i.e spread operator
  }
  console.log(formdata);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //while sumbitting the form the page reload so we don't want that therefore we are preventing that using preventDefault() method
    if (!formdata.email || !formdata.password) {
      return setErrorMessage('please fill out all fields')
    }
    try { 
      setLoading(true);
      //if there is the error from the previous request then we are setting the error message to null i.e empty
      setErrorMessage(null);
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
        return setErrorMessage(data.message)
      }
      setLoading(false);
      if (res.ok) {
        navigate('/')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false);
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
