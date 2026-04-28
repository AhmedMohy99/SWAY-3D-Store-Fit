#!/bin/bash

echo "🚀 SWAY 3D Virtual Fitting Room - Setup Script"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js (v18 or higher) first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Navigate to project directory
echo "📁 Setting up project directory..."
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🎉 Your SWAY 3D Fitting Room is ready!"
    echo ""
    echo "To start the development server:"
    echo "  npm run dev"
    echo ""
    echo "Then open your browser to:"
    echo "  http://localhost:3000"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    echo ""
    echo "Try:"
    echo "  1. Delete node_modules and package-lock.json"
    echo "  2. Run npm install again"
    echo ""
    exit 1
fi
