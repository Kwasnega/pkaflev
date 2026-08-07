const fs = require('fs');
const https = require('https');
const path = require('path');
const root = process.cwd();
const assets = [
  { dst: '/public/images/caps_merch.png', url: 'https://dummyimage.com/1200x1200.png/000/fff.png&text=CAPS+MERCH' },
  { dst: '/public/images/essentials_left.png', url: 'https://dummyimage.com/1200x800.png/000/fff.png&text=ESSENTIALS+LEFT' },
  { dst: '/public/images/J4-1.png', url: 'https://dummyimage.com/1200x1200.png/000/fff.png&text=J4-1' },
  { dst: '/public/images/look_1_1772585711621.png', url: 'https://dummyimage.com/1200x1200.png/000/fff.png&text=LOOK+1' },
  { dst: '/public/images/look_1_new_1772586185397.png', url: 'https://dummyimage.com/1200x1200.png/000/fff.png&text=LOOK+1+NEW' },
  { dst: '/public/images/look_2_new_1772586200765.png', url: 'https://dummyimage.com/1200x1200.png/000/fff.png&text=LOOK+2+NEW' },
  { dst: '/public/images/look_7_new_1772586448482.png', url: 'https://dummyimage.com/1200x1200.png/000/fff.png&text=LOOK+7+NEW' },
  { dst: '/public/SMimages/pic2.webp', url: 'https://dummyimage.com/1200x1200.webp/000/fff.webp&text=PIC2' },
];

function download(url, target) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location, target));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const dir = path.dirname(target);
      fs.mkdirSync(dir, { recursive: true });
      const file = fs.createWriteStream(target);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  for (const asset of assets) {
    const target = path.join(root, asset.dst);
    console.log('Downloading', asset.dst);
    try {
      await download(asset.url, target);
      const size = fs.statSync(target).size;
      console.log('Saved', asset.dst, size);
    } catch (err) {
      console.error('FAILED', asset.dst, err.message);
      process.exitCode = 1;
    }
  }
})();
