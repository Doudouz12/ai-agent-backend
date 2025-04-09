function stylizeResponse(text) {
    return {
      summary: text.split("\n")[0],
      fullText: text,
      timestamp: new Date().toISOString()
    };
  }
  
  module.exports = { stylizeResponse };
  