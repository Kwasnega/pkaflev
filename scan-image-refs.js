const fs = require('fs');
const path = require('path');
const root = process.cwd();
const exts = ['.ts','.tsx','.js','.jsx','.json','.md'];
const dirs = fs.readdirSync(root, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules','.next'].includes(entry.name)) continue;
      walk(full);
    } else if (exts.includes(path.extname(entry.name))) {
      files.push(full);
    }
  }
}
walk(root);
const regex = /['"`]\/((?:SMimages|images)[^"'`]+)['"`]/g;
const refs = new Map();
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = regex.exec(text))) {
    const ref = '/' + m[1];
    refs.set(ref, (refs.get(ref) || 0) + 1);
  }
}
const sorted = [...refs.keys()].sort();
for (const ref of sorted) console.log(ref);
console.log('TOTAL', sorted.length);
