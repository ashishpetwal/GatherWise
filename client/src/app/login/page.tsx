"use client"

import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {}

const Login = (props: Props) => {

  const router = useRouter();
  const url = "http://localhost:5000/api/login";

  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const res = await response.json();
    localStorage.setItem("token",res.secToken);
    if (localStorage.getItem("token")) {
      router.push('/home');
    }
    else {
      router.push('/login');
    }
  }

  return (
    <>
      <div className='h-screen flex justify-center items-center bg-[#b4dfe7]'>
        <div className='space-y-6'>
          <div>
            <h2 className='text-xl font-bold'>Hello, There👋</h2>
            <p>Enter your details to login...</p>
          </div>
          <TextField name='email' type="email" id="standard-basic" label="Email" value={data.email} onChange={handleChange} variant="standard" />
          <br />
          <TextField name='password' type="password" id="standard-basic" label="Password" value={data.password} onChange={handleChange} variant="standard" />
          <br />
          <Button className='bg-green-400' variant='contained' onClick={handleClick}>Login</Button>
          <p>Don't have an account? <Link href="/signup" className='text-blue-500 font-bold'>Sign up</Link></p>
        </div>
      </div>
    </>
  )
}

export default Login