import express from "express";
import axios from "axios";

const router = express.Router();

// Place Glam Booster order
router.post("/place-order", async (req, res) => {
  const { service, link, quantity } = req.body;

  if (!service || !link || !quantity) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const postData = {
      key: process.env.GLAM_API_KEY,
      action: "add",
      service,
      link,
      quantity,
    };

    const response = await axios.post("https://exosupplier.com/api/v2", postData);
    res.json(response.data);
  } catch (error) {
    console.error("Glam Booster Order Error:", error.message);
    res.status(500).json({ message: "Failed to place Glam Booster order." });
  }
});

export default router;
