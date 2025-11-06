const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize OpenAI client (for other AI features)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Initialize Google Gemini client (for chatbot) - lazy initialization
let genAI = null;

/**
 * Get or initialize Gemini AI client
 */
const getGenAI = () => {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

/**
 * AI Chat Support - Customer support chatbot (Powered by Gemini 2.5 Flash)
 * @param {string} message - User's message
 * @param {Array} conversationHistory - Previous conversation messages
 * @param {Array} products - Array of products from database (optional)
 * @returns {Promise<string>} - AI response
 */
const chatSupport = async (message, conversationHistory = [], products = []) => {
  try {
    const geminiClient = getGenAI();
    if (!process.env.GEMINI_API_KEY || !geminiClient) {
      // Fallback response when API key is not set
      return "I'm here to help! Our customer support team is available 24/7. For immediate assistance, please contact support@amazonclone.com or call 1-800-AMAZON.";
    }

    // Get the Gemini 2.5 Flash model (fast and efficient)
    const model = geminiClient.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4000, // Increased limit for longer, more detailed responses
      }
    });

    // Build product context if products are available
    let productContext = '';
    if (products && products.length > 0) {
      const productList = products.slice(0, 50).map(product => ({
        id: product._id?.toString() || product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description?.substring(0, 150),
        rating: product.ratings || 0,
        stock: product.stock || 0,
        features: product.features || []
      }));
      
      productContext = `\n\nAVAILABLE PRODUCTS IN OUR STORE:\n${JSON.stringify(productList, null, 2)}\n\nWhen customers ask about products (like "show me a watch", "find headphones", etc.), you should:
1. Search through the available products above
2. Suggest specific products by name that match their request
3. Mention key details like price, category, and features
4. Provide helpful recommendations based on their needs
5. If exact products aren't found, suggest similar items from the same category`;
    }

    // Build system instruction and conversation history
    const systemInstruction = `You are a helpful customer support assistant for an e-commerce platform. 
You help customers with:
- Product inquiries and recommendations (you have access to our product database)
- Order tracking
- Shipping information
- Returns and refunds
- General shopping questions
- Technical support

Be friendly, helpful, and detailed. When customers ask about products, you can see our entire product catalog and should suggest specific products by name, price, and features.
Provide comprehensive, helpful responses. You can give longer explanations when needed.${productContext}`;

    // Convert conversation history to Gemini format
    const history = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Build chat history with system instruction
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemInstruction }]
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I\'m here to help you with any questions about products, orders, shipping, returns, or anything else related to your shopping experience. How can I assist you today?' }]
        },
        ...history
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4000, // Increased limit for longer responses
      }
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response;
    
    // Get the text from the response
    let text = '';
    try {
      text = response.text();
    } catch (error) {
      console.error('Error getting text from response:', error);
      // Try alternative method to get text
      if (response.candidates && response.candidates[0] && response.candidates[0].content) {
        text = response.candidates[0].content.parts[0].text || '';
      }
    }
    
    if (!text || text.trim() === '') {
      throw new Error('Empty response from Gemini API');
    }

    return text;
  } catch (error) {
    console.error('AI Chat Support Error (Gemini):', error);
    return "I apologize, but I'm experiencing technical difficulties. Please contact our support team at support@amazonclone.com for assistance.";
  }
};

/**
 * AI Product Recommendations - Recommend products based on user behavior
 * @param {Array} userInterests - Array of product categories/interests
 * @param {Array} viewedProducts - Array of product IDs user has viewed
 * @param {Array} cartItems - Array of product IDs in cart
 * @param {Array} allProducts - Array of all available products
 * @returns {Promise<Array>} - Recommended product IDs
 */
