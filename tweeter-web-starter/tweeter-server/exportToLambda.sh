#!/usr/bin/env bash

# Transpile
tsc

# Clean up previous
rm dist.zip
rm lambda_layer.zip

(
cd dist
zip -r ../dist.zip *
)

mkdir -p nodejs
cp -rL node_modules nodejs
zip -r lambda_layer.zip nodejs
rm -rf nodejs