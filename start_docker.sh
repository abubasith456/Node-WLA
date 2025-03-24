#!/bin/bash

DOCKER_COMPOSE_FILE="docker-compose.yml"
SERVICE_NAME="backend"  # Update with your service name
PORT=5000

# Check if port is in use
if lsof -i :$PORT &> /dev/null; then
    echo "⚠️ Port $PORT is already in use. Killing the process..."
    PID=$(lsof -t -i :$PORT)
    kill -9 $PID
    echo "✅ Process $PID killed."
else
    echo "ℹ️ Port $PORT is free."
fi

# Restart Docker container
# echo "🚀 Restarting $SERVICE_NAME..."
# docker-compose -f $DOCKER_COMPOSE_FILE down
# docker-compose -f $DOCKER_COMPOSE_FILE up -d $SERVICE_NAME

# echo "✅ $SERVICE_NAME started successfully!"
