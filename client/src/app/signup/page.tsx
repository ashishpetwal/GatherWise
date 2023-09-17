"use client"

import React, { useState } from 'react'
import { Button, InputLabel, TextField, Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material'
import { useRouter } from 'next/navigation'

type Props = {}

const Signup = (props: Props) => {

  const router = useRouter();

  // const [type, setType] = useState('');
  const [data, setData] = useState({ name: "", email: "", password: "", usertype:""});

  const url = "http://localhost:5000/api/signup"

  const handleTypeChange = (e: SelectChangeEvent) => {
    setData({...data, [e.target.name]:e.target.value});
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (res.success) {
      router.push('/home');
    }
    else {
      router.push('/signup');
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
          <TextField name='name' type="text" id="standard-basic" value={data.name} onChange={handleInputChange} label="Name" variant="standard" />
          <br />
          <TextField name='email' type="email" id="standard-basic" value={data.email} onChange={handleInputChange} label="Email" variant="standard" />
          <br />
          <TextField name='password' type="password" id="standard-basic" value={data.password} onChange={handleInputChange} label="Password" variant="standard" />
          <br />
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">User Type</InputLabel>
            <Select
              name='usertype'
              labelId="simple-select-label"
              id="simple-select"
              value={data.usertype}
              label="Age"
              onChange={handleTypeChange}
            >
              <MenuItem value={"Organizer"}>Organizer</MenuItem>
              <MenuItem value={"Photographer"}>Photographer</MenuItem>
              <MenuItem value={"Caterer"}>Caterer</MenuItem>
            </Select>
          </FormControl>
          <Button className='bg-green-400' variant='contained' onClick={handleClick}>Signup</Button>
        </div>
      </div>
    </>
  )
}

export default Signup