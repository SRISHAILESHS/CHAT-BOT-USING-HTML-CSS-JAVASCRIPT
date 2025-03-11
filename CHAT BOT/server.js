require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow frontend requests

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            "https://chatgpt-42.p.rapidapi.com/conversationgpt4",
            {
                messages: [{ role: "user", content: userMessage }],
                system_prompt: "",
                temperature: 0.9,
                top_k: 5,
                top_p: 0.9,
                max_tokens: 256,
                web_access: false
            },
            {
                headers: {
                    "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Secure API key
                    "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching response" });
    }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
