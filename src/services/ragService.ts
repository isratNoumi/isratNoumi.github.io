// RAG Service Configuration
// This service handles communication with your RAG backend

// Portfolio knowledge base - this data will be embedded and used for RAG retrieval
export const portfolioKnowledgeBase = {
  about: {
    name: "Israt Moyeen Noumi",
    role: "AI/ML-Application Developer",
    company: "Dexian Bangladesh",
    specialties: [
      "Full Stack Development",
      "AI-driven Solutions",
      "GenAI/LLM Technologies",
      "RAG Systems",
      "React/Next.js Development",
      "Supabase"
    ],
    summary: "Building scalable full stack applications and AI-driven solutions with React, Next.js, Supabase, and cutting-edge GenAI/LLM technologies."
  },
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    backend: ["Node.js", "Supabase", "RESTful APIs"],
    ai_ml: ["GenAI", "LLM", "RAG Systems", "Prompt Engineering"],
    tools: ["Git", "VS Code", "Vite"]
  }
}

interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface RAGRequest {
  message: string
  history?: ChatMessage[]
}

interface RAGResponse {
  response: string
  sources?: string[]
}

/**
 * RAG Chat Service
 * Replace this implementation with your actual RAG backend
 */
class RAGService {
  private apiEndpoint: string
  private apiKey: string

  constructor() {
    // Configure your RAG backend endpoint
    // Options:
    // 1. Use OpenAI API with embeddings
    // 2. Use a custom LangChain backend
    // 3. Use services like Pinecone, Weaviate, or Qdrant for vector storage
    this.apiEndpoint = import.meta.env.VITE_RAG_API_ENDPOINT || '/api/chat'
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || ''
  }

  /**
   * Send a message to the RAG backend
   */
  async sendMessage(request: RAGRequest): Promise<RAGResponse> {
    try {
      // Option 1: Call your own RAG backend
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        throw new Error(`RAG API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('RAG Service Error:', error)
      
      // Fallback to mock response for demonstration
      return this.getMockResponse(request.message)
    }
  }

  /**
   * Mock response for testing without a backend
   * Remove this once you have a real RAG backend
   */
  private getMockResponse(message: string): RAGResponse {
    const lowerMessage = message.toLowerCase()
    
    // Simple keyword-based responses for demo
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      return {
        response: `Israt specializes in full-stack development with expertise in React, Next.js, TypeScript, and modern AI technologies. She's proficient in building AI-driven solutions using GenAI, LLMs, and RAG systems. Her backend skills include Node.js and Supabase, and she's experienced with TailwindCSS for styling.`,
        sources: ['Skills Section']
      }
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return {
        response: `Israt currently works at Dexian Bangladesh as an AI/ML-Application Developer, where she delivers intelligent applications powered by RAG and modern AI frameworks. She specializes in building scalable full-stack applications with cutting-edge GenAI/LLM technologies.`,
        sources: ['Experience Section']
      }
    }
    
    if (lowerMessage.includes('project')) {
      return {
        response: `Israt has worked on various projects involving AI-driven solutions, RAG systems, and full-stack applications. You can check out the Projects section to see her work in detail, where she showcases applications built with React, Next.js, and GenAI technologies.`,
        sources: ['Projects Section']
      }
    }
    
    if (lowerMessage.includes('education')) {
      return {
        response: `You can find detailed information about Israt's educational background in the Education section of the portfolio. Feel free to navigate there for comprehensive details about her academic achievements.`,
        sources: ['Education Section']
      }
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
      return {
        response: `You can reach out to Israt through the Contact section of this portfolio. You can also connect with her on GitHub and LinkedIn - the links are available in the footer and contact page.`,
        sources: ['Contact Section']
      }
    }

    if (lowerMessage.includes('rag') || lowerMessage.includes('retrieval')) {
      return {
        response: `RAG (Retrieval-Augmented Generation) is one of Israt's specialties! She has experience building intelligent applications powered by RAG systems, combining retrieval mechanisms with large language models to create context-aware AI solutions. This chatbot itself is an example of RAG implementation!`,
        sources: ['About Section', 'Skills']
      }
    }
    
    // Default response
    return {
      response: `I can help you learn more about Israt's experience, skills, projects, and education. Feel free to ask specific questions! You can also navigate to different sections of the portfolio using the menu above.`,
      sources: []
    }
  }

  /**
   * Example: OpenAI-based RAG implementation
   * Uncomment and configure this if using OpenAI
   */
  /*
  private async queryOpenAI(message: string, context: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant for Israt Moyeen Noumi's portfolio. Use the following context to answer questions: ${context}`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    })

    const data = await response.json()
    return data.choices[0].message.content
  }
  */
}

export const ragService = new RAGService()
export default ragService
