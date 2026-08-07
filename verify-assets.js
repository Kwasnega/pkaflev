const fs = require('fs');
const path = require('path');
const root = process.cwd();
const extRe = /['"`]\/(?:SMimages|images)[^"'`]+['"`]/g;
const exts=['.ts','.tsx','.js','.jsx','.json','.md'];
const refs = [];
function walk(dir){
  for(const name of fs.readdirSync(dir,{withFileTypes:true})){ const full = path.join(dir,name.name);
    if(name.isDirectory()){
      if(['node_modules','.next'].includes(name.name)) continue;
      walk(full);
    } else if(exts.includes(path.extname(name.name))){
      const text = fs.readFileSync(full,'utf8');
      let m;
      while((m=extRe.exec(text))){ refs.push(m[0].slice(1,-1)); }
    }
  }
}
walk(root);
const uniq = Array.from(new Set(refs)).sort();
console.log('refs', uniq.length);
for(const ref of uniq){
  const loc = path.join(root,'public',ref.slice(1));
  if(fs.existsSync(loc)){
    const size = fs.statSync(loc).size;
    console.log('OK', size, ref);
  } else {
    console.log('NO', ref);
  }
}
console.log('---');
const publicFiles=[];
function pubwalk(dir){
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){ const full=path.join(dir,ent.name);
    if(ent.isDirectory()) pubwalk(full);
    else publicFiles.push(path.relative(root,full).replace(/\\/g,'/'));
  }
}
pubwalk(path.join(root,'public'));
publicFiles.sort().forEach(f=>console.log(f));
console.log('public count', publicFiles.length);
