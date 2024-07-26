const express = require('express');
const { sendError, sendResponse } = require('../responseHandler');
const router = express.Router();
const Customer = require('../models/Customer');

router.post('/create', async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return sendError({ res, error: 'Customer already exists', code: 409 });
    }

    const newCustomer = new Customer({
      phone,
      name,
      address,
    });

    await newCustomer.save();

    res.status(201).json({ message: 'Customer created successfully' });
  } catch (error) {
    console.error('Error during creation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const customerList = await Customer.find({})
      .sort({ updatedAt: -1 })
      .limit(10);
    sendResponse(res, customerList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'could not get all customers' });
  }
});

router.get('/:phone', async (req, res) => {
  try {
    const customer = await Customer.findOne({ phone: req.params.phone });
    sendResponse(res, customer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'could not get customer details' });
  }
});

module.exports = router;
