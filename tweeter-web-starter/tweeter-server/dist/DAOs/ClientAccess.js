"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentClient = exports.getClient = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
let client;
let betterClient;
function getClient() {
    if (!client) {
        client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" });
    }
    return client;
}
exports.getClient = getClient;
function getDocumentClient() {
    if (!betterClient) {
        betterClient = lib_dynamodb_1.DynamoDBDocumentClient.from(getClient());
    }
    return betterClient;
}
exports.getDocumentClient = getDocumentClient;
