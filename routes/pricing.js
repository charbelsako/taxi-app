const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middleware/verifyJWT");
const Pricing = require("../models/Pricing");
const { sendResponse, sendError } = require("../responseHandler");

router.post("/add", verifyJWT, async (req, res) => {
  try {
    let { from, to, price } = req.body;
    from = from.toLowerCase();
    to = to.toLowerCase();
    const existingPrice = await Pricing.findOne({ from, to });
    if (existingPrice) {
      existingPrice.price = price;
      await existingPrice.save();
      return sendResponse(res, { isUpdated: true });
    }
    const newPrice = new Pricing({ from, to, price });
    await newPrice.save();

    sendResponse(res, { message: "Successfully added price" });
  } catch (error) {
    console.error("Error when adding price:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/rename-location-name", verifyJWT, async (req, res) => {
  try {
    const { originalName, updatedName } = req.body;
    await Pricing.updateMany({ from: originalName }, { from: updatedName });
    await Pricing.updateMany({ to: originalName }, { to: updatedName });
    sendResponse(res, {
      message: "Successfully updated location name (everywhere)",
    });
  } catch (error) {
    console.error("Error when renaming locations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/search", verifyJWT, async (req, res) => {
  try {
    const { from, to } = req.query;
    const price = await Pricing.findOne({
      from,
      to,
      $or: [{ isDeleted: { $exists: false } }, { isDeleted: false }],
    });
    if (!price) {
      return sendError({ res, error: "Could not find price", code: 404 });
    }
    sendResponse(res, price);
  } catch (error) {
    console.error("Error while fetching price", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/locations", verifyJWT, async (req, res) => {
  try {
    const toPrices = await Pricing.distinct("to");
    const fromPrices = await Pricing.distinct("from");

    const uniqueLocations = [...new Set([...toPrices, ...fromPrices])];

    sendResponse(res, uniqueLocations);
  } catch (error) {
    console.error("Error while fetching to locations", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id/delete", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    await Pricing.findByIdAndUpdate(id, { isDeleted: true });
    sendResponse(res, { message: `Successfully deleted record ${id}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/:id/update", verifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { from, to, price } = req.body;
    const updatedPrice = await Pricing.findOneAndUpdate(
      id,
      { from, to, price },
      { new: true }
    );
    sendResponse(res, updatedPrice);
  } catch (error) {
    console.error("Error while deleting record price");
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
