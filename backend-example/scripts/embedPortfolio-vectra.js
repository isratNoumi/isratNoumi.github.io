/**
 * Create embeddings and build Vectra index
 * 
 * This script:
 * 1. Reads portfolio content (from extracted_content.json or default data)
 * 2. Creates embeddings using your chosen LLM provider
 * 3. Stores vectors in Vectra database
 * 
 * Usage: npm run embed
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { LocalIndex } = require('vectra');
const LLMProvider = require('../llm-config');

// Initialize LLM provider
const llmProvider = new LLMProvider();

// Paths
const DATA_DIR = path.join(__dirname, '..', 'data');
const EXTRACTED_CONTENT_PATH = path.join(DATA_DIR, 'extracted_content.json');
const INDEX_PATH = path.join(DATA_DIR, 'vectra_index');

// Default portfolio content (used if no extracted content exists)
const DEFAULT_CONTENT = [
  {
    text: "I am Israt Moyeen Noumi, a passionate software developer and technology enthusiast. I specialize in full-stack web development and have a strong interest in artificial intelligence and machine learning.",
    source: "About"
  },
  {
    text: "My technical skills include JavaScript, TypeScript, React, Node.js, Python, and various cloud technologies. I am proficient in both frontend and backend development.",
    source: "Skills"
  },
  {
    text: "I have a Bachelor's degree in Computer Science and have completed several certifications in modern web development and cloud computing.",
    source: "Education"
  },
  {
    text: "I have worked on multiple projects including e-commerce platforms, real-time chat applications, and AI-powered tools. My experience spans across different industries and technologies.",
    source: "Experience"
  },
  {
    text: "You can reach me through the contact form on this website, or connect with me on LinkedIn and GitHub. I'm always open to discussing new opportunities and collaborations.",
    source: "Contact"
  }
];

/**
 * Create embeddings and build Vectra index
 */
async function embedPortfolio() {
  try {
    console.log('\n🚀 Starting Vectra Index Creation\n');
    console.log(`📦 LLM Provider: ${process.env.LLM_PROVIDER || 'openai'}`);
    console.log(`📍 Index Path: ${INDEX_PATH}\n`);

    // Create data directory
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log('✅ Created data directory');
    }

    // Load content
    let contentToEmbed;
    if (fs.existsSync(EXTRACTED_CONTENT_PATH)) {
      console.log('📄 Loading extracted content from PDFs/URLs...');
      const extractedData = JSON.parse(fs.readFileSync(EXTRACTED_CONTENT_PATH, 'utf-8'));
      contentToEmbed = extractedData.chunks || DEFAULT_CONTENT;
      console.log(`✅ Loaded ${contentToEmbed.length} chunks from extracted content`);
    } else {
      console.log('⚠️  No extracted content found, using default portfolio content');
      console.log('   To add your own content: run "npm run extract" first');
      contentToEmbed = DEFAULT_CONTENT;
    }

    // Initialize Vectra index
    console.log('\n📊 Initializing Vectra index...');
    
    // Remove existing index if it exists
    if (fs.existsSync(INDEX_PATH)) {
      fs.rmSync(INDEX_PATH, { recursive: true });
      console.log('🗑️  Removed existing index');
    }
    
    // Create new index
    fs.mkdirSync(INDEX_PATH, { recursive: true });
    const index = new LocalIndex(INDEX_PATH);
    await index.createIndex();
    console.log('✅ Vectra index created');

    // Create embeddings and add to index
    console.log('\n🔄 Creating embeddings and adding to index...\n');
    
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < contentToEmbed.length; i++) {
      try {
        const item = contentToEmbed[i];
        const text = item.text || item;
        const source = item.source || 'Portfolio';

        process.stdout.write(`  Processing ${i + 1}/${contentToEmbed.length}: ${source}... `);

        // Create embedding
        const embedding = await llmProvider.createEmbedding(text);

        // Add to Vectra index
        await index.insertItem({
          vector: embedding,
          metadata: {
            text: text,
            source: source,
            index: i
          }
        });

        console.log('✅');
        successCount++;

        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.log(`❌ Failed: ${error.message}`);
        failCount++;
      }
    }

    console.log('\n📊 Embedding Results:');
    console.log(`  ✅ Success: ${successCount}`);
    console.log(`  ❌ Failed: ${failCount}`);
    console.log(`  📈 Total: ${contentToEmbed.length}`);

    console.log('\n✨ Vectra index created successfully!');
    console.log('\n🎯 Next steps:');
    console.log('  1. Start the backend: npm start');
    console.log('  2. Ask your chatbot questions!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the embedding process
embedPortfolio();
