const express = require('express');
const fetchuser = require('../middleware/fetchUser')
const Bids = require('../models/Bids');
const Events = require('../models/Events');
const User = require('../models/User');

const router = express.Router();

router.post('/addnew/:id', fetchuser, async (req, res) => {
    const eventId = req.params.id;
    const { letter, amount, service, phone, email } = req.body;
    const bidder = req.user.id;
    const event = await Events.findOne({ _id: eventId }, { organizer: 1, services: 1 })

    if (bidder === event.organizer.toString()) {
        return res.status(400).json({ success: false, msg: "Organizers can't bid!" })
    }

    const uniqueBid = await Bids.findOne({ bidder: bidder, event: eventId });

    if (uniqueBid) {
        return res.status(400).json({ success: false, msg: "You have already submiited the Bid!" })
    }

    if (!event.services.includes(service)) {
        return res.status(400).json({ success: false, msg: "Invalid Service" })
    }

    const bidderName = await User.findOne({ _id: bidder }, { name: 1 })
    try {
        const newBid = new Bids({
            bidder: req.user.id, event: eventId, bidderName: bidderName.name, service, letter, amount, phone, email
        })
        const savedBid = await newBid.save();

        res.status(200).json({ success: true, bid: savedBid });
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.post('/list/:id', fetchuser, async (req, res) => {
    const eventId = req.params.id;
    try {
        const uniqueBids = await Bids.find({ event: eventId });
        return res.status(200).json(uniqueBids);
    } catch (error) {
        return res.status(500).send(error);
    }
})

module.exports = router;