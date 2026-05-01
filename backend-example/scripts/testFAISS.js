/**
 * Script to test FAISS connection and query
 * 
 * Run: node scripts/testFAISS.js
 */

require('dotenv').config();
const { HierarchicalNSW } = require('hnswlib-node');
const LLMProvider = require('../llm-config');
const fs = require('fs');
const path = require('path');

const llmProvider = new LLMProvider();

async function testFAISS() {
  try {
    console.log('Testing FAISS index...');
    console.log(`Using ${llmProvider.provider.toUpperCase()} for embeddings`);
    
    // Load FAISS index
    const indexPath = path.join(__dirname, '..', 'data', 'faiss_index.dat');
    const metadataPath = path.join(__dirname, '..', 'data', 'metadata.json');
    
    if (!fs.existsSync(indexPath) || !fs.existsSync(metadataPath)) {
      console.error('FAISS index not found. Please run: npm run embed');
      process.exit(1);
    }
    
    const index = new HierarchicalNSW('cosine', 1536);
    index.readIndex(indexPath);
    
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    
    console.log(`Loaded FAISS index with ${metadata.length} vectors`);
    
    // Test query
    const testQuery = "What are Israt's skills?";
    console.log(`\nTest query: "${testQuery}"`);
    
    // Create embedding for query
    const queryEmbedding = await llmProvider.createEmbedding(testQuery);
    
    // Search FAISS
    const k = 3;
    const result = index.searchKnn(queryEmbedding, k);
    
    console.log('\nTop 3 results:');
    result.neighbors.forEach((idx, i) => {
      const distance = result.distances[i];
      const item = metadata[idx];
      console.log(`\n${i + 1}. Distance: ${distance.toFixed(4)} (lower is better)`);
      console.log(`   Title: ${item.title}`);
      console.log(`   Category: ${item.category}`);
      console.log(`   Text: ${item.text.substring(0, 100)}...`);
    });
    
    console.log('\nFAISS test successful!');
    
  } catch (error) {
    console.error('FAISS test failed:', error);
    process.exit(1);
  }
}

testFAISS();
