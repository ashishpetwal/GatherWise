"use client"

import BModal from '@/components/BModal'
import BCard from '@/components/Card'
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'

type Props = {}

const Home = (props: Props) => {
    const [data, setData] = useState<any[]>([]);
    const [loggedUser, setLoggedUser] = useState<any[]>();
    const token = localStorage.getItem('token');

    const fetchUser = async (token: string) => {
        const response = await fetch("http://localhost:5000/api/fetchuser", {
            method: "GET",
            headers: {
                auth_token: token
            }
        })
        const user = await response.json();
        setLoggedUser(user);
    }
    const fetchEvents = async (token: string) => {
        const response = await fetch("http://localhost:5000/event/list", {
            method: "GET",
            headers: {
                auth_token: token
            }
        })
        const events = await response.json();
        setData(events);
    }

    useEffect(() => {
        fetchUser(token || "");
        fetchEvents(token || "");
    }, [])


    return (
        <>
            <Navbar user={loggedUser} setData={setData} />
            {/* <BModal/> */}
            <div className='flex justify-center'>
                <div className='sm:grid md:grid-cols-2 lg:grid-cols-3'>
                    {data.map((e) => {
                        return <BCard key={e._id} id={e._id} title={e.title} desc={e.description} location={e.location} startDate={e.startDate} endDate={e.endDate} services={e.services} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Home