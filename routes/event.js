const express = require('express');
const router = express.Router();
const Events = require('../models/Events');
const fetchUser = require('../middleware/fetchUser')

router.get('/list/:user',fetchUser, async (req, res)=>{
    const {user} = req.params;
    try {
        if(user === "Organizer"){
            const events = await Events.find({organizer:req.user.id});
            if(events.length == 0){
                return res.send("No Events to Display")
            }
            res.json(events);
        }
        else{
            const events = await Events.find();
            if(events.length == 0){
                return res.send("No Events to Display")
            }
            res.json(events);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
})

router.post('/search',fetchUser, async (req, res)=>{
    const {location, services} = req.body;
    try {
        const query = {};
        if(location){
            query.location = location.toLowerCase();
        }
        if(services){
            query.services = services.toLowerCase();
        }
        const events = await Events.find(query);
        if(events.length == 0){
            return res.send("No Events to Display")
        }
        res.json(events);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
})

router.post('/create', fetchUser, async (req, res) => {

    const {title, description, startDate, endDate, services, location} = req.body;
    const reqServices = services.map(str => str.toLowerCase());
    try {
        const events = new Events({
            title, description, startDate, endDate, services:reqServices, location:location.toLowerCase(), organizer:req.user.id 
        })
        const savedEvent = await events.save();
        res.status(200).send(savedEvent);
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
})

module.exports = router;