#!/bin/bash

# Veritas.O v7.0 Setup Script
# This script sets up the enhanced Veritas Growth Engine

echo "🌱 Setting up Veritas.O v7.0 Growth Engine..."

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p backend/src/data/growth_logs
mkdir -p frontend/public

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install

# Install frontend dependencies (if separate)
echo "📦 Installing frontend dependencies..."
cd ../frontend && npm install

# Set up environment
echo "🔧 Setting up environment..."
cd ..

# Create .env template if it doesn't exist
if [ ! -f .env ]; then
    echo "OPENAI_API_KEY=your_openai_key_here" > .env
    echo "PORT=4000" >> .env
    echo "📝 Created .env template - please add your OpenAI API key"
fi

# Create empty growth feed
echo '{"version": "1.0", "items": [], "contradictions": [], "doctrine_updates": []}' > frontend/public/growth_feed.json

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the system:"
echo "   1. Add your OpenAI API key to .env"
echo "   2. Run: cd backend && npm run dev"
echo "   3. Open: http://localhost:4000/dashboard.html"
echo ""
echo "📚 Features available:"
echo "   - Enhanced interactive dashboard"
echo "   - Growth Engine automation"
echo "   - Command palette (⌘K)"
echo "   - Agent network monitoring"
echo "   - Contradiction detection"
echo "   - Doctrine evolution tracking"
echo ""
echo "⚡ Growth Engine modes:"
echo "   - Standard: Weekly cycles (Mondays)"
echo "   - High Growth: Bi-weekly (Mon + Thu)"
echo "   - Emergency: Manual runs only"
