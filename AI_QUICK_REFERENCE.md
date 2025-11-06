# 🤖 AI Features - Quick Reference Guide

## 📍 Where AI is Added in This Project

### 🔧 Backend Files

#### 1. AI Service (`server/services/aiService.js`)
Contains all AI logic:
- `chatSupport()` - AI chatbot functionality (Powered by **Google Gemini 1.5 Pro**)
- `getProductRecommendations()` - Product recommendations (OpenAI GPT-3.5-turbo)
- `semanticSearch()` - Enhanced search (OpenAI GPT-3.5-turbo)
- `generateProductDescription()` - Description generation (OpenAI GPT-3.5-turbo)
- `analyzeReviewSentiment()` - Sentiment analysis (OpenAI GPT-3.5-turbo)

#### 2. AI Routes (`server/routes/ai.js`)
API endpoints for AI features:
- `POST /api/ai/chat` - Chat endpoint
- `GET /api/ai/recommendations` - Recommendations endpoint
- `GET /api/ai/search` - Search endpoint
- `POST /api/ai/generate-description` - Description generation (Admin)
- `POST /api/ai/analyze-sentiment` - Sentiment analysis

#### 3. Server Entry (`server/index.js`)
- Line 50: Registers AI routes: `app.use('/api/ai', require('./routes/ai'));`

### 🎨 Frontend Files

#### 1. AI Chatbot (`client/src/components/ai/AIChatBot.js`)
- Floating chat button component
- Integrated globally in `App.js` (line 97)

#### 2. AI Recommendations (`client/src/components/ai/AIRecommendations.js`)
- Product recommendations component
- Used in:
  - `HomePage.js` (line 219)
  - `ProductDetailPage.js` (line 382-388)

#### 3. AI Description Generator (`client/src/pages/admin/AdminProductForm.js`)
- "Generate with AI" button (line 252-260)
- AI description generation function (line 125-155)

### 📊 Integration Points

| Feature | Backend | Frontend | Location | AI Provider |
|---------|---------|----------|----------|-------------|
| **Chatbot** | ✅ `aiService.js` | ✅ `AIChatBot.js` | Global (App.js) | **Gemini 1.5 Pro** |
| **Recommendations** | ✅ `aiService.js` | ✅ `AIRecommendations.js` | HomePage, ProductDetailPage | OpenAI GPT-3.5-turbo |
| **Search** | ✅ `aiService.js` | 🔄 Can be integrated | Backend ready | OpenAI GPT-3.5-turbo |
| **Description Generator** | ✅ `aiService.js` | ✅ `AdminProductForm.js` | Admin panel | OpenAI GPT-3.5-turbo |
| **Sentiment Analysis** | ✅ `aiService.js` | 🔄 Can be integrated | Backend ready | OpenAI GPT-3.5-turbo |

### 🎯 Visual Locations

```
📁 Project Structure
│
├── 📁 server/
│   ├── 📁 services/
│   │   └── ✅ aiService.js          ← All AI functions
│   │
│   ├── 📁 routes/
│   │   └── ✅ ai.js                 ← AI API endpoints
│   │
│   └── ✅ index.js (line 50)        ← AI routes registration
│
└── 📁 client/src/
    ├── 📁 components/
    │   └── 📁 ai/
    │       ├── ✅ AIChatBot.js      ← Chatbot component
    │       └── ✅ AIRecommendations.js ← Recommendations component
    │
    ├── 📁 pages/
    │   ├── ✅ HomePage.js (line 219) ← Uses AIRecommendations
    │   ├── ✅ ProductDetailPage.js (line 382) ← Uses AIRecommendations
    │   └── 📁 admin/
    │       └── ✅ AdminProductForm.js (line 125, 252) ← AI Description Generator
    │
    └── ✅ App.js (line 97)          ← Renders AIChatBot globally
```

### 🔑 Configuration

**Environment Variables** (required in `server/.env`):
```env
# For Chatbot (Google Gemini 1.5 Pro)
GEMINI_API_KEY=your_gemini_api_key_here

# For Other AI Features (OpenAI GPT-3.5-turbo)
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: 
- Chatbot uses **Google Gemini 1.5 Pro** and requires `GEMINI_API_KEY`
- Other AI features use OpenAI GPT-3.5-turbo and require `OPENAI_API_KEY`
- All AI features work with fallback mechanisms even without API keys

### 📚 Documentation

- **Full Documentation**: See [AI_DOCUMENTATION.md](./AI_DOCUMENTATION.md)
- **Main README**: See [README.md](./README.md) - AI Features section

---

**Total AI Features**: 5
**Backend Files**: 2
**Frontend Files**: 3
**Integration Points**: 4

