const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const updated = content.replace(/#4F46E5/g, '#111184');
    
    if (content !== updated) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`✓ Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ Error in ${filePath}:`, error.message);
    return false;
  }
}

function walkDir(dir, filePattern) {
  const files = fs.readdirSync(dir);
  let count = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        count += walkDir(filePath, filePattern);
      }
    } else if (filePattern.test(file)) {
      if (replaceInFile(filePath)) {
        count++;
      }
    }
  });
  
  return count;
}

console.log('Replacing #4F46E5 with #111184...\n');
const count = walkDir('.', /\.(tsx?|css)$/);
console.log(`\n✅ Updated ${count} files`);
