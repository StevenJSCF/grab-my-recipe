# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY package.json package-lock.json* pnpm-lock.yaml* ./
COPY . .

# Install deps
RUN npm install -g pnpm && pnpm install

# Build the Next.js app
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]
