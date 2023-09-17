import { useRef } from "react";
import * as React from 'react';
import BasicModal from "./BModal";
import { Chip } from "@mui/material";

interface Props {
    title: string,
    desc: string,
    location: string,
    startDate: Date,
    endDate: Date,
    services: Array<string>
    id: string
}

const BCard: React.FC<Props> = (props) => {

    const startDate = new Date(props.startDate);
    const endDate = new Date(props.endDate);
    const dates = {
        sDate: `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString()}`,
        eDate: `${endDate.toLocaleDateString()} ${endDate.toLocaleTimeString()}`
    }

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleOpenModal = () => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    };

    return (
        <>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.desc}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">📌 {props.location.toUpperCase()}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">🕛 {dates.sDate}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">🕛 {dates.eDate}</p>
                <div className="my-4 gap-2 grid grid-cols-3">
                    {props.services.map((e)=>{
                        return <Chip label={e.charAt(0).toUpperCase()+e.slice(1)}/>
                    })}
                </div>
                <button onClick={handleOpenModal} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Bid Now
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
            <BasicModal event={props.id} buttonRef={buttonRef} />
        </>
    );
}
export default BCard;