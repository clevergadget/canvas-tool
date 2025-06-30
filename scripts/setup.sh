#!/bin/bash

# Colors for pretty output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'

NC='\033[0m' # No Color

echo -e "${YELLOW}Starting Canvas Tool setup...${NC}"

# Step 1: Install dependencies
echo -e "\n${YELLOW}Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
  echo "Failed to install dependencies. Please check your npm installation."
  exit 1
fi

# Build shared-types package
echo -e "\n${YELLOW}Building shared-types package...${NC}"
npm run build:shared-types
if [ $? -ne 0 ]; then
  echo "Failed to build shared-types package. Please check the logs."
  exit 1
fi
echo -e "${GREEN}✓ Shared-types package built successfully${NC}"

echo -e "${GREEN}✓ Dependencies installed successfully${NC}"

# Step 2: Build and start Docker containers
echo -e "\n${YELLOW}Building and starting Docker containers...${NC}"
docker-compose down # Ensure clean start
docker-compose up -d --build
if [ $? -ne 0 ]; then
  echo "Failed to start Docker containers. Please check your Docker installation."
  exit 1
fi
echo -e "${GREEN}✓ Docker containers started${NC}"

# Step 3: Wait for the database to be ready
echo -e "\n${YELLOW}Waiting for database to be ready...${NC}"
max_attempts=45  # Increase max attempts to give more time
attempt=0

while [ $attempt -lt $max_attempts ]; do
  if docker exec voter-canvassing-tool-db-1 mysqladmin ping -h localhost -u root -pexample --silent 2>/dev/null; then
    echo -e "${GREEN}✓ Database is ready${NC}"
    break
  fi
  
  attempt=$((attempt+1))
  echo "Attempt $attempt/$max_attempts: Database not ready yet, waiting..."
  sleep 2
  
  # If we've reached max attempts, exit with error
  if [ $attempt -eq $max_attempts ]; then
    echo "Database did not become ready in time. Please check docker logs."
    exit 1
  fi
done

# Step 4: Seed the database
echo -e "\n${YELLOW}Seeding the database...${NC}"

# Wait additional time for MySQL to fully initialize all plugins
echo "Giving MySQL additional time to initialize plugins..."
sleep 10

docker exec voter-canvassing-tool-db-1 sh -c "mysql -u canvasser -pcanvasserpass canvassing < /docker-entrypoint-initdb.d/seed.sql"
if [ $? -ne 0 ]; then
  echo "Failed to seed the database. Please check the Docker logs."
  exit 1
fi
echo -e "${GREEN}✓ Database seeded successfully${NC}"

# Step 5: Verify services are running
echo -e "\n${YELLOW}Verifying services...${NC}"

# Check database container
if ! docker ps | grep -q "voter-canvassing-tool-db-1"; then
  echo "Database container is not running. Please check Docker logs."
  exit 1
fi

# Check backend container
if ! docker ps | grep -q "voter-canvassing-tool-backend-1"; then
  echo "Backend container is not running. Please check Docker logs."
  exit 1
fi

# Check frontend container
if ! docker ps | grep -q "voter-canvassing-tool-frontend-1"; then
  echo "Frontend container is not running. Please check Docker logs."
  exit 1
fi

echo -e "${GREEN}✓ All services verified${NC}"

# Step 6: Success message
echo -e "\n${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo -e "Frontend: http://localhost:5173"
echo -e "Backend: http://localhost:3001"
echo -e "Database: localhost:3306 (user: canvasser, password: canvasserpass)"
echo -e "\n${YELLOW}Happy canvassing!${NC}"
