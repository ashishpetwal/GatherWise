import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface Props {
    buttonRef: React.RefObject<HTMLButtonElement>;
}

const AddModal: React.FC<Props> = ({ buttonRef }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [eventInfo, setEventInfo] = useState({ title: "", location: "", description: ""})

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [services, setServices] = useState<Array<string>>([]);

    const token = localStorage.getItem('token');

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/event/create`, {
            method: "POST",
            headers: {
                auth_token: token as string,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: eventInfo.title,
                location: eventInfo.location,
                description: eventInfo.description,
                services: services,
                startDate: startDate,
                endDate: endDate
            })
        });
        const bid = await response.json();
        console.log(bid);
        handleClose();
        setEventInfo({ title: "", location: "",description: "" })
    }

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newDate = new Date(e.target.value);
        let formattedDate = newDate.getFullYear() + "-" + ('0' + (newDate.getMonth() + 1)).slice(-2) + "-" + ('0' + newDate.getDate()).slice(-2);
        setStartDate(formattedDate);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newDate = new Date(e.target.value);
        let formattedDate = newDate.getFullYear() + "-" + ('0' + (newDate.getMonth() + 1)).slice(-2) + "-" + ('0' + newDate.getDate()).slice(-2);
        setEndDate(formattedDate);
    };

    const handleServicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newServices = e.target.value.split(',');
        setServices(newServices);
        console.log(services)
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        setEventInfo({ ...eventInfo, [e.target.name]: e.target.value });
    }

    return (
        <div className='hidden'>
            <Button ref={buttonRef} onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleAddEvent}>
                        <div className='space-y-4'>
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" name='title' id="title" value={eventInfo.title} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event title" required />
                            </div>

                            <div>
                                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                        </svg>
                                    </div>
                                    <input type="text" name='location' id="location" value={eventInfo.location} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Location" required />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="services" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Services</label>
                                <input type="text" name='services' id="services" value={services} onChange={handleServicesChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Use comma, to seperate multiple services" required />
                            </div>

                            <div>
                                <label htmlFor="startdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">StartDate</label>
                                <input
                                    name="startdate"
                                    id='startdate'
                                    type="date"
                                    onChange={handleStartDateChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="enddate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EndDate</label>
                                <input
                                    name="enddate"
                                    id='enddate'
                                    type="date"
                                    onChange={handleEndDateChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Description</label>
                                <textarea name='description' id="description" rows={4} value={eventInfo.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                            </div>

                            <div>
                                <input type='submit' value='Add Event' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
export default AddModal;