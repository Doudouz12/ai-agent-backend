const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/askAgent", async (req, res) => {
  const { AZURE_AI_KEY, AZURE_AI_ENDPOINT } = process.env;

  try {
    const response = await axios.post(AZURE_AI_ENDPOINT, req.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AZURE_AI_KEY}`
      }
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error("AI agent error:", err.message);
    res.status(500).json({
      error: "AI call failed",
      details: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AI Agent backend running on port ${PORT}`);
});