const getProductRecommendations = async (userInterests = [], viewedProducts = [], cartItems = [], allProducts = []) => {
  try {
    if (!process.env.OPENAI_API_KEY || allProducts.length === 0) {
      // Fallback: Simple recommendation based on categories
      const recommendations = allProducts
        .filter(product => {
          if (viewedProducts.includes(product._id.toString())) return false;
          if (cartItems.includes(product._id.toString())) return false;
          if (userInterests.length > 0) {
            return userInterests.some(interest => 
              product.category.toLowerCase().includes(interest.toLowerCase()) ||
              product.name.toLowerCase().includes(interest.toLowerCase())
            );
          }
          return true;
        })
        .sort((a, b) => b.ratings - a.ratings || b.sold - a.sold)
        .slice(0, 8)
        .map(p => p._id.toString());
      
      return recommendations;
    }

    // Create product summary for AI
    const productSummary = allProducts.slice(0, 50).map(product => ({
      id: product._id.toString(),
      name: product.name,
      category: product.category,
      price: product.price,
      rating: product.ratings,
      description: product.description.substring(0, 100)
    })).join('\n');

    const prompt = `Based on the following information, recommend 8 products from the available products list:
    
User Interests: ${userInterests.join(', ') || 'None specified'}
Viewed Products: ${viewedProducts.length} products
Cart Items: ${cartItems.length} items

Available Products:
${productSummary}

Please recommend 8 products that the user would likely be interested in. Consider:
1. User interests and preferences
2. Products similar to viewed products
3. Complementary products to cart items
4. High-rated and popular products

Return only the product IDs separated by commas, like: id1,id2,id3,id4,id5,id6,id7,id8`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a product recommendation engine. Return only product IDs separated by commas.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    const recommendedIds = response.choices[0].message.content
      .split(',')
      .map(id => id.trim())
      .filter(id => id.length > 0)
      .slice(0, 8);

    // Fallback if AI doesn't return valid IDs
    if (recommendedIds.length === 0) {
      return allProducts
        .filter(p => !viewedProducts.includes(p._id.toString()) && !cartItems.includes(p._id.toString()))
        .sort((a, b) => b.ratings - a.ratings)
        .slice(0, 8)
        .map(p => p._id.toString());
    }

    return recommendedIds;
  } catch (error) {
    console.error('AI Recommendations Error:', error);
    // Fallback to simple recommendations
    return allProducts
      .filter(p => !viewedProducts.includes(p._id.toString()) && !cartItems.includes(p._id.toString()))
      .sort((a, b) => b.ratings - a.ratings || b.sold - a.sold)
      .slice(0, 8)
      .map(p => p._id.toString());
  }
};

/**
 * AI Semantic Search - Enhanced product search using AI
 * @param {string} query - Search query
 * @param {Array} products - Array of products to search
 * @returns {Promise<Array>} - Relevant product IDs sorted by relevance
 */
