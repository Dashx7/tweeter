import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

let client: DynamoDBClient;
let betterClient: DynamoDBDocumentClient;


function getClient(): DynamoDBClient {
    if (!client) {
        client = new DynamoDBClient({ region: "us-east-1" });
    }
    return client;
}

function getDocumentClient(): DynamoDBDocumentClient {
    if (!betterClient) {
        betterClient = DynamoDBDocumentClient.from(getClient());
    }
    return betterClient;
}

export { getClient, getDocumentClient };