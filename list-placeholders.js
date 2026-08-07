const fs = require('fs');
const path = require('path');
const root = process.cwd();
const publicDir = path.join(root, 'public');
const out = [];
function walk(dir){
  for(const ent of fs.readdirSync(dir, { withFileTypes: true })){ const full=path.join(dir, ent.name);
    if(ent.isDirectory()) walk(full);
    else {
      const size = fs.statSync(full).size;
      if(size < 5000) out.push({ file: path.relative(root, full).replace(/\\/g,'/'), size });
    }
  }
}
walk(publicDir);
out.sort((a,b)=>a.file.localeCompare(b.file));
out.forEach(item => console.log(`${item.size.toString().padStart(5)} ${item.file}`));
console.log('TOTAL', out.length);
