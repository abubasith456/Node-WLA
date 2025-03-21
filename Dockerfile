# # Use the official Node.js 23 image
# FROM node:23.7.0

# # Set working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the entire project
# COPY . .

# # Expose the port your server runs on
# EXPOSE 5000

# # Start the application
# CMD ["npm", "start"]



# Base image
FROM node:23.7.0 as builder

# Install required packages
RUN apt-get update && apt-get install -y git

# Clone the repository
RUN if [ -d "/usr/src/app/.git" ]; then cd /usr/src/app && git pull; else git clone https://github.com/abubasith456/Node-WLA.git /usr/src/app; fi

# Set the working directory
WORKDIR /usr/src/app

# Check if the repo contains a Dockerfile
RUN if [ -f "Dockerfile" ]; then echo "Found Dockerfile in repo"; else echo "No Dockerfile found" && exit 1; fi

# Build the repo's Docker image
RUN docker build -t musfi-prod .

# Run the final image
CMD ["docker", "run", "-p", "5000:5000", "musfi-prod"]
