"use client"

import React, { useState } from 'react'
import { Button, InputLabel, TextField, Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material'
import Link from 'next/link'

type Props = {}

const Signup = (props: Props) => {

  const [type, setType] = useState('');
  
  const handleChange = (e: SelectChangeEvent) => {
    setType(e.target.value);
  }

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
          <TextField type="text" id="standard-basic" label="Name" variant="standard" />
          <br />
          <TextField type="email" id="standard-basic" label="Email" variant="standard" />
          <br />
          <TextField type="password" id="standard-basic" label="Password" variant="standard" />
          <br />
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">User Type</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={type}
              label="Age"
              onChange={handleChange}
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