/**
 * Script to create embeddings of portfolio content and store in FAISS
 * 
 * This script:
 * 1. Reads portfolio content from a structured data file
 * 2. Chunks the content into manageable pieces
 * 3. Creates embeddings using OpenAI
 * 4. Stores vectors in local FAISS index for retrieval
 * 
 * Run: node scripts/embedPortfolio.js
 */

require('dotenv').config();
const { HierarchicalNSW } = require('hnswlib-node');
const LLMProvider = require('../llm-config');
const fs = require('fs');
const path = require('path');

// Initialize LLM Provider
const llmProvider = new LLMProvider();

// Load content from extracted data or use default
let portfolioContent;

const extractedContentPath = path.join(__dirname, '..', 'data', 'extracted_content.json');
if (fs.existsSync(extractedContentPath)) {
  console.log('Loading content from extracted_content.json...');
  portfolioContent = JSON.parse(fs.readFileSync(extractedContentPath, 'utf-8'));
} else {
  console.log('No extracted content found. Using default portfolio content...');
  console.log('Tip: Run "npm run extract" to extract from PDFs and URLs');
  portfolioContent = [
  {
    id: 'about-1',
    category: 'about',
    title: 'Professional Overview',
    text: `Israt Moyeen Noumi is an AI/ML-Application Developer currently working at Dexian Bangladesh. 
           She specializes in building scalable full stack applications and AI-driven solutions using React, 
           Next.js, Supabase, and cutting-edge GenAI/LLM technologies. She has expertise in delivering 
           intelligent applications powered by RAG and modern AI frameworks.`
  },
  {
    id: 'skills-frontend-1',
    category: 'skills',
    title: 'Frontend Technologies',
    text: `Israt's frontend skills include React, Next.js, TypeScript, TailwindCSS, HTML5, and CSS3. 
           She excels at building modern, responsive user interfaces with excellent user experience. 
           Her expertise in React and Next.js allows her to create fast, scalable web applications.`
  },
  {
    id: 'skills-backend-1',
    category: 'skills',
    title: 'Backend Technologies',
    text: `On the backend, Israt works with Node.js, Supabase, and RESTful APIs. 
           She has experience with PostgreSQL databases and building scalable server-side applications. 
           Her backend skills complement her frontend expertise for full-stack development.`
  },
  {
    id: 'skills-ai-1',
    category: 'skills',
    title: 'AI/ML Expertise',
    text: `Israt specializes in GenAI, LLM Integration, RAG Systems, and Prompt Engineering. 
           She has hands-on experience building intelligent applications that leverage large language models. 
           Her expertise in RAG (Retrieval-Augmented Generation) systems allows her to create context-aware AI solutions.`
  },
  {
    id: 'skills-tools-1',
    category: 'skills',
    title: 'Development Tools',
    text: `Israt is proficient with modern development tools including Git for version control, 
           VS Code as her primary IDE, Vite and Webpack for build tooling. 
           She understands modern development workflows and best practices.`
  },
  {
    id: 'experience-current-1',
    category: 'experience',
    title: 'Current Role at Dexian Bangladesh',
    text: `Israt currently works at Dexian Bangladesh as an AI/ML-Application Developer. 
           In this role, she delivers intelligent applications powered by RAG and modern AI frameworks. 
           Her work involves building scalable full-stack applications with cutting-edge GenAI/LLM technologies. 
           She combines her full-stack development skills with AI/ML expertise to create innovative solutions.`
  },
  {
    id: 'projects-ai-1',
    category: 'projects',
    title: 'AI-Driven Applications',
    text: `Israt has developed AI-driven applications using GenAI and LLM technologies. 
           These projects showcase her ability to integrate large language models into practical applications. 
           She has experience with prompt engineering and creating intelligent user interactions.`
  },
  {
    id: 'projects-fullstack-1',
    category: 'projects',
    title: 'Full-Stack Web Applications',
    text: `Israt has built full-stack web applications using React and Next.js on the frontend, 
           with Node.js and Supabase on the backend. Her projects demonstrate modern web development practices, 
           responsive design, and excellent user experience. She focuses on scalable, maintainable code.`
  },
  {
    id: 'projects-rag-1',
    category: 'projects',
    title: 'RAG Systems',
    text: `Israt has hands-on experience building RAG-powered systems for intelligent information retrieval. 
           These systems combine vector databases, embeddings, and large language models to provide 
           context-aware responses. She understands the architecture and implementation of RAG pipelines.`
  },
  {
    id: 'projects-portfolio-1',
    category: 'projects',
    title: 'Portfolio Websites',
    text: `Israt creates modern portfolio websites with contemporary UI/UX design. 
           She uses TailwindCSS for styling and implements smooth animations and interactions. 
           Her portfolios are responsive, performant, and showcase professional work effectively.`
  },
  {
    id: 'contact-1',
    category: 'contact',
    title: 'Contact Information',
    text: `To contact Israt Moyeen Noumi, you can visit the Contact section of her portfolio website. 
           She is also available on LinkedIn at linkedin.com/in/israi and GitHub at github.com/israiNoumi. 
           Her portfolio includes a contact form for direct communication.`
  },
  {
    id: 'rag-expertise-1',
    category: 'expertise',
    title: 'RAG Technology Expertise',
    text: `RAG (Retrieval-Augmented Generation) is one of Israt's key specialties. 
           She has deep understanding of how RAG systems work, combining vector search with language models. 
           This expertise allows her to build intelligent chatbots and AI assistants that can answer 
           questions based on specific knowledge bases. She knows how to implement embeddings, vector databases, 
           and integrate them with LLMs for context-aware responses.`
  }
];

/**
 * Create embedding for text
 */
async function createEmbedding(text) {
  return await llmProvider.createEmbedding(text);
}

/**
 * Main function to embed and upload portfolio content to FAISS
 */
async function embedPortfolio() {
  try {
    console.log('Starting portfolio embedding process...');
    console.log(`Processing ${portfolioContent.length} content chunks`);
    
    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existUsing ${llmProvider.provider.toUpperCase()} for embeddings`);
    console.log(`sSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Initialize FAISS index
    const dimension = 1536; // OpenAI ada-002 embedding dimension
    const maxElements = 1000; // Maximum number of vectors
    const index = new HierarchicalNSW('cosine', dimension);
    index.initIndex(maxElements);
    
    console.log('FAISS index initialized');
    
    // Process each content chunk
    const metadata = [];
    for (let i = 0; i < portfolioContent.length; i++) {
      const item = portfolioContent[i];
      console.log(`Processing ${i + 1}/${portfolioContent.length}: ${item.title}`);
      
      // Create embedding
      const embedding = await createEmbedding(item.text);
      
      // Add vector to FAISS index
      index.addPoint(embedding, i);
      
      // Store metadata separately
      metadata.push({
        id: item.id,
        category: item.category,
        title: item.title,
        text: item.text
      });
      
      // Add small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Save FAISS index to disk
    const indexPath = path.join(dataDir, 'faiss_index.dat');
    index.writeIndex(indexPath);
    console.log(`FAISS index saved to ${indexPath}`);
    
    // Save metadata to JSON file
    const metadataPath = path.join(dataDir, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`Metadata saved to ${metadataPath}`);
    
    console.log('Portfolio embedding complete!');
    console.log(`Total vectors created: ${metadata.length}`);
    console.log('Your RAG system is ready to use.');
    
  } catch (error) {
    console.error('Error during embedding process:', error);
    process.exit(1);
  }
}

// Run the script
embedPortfolio();
