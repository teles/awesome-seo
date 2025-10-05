const fs = require('fs');

// Read README.md
const readmeContent = fs.readFileSync('README.md', 'utf8');

// Parse the README content
const tools = [];
const lines = readmeContent.split('\n');
let currentCategory = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Check for category headers (## **Category Name**)
  if (line.startsWith('## **') && line.endsWith('**')) {
    currentCategory = line.replace(/^## \*\*/, '').replace(/\*\*$/, '');
    continue;
  }
  
  // Check for tool entries (- [Tool Name](url) - Description)
  const toolMatch = line.match(/^- \[([^\]]+)\]\(([^)]+)\) - (.+)$/);
  if (toolMatch && currentCategory && !currentCategory.includes('Articles')) {
    const [, name, url, description] = toolMatch;
    
    tools.push({
      name: name.trim(),
      url: url.trim(),
      description: description.trim(),
      category: currentCategory.trim()
    });
  }
}

// Create the JSON structure
const awesomeData = {
  title: 'Awesome SEO',
  description: 'A curated list of SEO tools',
  lastUpdated: new Date().toISOString(),
  totalTools: tools.length,
  categories: [...new Set(tools.map(tool => tool.category))].sort(),
  tools: tools.sort((a, b) => a.name.localeCompare(b.name))
};

// Write to docs/awesome.json
fs.writeFileSync('docs/awesome.json', JSON.stringify(awesomeData, null, 2));

console.log(`Generated awesome.json with ${tools.length} tools in ${awesomeData.categories.length} categories`);
console.log('Categories found:', awesomeData.categories);
