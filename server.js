const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chat");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);
app.get("/", (req, res) => res.send("✅ AI Agent Backend is Live and Working!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
