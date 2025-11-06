# 🤖 AI Features Documentation

This document provides a comprehensive overview of all AI features integrated into the e-commerce platform. The AI chatbot is powered by **Google Gemini 1.5 Pro**, while other AI features use OpenAI's GPT-3.5-turbo model.

## 📋 Table of Contents

1. [Overview](#overview)
2. [AI Features](#ai-features)
3. [File Locations](#file-locations)
4. [API Endpoints](#api-endpoints)
5. [Frontend Components](#frontend-components)
6. [Configuration](#configuration)
7. [Usage Examples](#usage-examples)

---

## 🎯 Overview

The e-commerce platform includes **5 major AI features** that enhance the shopping experience:

1. **AI Chatbot** - Customer support assistant
2. **AI Product Recommendations** - Personalized product suggestions
3. **AI Semantic Search** - Enhanced product search
4. **AI Description Generator** - Auto-generate product descriptions (Admin)
5. **AI Sentiment Analysis** - Analyze review sentiments

All AI features have fallback mechanisms that work even without API keys, ensuring the platform remains functional. The chatbot uses **Google Gemini 1.5 Pro** for high-quality responses, while other features use OpenAI GPT-3.5-turbo.

---

## ✨ AI Features

### 1. AI Chatbot (Customer Support) - Powered by Gemini 1.5 Pro

**Purpose**: Provides 24/7 customer support through an AI-powered chatbot.

**AI Model**: Google Gemini 1.5 Pro

**Location**: 
- **Backend Service**: `server/services/aiService.js` - `chatSupport()` function
- **Backend Route**: `server/routes/ai.js` - `/api/ai/chat` endpoint
- **Frontend Component**: `client/src/components/ai/AIChatBot.js`
- **Integration**: `client/src/App.js` (rendered globally)

**Features**:
- Handles product inquiries
- Order tracking assistance
- Shipping information
- Returns and refunds
- General shopping questions
- Technical support

**How it works**:
- Uses **Google Gemini 1.5 Pro** with optimized system instructions for e-commerce support
- Maintains conversation history for context-aware responses
- Provides high-quality, accurate responses with advanced natural language understanding
- Handles multi-turn conversations with excellent context retention
- Provides fallback responses when API key is not configured

**Why Gemini 1.5 Pro?**
- Superior understanding of complex customer queries
- Better context retention across long conversations
- More natural and helpful responses
- Advanced reasoning capabilities for troubleshooting

---

### 2. AI Product Recommendations

**Purpose**: Provides personalized product recommendations based on user behavior, interests, and browsing history.

**Location**:
- **Backend Service**: `server/services/aiService.js` - `getProductRecommendations()` function
- **Backend Route**: `server/routes/ai.js` - `/api/ai/recommendations` endpoint
- **Backend Route (Alternative)**: `server/routes/products.js` - `/api/products/recommendations` endpoint
- **Frontend Component**: `client/src/components/ai/AIRecommendations.js`
- **Integration**: 
  - `client/src/pages/HomePage.js` (line 219)
  - `client/src/pages/ProductDetailPage.js` (line 382-388)

**Features**:
- Considers user interests
- Analyzes viewed products
- Considers cart items for complementary products
- Personalized recommendations when user is logged in
- Fallback to category-based recommendations

**How it works**:
- Collects user data (interests, viewed products, cart items)
- Sends product summary to AI with user context
- AI returns most relevant product IDs
- Products are sorted by AI's relevance order

---

### 3. AI Semantic Search

**Purpose**: Enhanced product search that understands user intent, not just keywords.

**Location**:
- **Backend Service**: `server/services/aiService.js` - `semanticSearch()` function
- **Backend Route**: `server/routes/ai.js` - `/api/ai/search` endpoint

**Features**:
- Understands natural language queries
- Finds products based on meaning, not just exact matches
- Ranks results by relevance
- Falls back to text search if AI is unavailable

**How it works**:
- Takes user's search query
- Analyzes all products using AI
- Returns product IDs ranked by relevance
- Combines with fallback text search for comprehensive results

**Note**: Currently implemented in backend but can be integrated into the frontend search functionality.

---

### 4. AI Description Generator

**Purpose**: Automatically generates professional, SEO-friendly product descriptions for admin users.

**Location**:
- **Backend Service**: `server/services/aiService.js` - `generateProductDescription()` function
- **Backend Route**: `server/routes/ai.js` - `/api/ai/generate-description` endpoint (Admin only)
- **Frontend Integration**: `client/src/pages/admin/AdminProductForm.js` (line 125-155, 252-260)

**Features**:
- Generates 150-250 word descriptions
- SEO-optimized content
- Highlights key features and benefits
- Professional tone
- Accessible only to admin users

**How it works**:
1. Admin fills in product name, category, price, and features
2. Clicks "Generate with AI" button
3. AI generates a compelling product description
4. Description is automatically filled into the form

---

### 5. AI Sentiment Analysis

**Purpose**: Analyzes product review sentiments to understand customer satisfaction.

**Location**:
- **Backend Service**: `server/services/aiService.js` - `analyzeReviewSentiment()` function
- **Backend Route**: `server/routes/ai.js` - `/api/ai/analyze-sentiment` endpoint

**Features**:
- Classifies reviews as positive, negative, or neutral
- Provides confidence scores
- Fallback to keyword-based analysis

**How it works**:
- Analyzes review text using AI
- Returns sentiment classification and confidence score
- Can be used for review moderation and analytics

**Note**: Currently implemented in backend but can be integrated into review system for automatic moderation.

---

## 📁 File Locations

### Backend Files

```
server/
├── services/
│   └── aiService.js          # All AI service functions
│
├── routes/
│   └── ai.js                  # AI API routes
│
└── index.js                   # Registers AI routes (line 50)
```

### Frontend Files

```
client/src/
├── components/
│   └── ai/
│       ├── AIChatBot.js       # Chatbot component
│       └── AIRecommendations.js # Recommendations component
│
├── pages/
│   ├── HomePage.js            # Uses AIRecommendations (line 219)
│   ├── ProductDetailPage.js   # Uses AIRecommendations (line 382-388)
│   └── admin/
│       └── AdminProductForm.js # AI description generator (line 125-155)
│
└── App.js                      # Renders AIChatBot globally (line 97)
```

---

## 🔌 API Endpoints

### 1. AI Chat

**Endpoint**: `POST /api/ai/chat`

**Request Body**:
```json
{
  "message": "What is your return policy?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hello! How can I help you?"
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "response": "Our return policy allows returns within 30 days...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. AI Recommendations

**Endpoint**: `GET /api/ai/recommendations`

**Query Parameters**:
- `cartItems` (optional): Comma-separated product IDs

**Headers**:
- `Authorization: Bearer <token>` (optional, for personalized recommendations)

**Response**:
```json
{
  "success": true,
  "products": [...],
  "count": 8
}
```

**Alternative Endpoint**: `GET /api/products/recommendations?productId=xxx&category=xxx`

---

### 3. AI Semantic Search

**Endpoint**: `GET /api/ai/search?query=wireless headphones`

**Query Parameters**:
- `query` (required): Search query

**Response**:
```json
{
  "success": true,
  "products": [...],
  "query": "wireless headphones",
  "count": 15
}
```

---

### 4. AI Description Generator

**Endpoint**: `POST /api/ai/generate-description`

**Headers**:
- `Authorization: Bearer <token>` (required, admin only)

**Request Body**:
```json
{
  "name": "Wireless Headphones",
  "category": "Electronics",
  "price": 99.99,
  "features": ["Noise Cancellation", "Bluetooth 5.0", "30-hour battery"]
}
```

**Response**:
```json
{
  "success": true,
  "description": "Discover the Wireless Headphones - a premium Electronics product..."
}
```

---

### 5. AI Sentiment Analysis

**Endpoint**: `POST /api/ai/analyze-sentiment`

**Headers**:
- `Authorization: Bearer <token>` (required)

**Request Body**:
```json
{
  "reviewText": "This product is amazing! Great quality and fast shipping."
}
```

**Response**:
```json
{
  "success": true,
  "analysis": {
    "sentiment": "positive",
    "confidence": 0.95
  }
}
```

---

## 🎨 Frontend Components

### 1. AIChatBot Component

**File**: `client/src/components/ai/AIChatBot.js`

**Features**:
- Floating chat button (bottom-right corner)
- Expandable chat window
- Message history
- Loading states
- Error handling

**Usage**:
```jsx
import AIChatBot from './components/ai/AIChatBot';

// In your App.js or layout component
<AIChatBot />
```

**Props**: None (self-contained component)

---

### 2. AIRecommendations Component

**File**: `client/src/components/ai/AIRecommendations.js`

**Features**:
- Displays AI-recommended products
- Loading states
- Empty state handling
- Responsive grid layout

**Usage**:
```jsx
import AIRecommendations from './components/ai/AIRecommendations';

<AIRecommendations 
  productId="product123"
  category="Electronics"
  title="AI Recommendations For You"
/>
```

**Props**:
- `productId` (optional): Current product ID
- `category` (optional): Product category
- `title` (optional): Section title (default: "AI Recommendations For You")

---

## ⚙️ Configuration

### Environment Variables

Add to `server/.env`:

```env
# Google Gemini API Configuration (for Chatbot)
GEMINI_API_KEY=your_gemini_api_key_here

# OpenAI API Configuration (for other AI features)
OPENAI_API_KEY=your_openai_api_key_here
```

**Getting a Google Gemini API Key** (for Chatbot):
1. Go to https://aistudio.google.com/app/apikey or https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key" or "Get API Key"
4. Copy the API key
5. Add to `.env` file as `GEMINI_API_KEY`

**Getting an OpenAI API Key** (for other AI features):
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and add to `.env` file as `OPENAI_API_KEY`

**Note**: 
- The chatbot uses **Google Gemini 1.5 Pro** and requires `GEMINI_API_KEY`
- Other AI features (recommendations, search, description generation, sentiment analysis) use OpenAI and require `OPENAI_API_KEY`
- The application works without API keys but uses fallback mechanisms

---

### Dependencies

**Backend** (`server/package.json`):
```json
{
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "openai": "^4.20.1"
  }
}
```

**Frontend**: No additional AI-specific dependencies required.

---

## 💡 Usage Examples

### Example 1: Using AI Chatbot

The chatbot is automatically available on all pages. Users can:
1. Click the chat button (bottom-right)
2. Type their question
3. Receive AI-powered responses

### Example 2: Viewing AI Recommendations

On the homepage and product detail pages, users will see:
- **"AI Recommendations For You"** section
- Products suggested based on their browsing behavior
- Updated recommendations as they browse

### Example 3: Admin Generating Product Description

1. Navigate to `/admin/products/new`
2. Fill in product name, category, and price
3. Click **"Generate with AI"** button next to description field
4. AI generates professional description automatically
5. Review and edit if needed
6. Save product

### Example 4: Using Semantic Search (Backend)

```javascript
// Make API call
const response = await fetch('/api/ai/search?query=comfortable running shoes');
const data = await response.json();
// Returns products ranked by AI relevance
```

---

## 🔧 Fallback Mechanisms

All AI features have intelligent fallback mechanisms:

1. **Chatbot**: Returns helpful static responses when API key is missing
2. **Recommendations**: Falls back to category-based and rating-based recommendations
3. **Search**: Falls back to text-based search using MongoDB text search
4. **Description Generator**: Returns template-based descriptions
5. **Sentiment Analysis**: Uses keyword-based sentiment detection

---

## 📊 AI Model Information

### Chatbot (Gemini 1.5 Pro)
- **Model**: gemini-1.5-pro
- **Provider**: Google AI (Gemini)
- **Temperature**: 0.7 (balanced creativity)
- **Max Output Tokens**: 200
- **Features**: Advanced reasoning, excellent context retention, natural conversations

### Other AI Features (OpenAI GPT-3.5-turbo)
- **Model**: gpt-3.5-turbo
- **Provider**: OpenAI
- **Temperature Settings**:
  - Recommendations: 0.7 (balanced)
  - Search: 0.3 (more focused)
  - Description: 0.8 (more creative)
  - Sentiment: 0.3 (more accurate)

---

## 🚀 Future Enhancements

Potential AI features to add:

1. **AI Image Generation**: Generate product images from descriptions
2. **AI Price Optimization**: Suggest optimal pricing based on market data
3. **AI Review Summarization**: Auto-summarize product reviews
4. **AI Inventory Forecasting**: Predict demand for products
5. **AI Customer Segmentation**: Automatically segment customers
6. **AI Fraud Detection**: Detect fraudulent orders and reviews
7. **AI Personalized Emails**: Generate personalized marketing emails

---

## 📝 Summary

**Total AI Features**: 5

**Backend Files**: 2
- `server/services/aiService.js`
- `server/routes/ai.js`

**Frontend Files**: 2
- `client/src/components/ai/AIChatBot.js`
- `client/src/components/ai/AIRecommendations.js`

**Integration Points**: 3
- `client/src/App.js` (Chatbot)
- `client/src/pages/HomePage.js` (Recommendations)
- `client/src/pages/ProductDetailPage.js` (Recommendations)
- `client/src/pages/admin/AdminProductForm.js` (Description Generator)

**API Endpoints**: 5
- `POST /api/ai/chat`
- `GET /api/ai/recommendations`
- `GET /api/ai/search`
- `POST /api/ai/generate-description`
- `POST /api/ai/analyze-sentiment`

---

## 🆘 Troubleshooting

### AI Features Not Working

**For Chatbot (Gemini)**:
1. **Check API Key**: Ensure `GEMINI_API_KEY` is set in `.env`
2. **Check API Quota**: Verify Google AI account has available credits
3. **Check Network**: Ensure server can reach Google AI API
4. **Check Logs**: Review server console for error messages

**For Other AI Features (OpenAI)**:
1. **Check API Key**: Ensure `OPENAI_API_KEY` is set in `.env`
2. **Check API Quota**: Verify OpenAI account has available credits
3. **Check Network**: Ensure server can reach OpenAI API
4. **Check Logs**: Review server console for error messages

### Fallback Mode

If AI features show fallback behavior:
- **Chatbot**: Check if `GEMINI_API_KEY` is configured and valid
- **Other Features**: Check if `OPENAI_API_KEY` is configured and valid
- Verify API keys are correct
- Check account status and quotas

---

## 📞 Support

For issues related to AI features:
- Check server logs for detailed error messages
- Verify API key configurations (`GEMINI_API_KEY` for chatbot, `OPENAI_API_KEY` for other features)
- Ensure all dependencies are installed (`@google/generative-ai` and `openai`)
- Check API quotas and account status

---

**Last Updated**: January 2024
**AI Integration Version**: 1.0.0

