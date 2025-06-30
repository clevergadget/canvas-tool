#!/bin/bash

# Colors for pretty output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Cleaning up Canvas Tool environment...${NC}"

# Step 1: Stopping and removing Docker containers
echo -e "\n${YELLOW}Stopping and removing Docker containers...${NC}"
docker-compose down
if [ $? -ne 0 ]; then
  echo "Failed to stop Docker containers. Please check your Docker installation."
  exit 1
fi
echo -e "${GREEN}✓ Docker containers stopped and removed${NC}"

# Step 2: Success message
echo -e "\n${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ Cleanup completed successfully!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo -e "All Docker containers have been stopped and removed."
echo -e "To start the application again, run: npm run setup"
