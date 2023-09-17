import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Props  {
    user: any,
    setData: React.Dispatch<React.SetStateAction<any>>
}

const Navbar = (props: Props) => {

    const url = "http://localhost:5000/event/search";

    const [search, setSearch] = useState({location:'',services:''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
      }

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth_token':localStorage.getItem("token") as string
            },
            body: JSON.stringify(search)
          });
          const res = await response.json();
          props.setData(res);
          console.log(res);
    }

    return (
        <nav className='flex items-center justify-between px-8'>
            <div className='p-4 flex items-center gap-4'>
                <Link href="/">
                    <Image
                        className='rounded-[50%]'
                        src="https://pbs.twimg.com/profile_images/1695081994533617664/oddAIsau_400x400.jpg"
                        width={80}
                        height={80}
                        alt="Picture of the author"
                    />
                </Link>
                <p className='text-[24px] font-semibold'>GatherWise...</p>
                <p>Welcome🙏, {props.user?.name.toUpperCase()} ({props.user?.userType})</p>
            </div>
            <div className='flex gap-3'>
                <div>
                    <input className="bg-gray-200 rounded-lg outline-none px-8 py-2" name='location' onChange={handleChange} value={search.location} type='search' placeholder='Enter City to Find Events...' />
                </div>
                <div>
                    <input className="bg-gray-200 rounded-lg outline-none px-8 py-2" name='services' onChange={handleChange} value={search.services} type='search' placeholder='Enter Services' />
                </div>
                <div>
                    <button onClick={handleClick} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar