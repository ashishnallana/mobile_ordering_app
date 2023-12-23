const express = require("express");
const Mobile = require("../models/Mobile");
const jwt = require("jsonwebtoken");

const router = express.Router();

// search
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q.toLowerCase();
    const filters = req.query.filters;

    const filterObject = {
      name: { $regex: q, $options: "i" },
    };

    const parsedFilters = filters.split(",");
    let priceFilter = 1;

    if (parsedFilters[0] && parsedFilters[0] !== "none") {
      if (parsedFilters[0] === "LOW to HIGH") {
        priceFilter = 1;
      } else if (parsedFilters[0] === "HIGH to LOW") {
        priceFilter = -1;
      }
    }
    if (parsedFilters[1] && parsedFilters[1] !== "none") {
      filterObject.mobileType = { $regex: parsedFilters[1], $options: "i" };
    }
    if (parsedFilters[2] && parsedFilters[2] !== "none") {
      filterObject.processor = {
        $regex: parsedFilters[2],
        $options: "i",
      };
    }
    if (parsedFilters[3] && parsedFilters[3] !== "none") {
      filterObject.memory = { $regex: parsedFilters[3], $options: "i" };
    }
    if (parsedFilters[4] && parsedFilters[4] !== "none") {
      filterObject.os = { $regex: parsedFilters[4], $options: "i" };
    }

    const mobiles = await Mobile.find(filterObject).sort({
      price: priceFilter,
    });
    res.json({ mobiles });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to search mobiles!" });
  }
});

// open mobile page
router.get("/fetchMobile", async (req, res) => {
  try {
    const id = req.query.id.toLowerCase();
    const mobile = await Mobile.find({
      _id: id,
    });
    res.json({ mobile });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to fetch mobile." });
  }
});

// adding new mobiles
router.post("/addMobile", async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      mobileType,
      processor,
      memory,
      os,
      description,
      coverImg,
      images,
    } = req.body;

    const newMobile = new Mobile({
      name,
      brand,
      price,
      mobileType,
      processor,
      memory,
      os,
      description,
      coverImg,
      images,
    });

    const addedMobile = await newMobile.save();

    res.status(201).json({ mobile: addedMobile });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to add mobile!" });
  }
});

module.exports = router;
