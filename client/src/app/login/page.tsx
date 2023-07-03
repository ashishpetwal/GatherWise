"use client"

import React from 'react'
import { Button, TextField } from '@mui/material'
import Link from 'next/link'

type Props = {}

const Login = (props: Props) => {

  const handleClick = () => {
    console.log("clicked")
  }

  return (
    <>
      <div className='h-screen flex justify-center items-center bg-[#b4dfe7]'>
        <div className='space-y-6'>
          <div>
            <h2 className='text-xl font-bold'>Hello, There👋</h2>
            <p>Enter your details to login...</p>
          </div>
          <TextField type="email" id="standard-basic" label="Email" variant="standard" />
          <br />
          <TextField type="password" id="standard-basic" label="Password" variant="standard" />
          <br />
          <Button className='bg-green-400' variant='contained' onClick={handleClick}>Login</Button>
          <p>Don't have an account? <Link href="/signup" className='text-blue-500 font-bold'>Sign up</Link></p>
        </div>
      </div>
    </>
  )
}

export default Login