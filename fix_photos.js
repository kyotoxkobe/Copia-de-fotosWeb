const fs = require('fs');
let content = fs.readFileSync('src/data/photos.ts', 'utf8');

// Replace src URLs
content = content.replace(/src: "(.*?\?w=1600)(.*?)"/g, (match, p1, p2, offset, string) => {
  // Find height for this entry
  const block = string.substring(offset, offset + 150);
  const heightMatch = block.match(/height: (\d+)/);
  if (heightMatch) {
    return `src: "${p1}&h=${heightMatch[1]}&fit=crop${p2}"`;
  }
  return match;
});

// Replace thumb URLs
content = content.replace(/thumb: "(.*?\?w=600)(.*?)"/g, (match, p1, p2, offset, string) => {
  const block = string.substring(offset, offset + 150);
  const heightMatch = block.match(/height: (\d+)/);
  if (heightMatch) {
    const thumbHeight = Math.round((parseInt(heightMatch[1]) / 1600) * 600);
    return `thumb: "${p1}&h=${thumbHeight}&fit=crop${p2}"`;
  }
  return match;
});

fs.writeFileSync('src/data/photos.ts', content);
console.log('Fixed photos.ts');
