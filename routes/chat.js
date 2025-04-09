const express = require("express");
const router = express.Router();
const { client, AZURE_AGENT_ID } = require("../agentClient");
const { stylizeResponse } = require("../utils/stylize");
const { storeInteraction } = require("../storage/tableClient");

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  try {
    const result = await client.agents.invoke(AZURE_AGENT_ID, {
      input: { messages: [{ role: "user", content: prompt }] }
    });

    const rawResponse = result.output?.messages?.[0]?.content || "No response.";
    const stylized = stylizeResponse(rawResponse);

    await storeInteraction(prompt, stylized.fullText);

    res.json({ result: stylized });
  } catch (error) {
    console.error("Agent error:", error);
    res.status(500).json({ error: "AI Agent failed", details: error.message });
  }
});

module.exports = router;
