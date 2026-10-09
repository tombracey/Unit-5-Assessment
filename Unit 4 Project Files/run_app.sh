#!/bin/bash

# Database
docker compose up -d

# Backend
cd backend
npm install
npm run build
npm start &
cd ..

# Frontend
cd frontend
npm install
npm start