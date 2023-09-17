const express = require('express');
const fetchuser = require('../middleware/fetchUser')
const Bids = require('../models/Bids');

const router = express.Router();

router.post('/addnew/:id', fetchuser, async (req, res) => {
    const eventId = req.params.id;
    const {letter, amount} = req.body;
    const bidder = req.user.id;
    const uniqueBid = await Bids.findOne({bidder:bidder, event:eventId});
    if(uniqueBid){
        return res.status(400).json({success:false,msg:"You have already submiited the Bid!"})
    }
    try {
        const newBid = new Bids({
            bidder:req.user.id, event: eventId, letter, amount
        })
        const savedBid = await newBid.save();

        res.status(200).json({success:true, bid:savedBid});
    } catch (error) {
        return res.status(500).send(error);
    }
})

module.exports = router;