'use client';

import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}

type Bid = {
    bidderName: string
    email: string
    amount: number,
    service: string,
    phone: number
}

const Bids = (props: Props) => {
    const eventId = usePathname().split('/')[2];
    const [Bids, setBids] = useState<Bid[]>([]);

    const fetchBids = async (eventId: string) => {
        const response = await fetch(`http://localhost:5000/bid/list/${eventId}`, {
            method: "POST",
            headers: {
                auth_token: localStorage.getItem('token') || ""
            }
        })
        const bids = await response.json();
        setBids(bids);
    }

    useEffect(() => {
        fetchBids(eventId);
    }, [])

    return (
        <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
            <div className="flex flex-col justify-center h-full">
                <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                    <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Bidders</h2>
                    </header>
                    <div className="p-3">
                        <div className="overflow-x-auto">
                            {(Bids.length === 0) ? <div>No Bids Exists!</div> : <table className="table-auto w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Name</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Email</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Amount</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Service</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Phone</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {Bids.map((e) => {
                                        return <tr>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src="https://pbs.twimg.com/profile_images/1695081994533617664/oddAIsau_400x400.jpg" width="40" height="40" alt="Alex Shatov" /></div>
                                                    <div className="font-medium text-gray-800 uppercase">{e.bidderName}</div>
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left">{e.email}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left font-medium text-green-500">{`$${e.amount}`}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-sm text-center uppercase">{e.service}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-sm text-center">{e.phone}</div>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Bids