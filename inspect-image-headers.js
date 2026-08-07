const fs = require('fs');
const path = require('path');
const files = [
  'public/images/caps_merch.png',
  'public/images/essentials_left.png',
  'public/images/J4-1.png',
  'public/images/look_1_1772585711621.png',
  'public/images/look_1_new_1772586185397.png',
  'public/images/look_2_new_1772586200765.png',
  'public/images/look_7_new_1772586448482.png',
  'public/SMimages/pic2.webp'
];
for (const rel of files) {
  const full = path.join(process.cwd(), rel);
  try {
    const buf = fs.readFileSync(full);
    const sig = buf.slice(0, 16).toString('hex');
    console.log(rel, buf.length, sig, buf.slice(0, 16));
  } catch (err) {
    console.log(rel, 'ERROR', err.message);
  }
}
