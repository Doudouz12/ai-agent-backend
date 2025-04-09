const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const account = process.env.AZURE_STORAGE_ACCOUNT;
const accountKey = process.env.AZURE_STORAGE_KEY;
const tableName = "AIAgentLogs";

const credential = new AzureNamedKeyCredential(account, accountKey);
const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);

const storeInteraction = async (prompt, response) => {
  const entity = {
    partitionKey: "chat",
    rowKey: Date.now().toString(),
    prompt,
    response,
    timestamp: new Date().toISOString()
  };
  await client.createEntity(entity);
};

module.exports = { storeInteraction };
