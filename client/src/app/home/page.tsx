"use client"

import BModal from '@/components/BModal'
import BCard from '@/components/Card'
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {}

type loggedUser = {
    userType: string
}

const Home = (props: Props) => {

    const router = useRouter();

    const [data, setData] = useState<any[]>([]);
    const [loggedUser, setLoggedUser] = useState<loggedUser>();
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
        fetchEvents(token, user.userType);
    }
    const fetchEvents = async (token: string, user: string) => {
        const response = await fetch(`http://localhost:5000/event/list/${user}`, {
            method: "GET",
            headers: {
                auth_token: token
            }
        })
        const events = await response.json();
        setData(events);
    }

    useEffect(() => {
        if (token) {
            fetchUser(token || "");
        }
        else {
            router.push('login')
        }
    }, [])


    return (
        <>
            <Navbar user={loggedUser} setData={setData} />
            {/* <BModal/> */}
            <div className='flex justify-center'>
                <div className='sm:grid md:grid-cols-2 lg:grid-cols-3'>
                    {data.map((e) => {
                        return <BCard key={e._id} userType={loggedUser?.userType || ""} id={e._id} title={e.title} desc={e.description} location={e.location} startDate={e.startDate} endDate={e.endDate} services={e.services} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Home