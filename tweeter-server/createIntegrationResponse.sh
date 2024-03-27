#!/usr/bin/env bash

endpoints=(
    'Follow'
    'GetFolloweesCount'
    'GetFollowersCount'
    'GetUser'
    'LoadMoreFeedItems'
    'LoadMoreFollowees'
    'LoadMoreFollowers'
    'LoadMoreStoryItems'
    'Login'
    'Logout'
    'PostStatus'
    'Register'
    'Unfollow'
)
rest_api_id=8vzj6lcwcc

for endpoint in "${endpoints[@]}"; do
    resource_id=$(aws apigateway get-resources --rest-api-id $rest_api_id --query "items[?path=='/service/$endpoint'].id" --output text)

    aws apigateway put-method-response \
        --rest-api-id "$rest_api_id" \
        --resource-id "$resource_id" \
        --http-method POST \
        --status-code 400 \
        --response-models '{"application/json": "Error"}'

    aws apigateway put-method-response \
        --rest-api-id "$rest_api_id" \
        --resource-id "$resource_id" \
        --http-method POST \
        --status-code 500 \
        --response-models '{"application/json": "Error"}'

    aws apigateway put-integration-response \
        --rest-api-id "$rest_api_id" \
        --resource-id "$resource_id" \
        --http-method POST \
        --status-code 400 \
        --selection-pattern "^\[Bad Request\].*"

    aws apigateway put-integration-response \
        --rest-api-id "$rest_api_id" \
        --resource-id "$resource_id" \
        --http-method POST \
        --status-code 500 \
        --selection-pattern "^\[Internal Server Error\].*"
done
