# Use the official Node.js image as base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the entire project
COPY . .

RUN rm -rf node_modules/

# Install all dependencies, including devDependencies
RUN npm install

# Expose the Vite development server port
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
