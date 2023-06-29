const express = require('express');
const fetchuser = require('../middleware/fetchUser')
const Bids = require('../models/Bids');

const router = express.Router();

router.post('/addnew/:id', fetchuser, async (req, res) => {
    const eventId = req.params.id;
    const {letter, amount} = req.body;
    try {
        const newBid = new Bids({
            event: eventId, letter, amount
        })
        const savedBid = await newBid.save();

        res.status(200).send(savedBid);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

module.exports = router;