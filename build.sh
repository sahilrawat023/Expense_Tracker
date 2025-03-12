#!/bin/bash
# Install dependencies
npm install
npm install --prefix backend
npm install --prefix frontend

# Build the frontend
cd frontend
npx vite build
cd ..