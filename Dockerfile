# This is a root-level Dockerfile that defaults to building the backend.
# For more granular control, use backend/Dockerfile or frontend/Dockerfile.

FROM node:18-alpine

WORKDIR /app

# Copy backend dependency files
COPY backend/package*.json ./

# Install production dependencies
RUN npm install --production

# Copy backend source code
COPY backend/ .

# Copy common files if any (e.g., if you had shared utilities)
# COPY common/ ./common/

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
