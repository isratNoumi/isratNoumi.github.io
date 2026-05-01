/**
 * LLM Provider Configuration
 * 
 * Supports multiple LLM providers including free options
 */

require('dotenv').config();
const OpenAI = require('openai');
const axios = require('axios');

class LLMProvider {
  constructor() {
    this.provider = process.env.LLM_PROVIDER || 'openai';
    this.initializeProvider();
  }

  initializeProvider() {
    switch (this.provider) {
      case 'openai':
        this.client = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY
        });
        break;
      
      case 'ollama':
        this.ollamaBaseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
        this.ollamaModel = process.env.OLLAMA_MODEL || 'llama2';
        break;
      
      case 'gemini':
        this.geminiKey = process.env.GOOGLE_API_KEY;
        this.geminiModel = process.env.GEMINI_MODEL || 'gemini-pro';
        break;
      
      case 'huggingface':
        this.hfKey = process.env.HUGGINGFACE_API_KEY;
        this.hfModel = process.env.HUGGINGFACE_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2';
        break;
      
      case 'cohere':
        this.cohereKey = process.env.COHERE_API_KEY;
        break;
    }
  }

  /**
   * Generate chat completion
   */
  async generateResponse(messages, context) {
    switch (this.provider) {
      case 'openai':
        return this.generateOpenAI(messages, context);
      
      case 'ollama':
        return this.generateOllama(messages, context);
      
      case 'gemini':
        return this.generateGemini(messages, context);
      
      case 'huggingface':
        return this.generateHuggingFace(messages, context);
      
      case 'cohere':
        return this.generateCohere(messages, context);
      
      default:
        throw new Error(`Unknown provider: ${this.provider}`);
    }
  }



  /**
   * Google Gemini implementation (generous free tier)
   */
  async generateGemini(messages, context) {
    const userMessage = messages[messages.length - 1].content;
    const prompt = `Based on this information about Israt Moyeen Noumi:

${context}

Answer this question professionally and concisely: ${userMessage}`;
    
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.geminiModel}:generateContent?key=${this.geminiKey}`,
        {
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        }
      );
      
      // Remove debug logging for production
      // console.log('Gemini Response:', JSON.stringify(response.data, null, 2));
      
      if (response.data.candidates && response.data.candidates[0]) {
        const candidate = response.data.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
          return candidate.content.parts[0].text;
        }
      }
      
      throw new Error('Unexpected Gemini response structure');
      
    } catch (error) {
      console.error('Gemini API Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  }



  /**
   * Cohere implementation (free tier available)
   */
  async generateCohere(messages, context) {
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        model: 'command',
        prompt: `Context: ${context}\n\nQuestion: ${messages[messages.length - 1].content}\n\nAnswer:`,
        max_tokens: 250,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${this.cohereKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.generations[0].text.trim();
  }

  /**
   * Create embeddings
   */
  async createEmbedding(text) {
    const embeddingProvider = process.env.EMBEDDING_PROVIDER || this.provider;
    
    switch (embeddingProvider) {
      case 'openai':
        const response = await this.client.embeddings.create({
          model: "text-embedding-ada-002",
          input: text
        });
        return response.data[0].embedding;
      
      case 'ollama':
        const ollamaModel = process.env.OLLAMA_EMBEDDING_MODEL || 'nomic-embed-text';
        const res = await axios.post(`${this.ollamaBaseURL}/api/embeddings`, {
          model: ollamaModel,
          prompt: text
        });
        return res.data.embedding;
      
      case 'gemini':
        // Use gemini-embedding-001 (verified available model)
        const geminiRes = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${this.geminiKey}`,
          {
            content: {
              parts: [{ text: text }]
            }
          }
        );
        return geminiRes.data.embedding.values;
      
      case 'cohere':
        const cohereRes = await axios.post(
          'https://api.cohere.ai/v1/embed',
          {
            texts: [text],
            model: 'embed-english-v2.0'
          },
          {
            headers: {
              'Authorization': `Bearer ${this.cohereKey}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return cohereRes.data.embeddings[0];
      
      default:
        throw new Error(`Embeddings not supported for provider: ${embeddingProvider}`);
    }
  }
}

module.exports = LLMProvider;
