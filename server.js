require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { client, AZURE_AGENT_ID } = require("./agentClient");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/askAgent", async (req, res) => {
  try {
    const { input_data } = req.body;

    const thread = await client.agents.createThread(AZURE_AGENT_ID);
    await client.agents.createMessage(thread.id, {
      role: "user",
      content: JSON.stringify(input_data)
    });

    let run = await client.agents.createRun(thread.id, AZURE_AGENT_ID);

    while (run.status === "queued" || run.status === "in_progress") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await client.agents.getRun(thread.id, run.id);
    }

    const messages = await client.agents.listMessages(thread.id);
    const finalMessage = messages[0]?.content || "No response";

    res.json({ result: finalMessage });
  } catch (err) {
    console.error("Agent error:", err.message);
    res.status(500).json({ error: "Agent call failed", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🧠 Agent backend running on port ${PORT}`);
});
