import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    buttonRef: React.RefObject<HTMLButtonElement>;
    event: string
}

interface Bid {
    letter: string,
    amount: number
}

const BasicModal: React.FC<Props> = ({ buttonRef, event }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [bidInfo, setBidInfo] = React.useState<Bid>({ letter: "", amount: 0 })

    const token = localStorage.getItem('token');

    const submitBid = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/bid/addnew/${event}`, {
            method: "POST",
            headers: {
                auth_token: token as string,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bidInfo)
        });
        const bid = await response.json();
        console.log(bid);
        handleClose();
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setBidInfo({ ...bidInfo, [e.target.name]: e.target.value });
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

                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Letter</label>
                    <textarea id="message" rows={4} name='letter' value={bidInfo.letter} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bid Price</label>
                        <input type='number' id="small-input" name='amount' value={bidInfo.amount} onChange={handleChange} placeholder='Enter Price in ₹₹₹...' className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div className='mt-4'><Button onClick={submitBid}>Submit</Button></div>
                </Box>
            </Modal>
        </div>
    );
}
export default BasicModal;