#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting Vercel build for BookGPT...");

try {
  // Install dependencies
  console.log("📦 Installing dependencies...");
  execSync("npm ci --only=production", { stdio: "inherit" });

  // Build the frontend
  console.log("🔨 Building frontend...");
  execSync("npm run build", { stdio: "inherit" });

  // Ensure dist directory exists
  if (!fs.existsSync("dist")) {
    console.error("❌ Build failed: dist directory not found");
    process.exit(1);
  }

  // Create necessary directories for Vercel
  console.log("📁 Creating necessary directories...");
  const dirs = ["uploads", "temp_images"];
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  console.log("✅ Vercel build completed successfully!");
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
