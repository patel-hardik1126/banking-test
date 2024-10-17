# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the desired port (adjust according to your app)
EXPOSE ${EXPRESS_APPLICATION_PORT}

CMD ["npm", "run", "db_init"]