# Dockerfile for Next.js frontend
FROM node:20

WORKDIR /app

# Install Python and other build dependencies
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
RUN apt-get update && \
    apt-get install -yq apt-transport-https gcc curl g++ nodejs build-essential vim nano

# Install dependencies
COPY package.json .
RUN yarn install --frozen-lockfile
RUN yarn add nodemon --dev

# Copy project files
COPY . .

# Expose port and start server
EXPOSE ${FRONTEND_APPLICATION_PORT}

ENV CHOKIDAR_USEPOLLING=true
