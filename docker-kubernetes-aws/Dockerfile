# Dockerfile
FROM node:alpine

# Create app directory
WORKDIR /app

# 1. COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# 2. When using COPY with more than one source file,
# the destination must be a directory and end with a / or a \
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

# Start Node server
CMD [ "npm", "start" ]