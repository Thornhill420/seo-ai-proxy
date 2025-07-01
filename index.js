const express = require("express");
const cors = require("cors");
require("dotenv").config();

// In Node 18+ (Render uses Node 22), fetch is globally available
// So you DO NOT need: const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

app.post("/generate", async (req, res) => {
  const { prompt, model } = req.body;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // <-- Template literal with backticks
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model || "deepseek/deepseek-chat-v3-0324:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "API request failed", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`); // <-- backticks and string
});
