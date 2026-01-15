const express = require('express');
const Ticket = require('../model/ticket');
const { publishEvent } = require('../config/rabbitmq');
const router = express.Router();

// POST / (Create ticket)
router.post('/', async (req, res) => {
    // TODO: implementation
    const { title, description, userId } = req.body;
    const ticket = new Ticket({
        title,
        description,
        userId,
        status: 'Open'
    });
    await ticket.save();

    publishEvent('ticket_notification', {
        ticketId: ticket._id,

        title: ticket.title,
        userEmail: 'user@example.com'
    })
    res.json(ticket);
});

// GET / (Get all tickets)
router.get('/', async (req, res) => {
    // TODO: implementation
    const tickets = await Ticket.find();
    res.json(tickets);
});

module.exports = router;