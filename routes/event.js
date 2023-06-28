const express = require('express');
const router = express.Router();
const Events = require('../models/Events');
const fetchUser = require('../middleware/fetchUser')

router.get('/list',fetchUser, async (req, res)=>{
    try {
        const events = await Events.find({organizer:req.user.id});
        if(events.length == 0){
            return res.send("No Events to Display")
        }
        res.json(events);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
})

router.get('/search',fetchUser, async (req, res)=>{
    try {
        const events = await Events.find({location:req.body.location.toLowerCase()});
        if(events.length == 0){
            console.log("empty");
            return res.send("No Events to Display")
        }
        res.json(events);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
})

router.post('/create', fetchUser, async (req, res) => {

    const {title, description, startDate, endDate, location} = req.body;
    try {
        const events = new Events({
            title, description, startDate, endDate, location:location.toLowerCase(), organizer:req.user.id 
        })
        const savedEvent = await events.save();
        res.send(savedEvent);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

module.exports = router;