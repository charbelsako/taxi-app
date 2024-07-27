const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/verifyJWT');
const Pricing = require('../models/Pricing');
const { sendResponse, sendError } = require('../responseHandler');

router.post('/add', verifyJWT, async (req, res) => {
  try {
    let { from, to, price } = req.body;
    from = from.toLowerCase();
    to = to.toLowerCase();
    const existingPrice = await Pricing.findOne({ from, to });
    if (existingPrice) {
      // @NOTE: update price
      existingPrice.price == price;
      await existingPrice.save();
      return sendResponse(res, { isUpdated: true });
    }
    const newPrice = new Pricing({ from, to, price });
    await newPrice.save();

    sendResponse(res, { message: 'Successfully added price' });
  } catch (error) {
    console.error('Error when adding price:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// router.get('/:from', verifyJWT, async (req, res) => {
//   try {
//     const price = await Pricing.findOne({ from: req.params.from });
//     sendResponse(res, price);
//   } catch (error) {
//     console.error('Error while fetching price', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

router.get('/search', verifyJWT, async (req, res) => {
  try {
    const { from, to } = req.query;
    const price = await Pricing.findOne({ from, to });
    sendResponse(res, price);
  } catch (error) {
    console.error('Error while fetching price', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/from', verifyJWT, async (req, res) => {
  try {
    const fromPrices = await Pricing.find({});
    const fromList = fromPrices.map(price => price.from);
    sendResponse(res, fromList);
  } catch (error) {
    console.error('Error while fetching from locations', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/to', verifyJWT, async (req, res) => {
  try {
    const toPrices = await Pricing.find({});
    const toList = toPrices.map(price => price.to);
    sendResponse(res, toList);
  } catch (error) {
    console.error('Error while fetching to locations', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
