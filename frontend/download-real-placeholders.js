const fs = require('fs');
const path = require('path');
const https = require('https');
const root = process.cwd();

const assets = [
  { path: '/public/images/caps_merch.png', width: 1200, height: 1200, label: 'caps_merch', ext: 'png' },
  { path: '/public/images/essentials_left.png', width: 1200, height: 800, label: 'essentials_left', ext: 'png' },
  { path: '/public/images/J4-1.png', width: 1200, height: 1200, label: 'J4-1', ext: 'png' },
  { path: '/public/images/look_1_1772585711621.png', width: 1200, height: 1200, label: 'look_1', ext: 'png' },
  { path: '/public/images/look_1_new_1772586185397.png', width: 1200, height: 1200, label: 'look_1_new', ext: 'png' },
  { path: '/public/images/look_2_new_1772586200765.png', width: 1200, height: 1200, label: 'look_2_new', ext: 'png' },
  { path: '/public/images/look_7_new_1772586448482.png', width: 1200, height: 1200, label: 'look_7_new', ext: 'png' },
  { path: '/public/SMimages/pic2.webp', width: 1200, height: 1200, label: 'pic2', ext: 'webp' },
];

function buildUrls(asset) {
  const seed = encodeURIComponent(asset.label);
  const urls = [];
  if (asset.ext === 'png' || asset.ext === 'jpg') {
    urls.push(`https://via.placeholder.com/${asset.width}x${asset.height}.${asset.ext}?text=${seed}`);
    urls.push(`https://dummyimage.com/${asset.width}x${asset.height}.${asset.ext}/000/fff.${asset.ext}&text=${seed}`);
    urls.push(`https://picsum.photos/seed/${seed}/${asset.width}/${asset.height}.${asset.ext}`);
  } else if (asset.ext === 'webp') {
    urls.push(`https://via.placeholder.com/${asset.width}x${asset.height}.webp?text=${seed}`);
    urls.push(`https://dummyimage.com/${asset.width}x${asset.height}.webp/000/fff.webp&text=${seed}`);
    urls.push(`https://picsum.photos/seed/${seed}/${asset.width}/${asset.height}.webp`);
  }
  return urls;
}

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
    const target = path.join(root, asset.path);
    const urls = buildUrls(asset);
    let ok = false;
    for (const url of urls) {
      try {
        console.log('Trying', url);
        await download(url, target);
        const size = fs.statSync(target).size;
        console.log('Saved', asset.path, size);
        ok = true;
        break;
      } catch (error) {
        console.warn('Failed', url, error.message);
      }
    }
    if (!ok) {
      console.error('All sources failed for', asset.path);
      process.exitCode = 1;
    }
  }
})();
