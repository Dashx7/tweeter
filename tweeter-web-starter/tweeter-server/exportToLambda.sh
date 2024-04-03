#!/usr/bin/env bash

# Transpile
cmd.exe /C tsc

# Clean up previous
rm dist.zip
rm lambda_layer.zip

(
#cd dist
zip -r dist.zip dist
)

mkdir -p nodejs
cp -rL node_modules nodejs
zip -r lambda_layer.zip nodejs
rm -rf nodejs