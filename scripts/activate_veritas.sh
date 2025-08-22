#!/bin/bash

# Start the Veritas.O system services
echo "Activating Veritas.O protocols..."

# Start bootstrap service
cd ../veritas_bootstrap
npm start &
BOOTSTRAP_PID=$!

# Wait for bootstrap to be ready
sleep 5

# Start core services
echo "Starting core services..."
cd ..
npm run start:all

trap "kill $BOOTSTRAP_PID" EXIT

echo "Veritas.O protocols activated."