const semanticSearch = async (query, products = []) => {
  try {
    if (!process.env.OPENAI_API_KEY || products.length === 0) {
      // Fallback to text search
      return products
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
        .map(p => p._id.toString());
    }

    const productSummary = products.slice(0, 100).map(product => ({
      id: product._id.toString(),
      name: product.name,
      category: product.category,
      description: product.description.substring(0, 150)
    })).join('\n\n');

    const prompt = `Given the search query: "${query}"

Find and rank the most relevant products from this list:

${productSummary}

Return the product IDs in order of relevance (most relevant first), separated by commas.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a product search engine. Return only product IDs in order of relevance, separated by commas.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 300
    });

    const relevantIds = response.choices[0].message.content
      .split(',')
      .map(id => id.trim())
      .filter(id => id.length > 0);

    // Combine AI results with fallback search
    const aiResults = relevantIds.slice(0, 20);
    const fallbackResults = products
      .filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )
      .map(p => p._id.toString())
      .filter(id => !aiResults.includes(id));

    return [...aiResults, ...fallbackResults];
  } catch (error) {
    console.error('AI Semantic Search Error:', error);
    // Fallback to text search
    return products
      .filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )
      .map(p => p._id.toString());
  }
};

/**
 * AI Product Description Generator - Generate product descriptions using Gemini with internet search
 * @param {string} productName - Product name
 * @param {string} category - Product category
 * @param {number} price - Product price
 * @param {Array} features - Product features
 * @returns {Promise<string>} - Generated product description
 */
const generateProductDescription = async (productName, category, price, features = []) => {
  try {
    const geminiClient = getGenAI();
    if (!process.env.GEMINI_API_KEY || !geminiClient) {
      // Fallback description
      return `Discover the ${productName} - a premium ${category} product that combines quality and value. 
      ${features.length > 0 ? `Key features include: ${features.join(', ')}. ` : ''}
      Priced at $${price}, this product offers exceptional value for money. Perfect for your needs.`;
    }

    // Get the Gemini 2.5 Flash model
    const model = geminiClient.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 2000, // Allow longer descriptions
      }
    });

    const prompt = `You are a professional product description writer for an e-commerce platform with access to real-time product information.

TASK: Research and write a comprehensive, SEO-friendly product description for an e-commerce website.

Product Information:
- Product Name: "${productName}"
- Category: ${category}
- Price: $${price}
- Features: ${features.join(', ') || 'None specified'}

INSTRUCTIONS:
1. Use your knowledge and understanding of "${productName}" to write an accurate description. Consider what this product typically includes, its specifications, features, and benefits based on real-world examples of similar products in the ${category} category.

2. Research common features, specifications, and benefits of products similar to "${productName}" in the ${category} category.

3. Write a compelling, detailed product description (200-300 words, maximum 4500 characters) that:
   - Is engaging and persuasive
   - Highlights key features and benefits that would be typical for this type of product
   - Includes SEO-friendly keywords naturally (use terms like "${productName}", "${category}", and related search terms)
   - Mentions specific technical details, specifications, or capabilities that similar products typically have
   - Discusses why customers would want this product and what problems it solves
   - Uses professional, sales-oriented tone
   - Is informative but accessible
   - Includes the price point ($${price}) naturally in the description
   - No markdown formatting, just plain text

4. Make the description sound authentic and based on real product knowledge. Include specific details that would be found in actual product descriptions for similar items.

IMPORTANT: Write as if you have researched "${productName}" and understand its real-world features and benefits. Include specific details that make the description credible and informative.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    
    let text = '';
    try {
      text = response.text();
    } catch (error) {
      console.error('Error getting text from response:', error);
      // Try alternative method to get text
      if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          text = candidate.content.parts[0].text || '';
        }
      }
    }
    
    if (!text || text.trim() === '') {
      // Fallback: Generate a basic description if Gemini returns empty
      console.warn('Gemini returned empty response, using fallback description');
      text = `Discover the ${productName} - a premium ${category} product that combines quality and value. 
      
This exceptional product is designed to meet your needs with outstanding features and performance. ${features.length > 0 ? `Key features include: ${features.join(', ')}. ` : ''}
      
Priced at $${price}, this product offers exceptional value for money. Whether you're looking for reliability, style, or functionality, this product delivers on all fronts.
      
Perfect for everyday use, this ${category} product is built to last and designed with your satisfaction in mind. Experience the difference that quality makes with this exceptional offering from our store.`;
    }

    // Ensure description doesn't exceed 5000 characters (database limit)
    let finalText = text.trim();
    if (finalText.length > 5000) {
      finalText = finalText.substring(0, 4997) + '...';
      console.warn('Description truncated to 5000 characters');
    }

    return finalText;
  } catch (error) {
    console.error('AI Description Generator Error (Gemini):', error);
    // Fallback description
    return `Discover the ${productName} - a premium ${category} product that combines quality and value. 
    ${features.length > 0 ? `Key features include: ${features.join(', ')}. ` : ''}
    Priced at $${price}, this product offers exceptional value for money. Perfect for your needs.`;
  }
};

/**
 * AI Review Sentiment Analysis - Analyze review sentiment
 * @param {string} reviewText - Review comment text
 * @returns {Promise<Object>} - Sentiment analysis result
 */
const analyzeReviewSentiment = async (reviewText) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      // Simple fallback sentiment analysis
      const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'perfect', 'wonderful', 'fantastic', 'awesome', 'best'];
      const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'disappointed', 'poor', 'horrible', 'waste'];
      
      const text = reviewText.toLowerCase();
      const positiveCount = positiveWords.filter(word => text.includes(word)).length;
      const negativeCount = negativeWords.filter(word => text.includes(word)).length;
      
      return {
        sentiment: positiveCount > negativeCount ? 'positive' : negativeCount > positiveCount ? 'negative' : 'neutral',
        confidence: Math.abs(positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1)
      };
    }

    const prompt = `Analyze the sentiment of this product review and return only a JSON object with "sentiment" (positive, negative, or neutral) and "confidence" (0-1) fields.

Review: "${reviewText}"

Return only JSON, no other text.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a sentiment analysis tool. Return only valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 100
    });

    const result = JSON.parse(response.choices[0].message.content.trim());
    return {
      sentiment: result.sentiment || 'neutral',
      confidence: result.confidence || 0.5
    };
  } catch (error) {
    console.error('AI Sentiment Analysis Error:', error);
    return {
      sentiment: 'neutral',
      confidence: 0.5
    };
  }
};

module.exports = {
  chatSupport,
  getProductRecommendations,
  semanticSearch,
  generateProductDescription,
  analyzeReviewSentiment
};

