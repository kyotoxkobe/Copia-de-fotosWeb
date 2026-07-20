import fs from 'fs';

let content = fs.readFileSync('src/data/photos.ts', 'utf8');

// We have 12 photos currently in an array. Let's extract the array contents.
const match = content.match(/export const photos: Photo\[\] = \[([\s\S]*?)\];/);
if (match) {
  const inner = match[1].trim();
  // split into objects roughly
  const items = inner.split(/},\s*{/g).map(str => {
    str = str.trim();
    if (!str.startsWith('{')) str = '{' + str;
    if (!str.endsWith('}')) str = str + '}';
    return str;
  });
  
  // We have 12 items. We need 30.
  let newItems = [...items];
  while (newItems.length < 30) {
    newItems.push(items[newItems.length % items.length]);
  }
  
  const newInner = newItems.join(',\n  ');
  const newContent = content.replace(match[1], '\n  ' + newInner + ',\n');
  
  fs.writeFileSync('src/data/photos.ts', newContent);
  console.log('Expanded photos to 30');
} else {
  console.log('Could not find photos array');
}
