#!/bin/bash

# Update input schema in Apify console
echo "Updating input schema in Apify Console..."
apify push

# Verify the actor configuration
echo "Verifying actor configuration..."
apify info

# Test the actor with default input
echo "Testing actor with default input..."
apify run -i ./test/default-input.json
