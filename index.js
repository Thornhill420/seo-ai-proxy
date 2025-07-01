const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "https://thornhill420.github.io/seo-product-generator", // Exact frontend URL
  methods: ["POST"], // Allow only POST
  allowedHeaders: ["Content-Type"], // Allow necessary headers
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

app.post("/generate", async (req, res) => {
  const { prompt, model } = req.body;
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://thornhill420.github.io/seo-product-generator",
        "X-Title": "SEO Product Generator",
      },
      body: JSON.stringify({
        model: model || "deepseek/deepseek-chat-v3-0324:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "API request failed", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});