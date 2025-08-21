#!/bin/bash
set -e

npx openapi-generator-cli generate \
  -i openapi-spec.json \
  -g typescript-axios \
  -o ./output

echo "Frontend client generated in swagger/output/"
