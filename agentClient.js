const {
    AIProjectsClient
  } = require("@azure/ai-projects");
  const { DefaultAzureCredential } = require("@azure/identity");
  
  const {
    AZURE_SUBSCRIPTION_ID,
    AZURE_RESOURCE_GROUP,
    AZURE_WORKSPACE_NAME,
    AZURE_REGION,
    AZURE_AGENT_ID
  } = process.env;
  
  const endpoint = `https://${AZURE_REGION}.api.azureml.ms`;
  
  const credential = new DefaultAzureCredential();
  
  const client = new AIProjectsClient(
    endpoint,
    `subscriptions/${AZURE_SUBSCRIPTION_ID}/resourceGroups/${AZURE_RESOURCE_GROUP}/providers/Microsoft.MachineLearningServices/workspaces/${AZURE_WORKSPACE_NAME}`,
    credential
  );
  
  module.exports = {
    client,
    AZURE_AGENT_ID
  };
  