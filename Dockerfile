# Use the official Node.js 23 image
FROM node:23.7.0

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Expose the port your server runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
