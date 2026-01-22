-- Migration: Create access_logs table
-- Run this migration against your Neon database to create the required table

CREATE TABLE IF NOT EXISTS access_logs (
  id SERIAL PRIMARY KEY,
  tz VARCHAR(100),
  idioma VARCHAR(50),
  plataforma VARCHAR(100),
  user_agent TEXT,
  referrer TEXT,
  ip VARCHAR(50),
  cidade VARCHAR(100),
  regiao VARCHAR(100),
  pais VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
