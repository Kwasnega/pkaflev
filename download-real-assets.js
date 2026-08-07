const fs = require('fs');
const path = require('path');
const https = require('https');
const root = process.cwd();
const assets = [
  { file: '/public/images/caps_merch.png', width: 1200, height: 1200, seed: 'caps_merch' },
  { file: '/public/images/collections/bikes-collection.webp', width: 1200, height: 900, seed: 'bikes_collection' },
  { file: '/public/images/collections/motorbikes-collection.webp', width: 1200, height: 900, seed: 'motorbikes_collection' },
  { file: '/public/images/collections/scooters-collection.webp', width: 1200, height: 900, seed: 'scooters_collection' },
  { file: '/public/images/essentials_left.png', width: 1200, height: 800, seed: 'essentials_left' },
  { file: '/public/images/hero/hero-main.jpg', width: 1600, height: 900, seed: 'hero_main' },
  { file: '/public/images/J4-1.png', width: 1200, height: 1200, seed: 'J4-1' },
  { file: '/public/images/J4-11.jpg', width: 1200, height: 1200, seed: 'J4-11' },
  { file: '/public/images/J4-13.jpg', width: 1200, height: 1200, seed: 'J4-13' },
  { file: '/public/images/J4-3.jpg', width: 1200, height: 1200, seed: 'J4-3' },
  { file: '/public/images/J4-7.jpg', width: 1200, height: 1200, seed: 'J4-7' },
  { file: '/public/images/J4-9.jpg', width: 1200, height: 1200, seed: 'J4-9' },
  { file: '/public/images/LOGO.jpg', width: 1200, height: 600, seed: 'LOGO' },
  { file: '/public/images/look_1_1772585711621.png', width: 1200, height: 1200, seed: 'look_1_1772585711621' },
  { file: '/public/images/look_1_new_1772586185397.png', width: 1200, height: 1200, seed: 'look_1_new_1772586185397' },
  { file: '/public/images/look_2_new_1772586200765.png', width: 1200, height: 1200, seed: 'look_2_new_1772586200765' },
  { file: '/public/images/look_7_new_1772586448482.png', width: 1200, height: 1200, seed: 'look_7_new_1772586448482' },
  { file: '/public/images/products/accessory-1.jpg', width: 1200, height: 1200, seed: 'accessory_1' },
  { file: '/public/images/products/accessory-1a.jpg', width: 1200, height: 1200, seed: 'accessory_1a' },
  { file: '/public/images/products/battery-1.jpg', width: 1200, height: 1200, seed: 'battery_1' },
  { file: '/public/images/products/charger-1.jpg', width: 1200, height: 1200, seed: 'charger_1' },
  { file: '/public/images/products/ebike-1.jpg', width: 1200, height: 1200, seed: 'ebike_1' },
  { file: '/public/images/products/ebike-1a.jpg', width: 1200, height: 1200, seed: 'ebike_1a' },
  { file: '/public/images/products/ebike-2.jpg', width: 1200, height: 1200, seed: 'ebike_2' },
  { file: '/public/images/products/ebike-2a.jpg', width: 1200, height: 1200, seed: 'ebike_2a' },
  { file: '/public/images/products/ebike-3.jpg', width: 1200, height: 1200, seed: 'ebike_3' },
  { file: '/public/images/products/ebike-3a.jpg', width: 1200, height: 1200, seed: 'ebike_3a' },
  { file: '/public/images/products/ebike-4.jpg', width: 1200, height: 1200, seed: 'ebike_4' },
  { file: '/public/images/products/ebike-4a.jpg', width: 1200, height: 1200, seed: 'ebike_4a' },
  { file: '/public/images/products/helmet-1.jpg', width: 1200, height: 1200, seed: 'helmet_1' },
  { file: '/public/images/products/lock-1.jpg', width: 1200, height: 1200, seed: 'lock_1' },
  { file: '/public/images/products/motorbike-1.jpg', width: 1200, height: 1200, seed: 'motorbike_1' },
  { file: '/public/images/products/motorbike-1a.jpg', width: 1200, height: 1200, seed: 'motorbike_1a' },
  { file: '/public/images/products/motorbike-2.jpg', width: 1200, height: 1200, seed: 'motorbike_2' },
  { file: '/public/images/products/motorbike-2a.jpg', width: 1200, height: 1200, seed: 'motorbike_2a' },
  { file: '/public/images/products/motorbike-3.jpg', width: 1200, height: 1200, seed: 'motorbike_3' },
  { file: '/public/images/products/motorbike-3a.jpg', width: 1200, height: 1200, seed: 'motorbike_3a' },
  { file: '/public/images/products/motorbike-4.jpg', width: 1200, height: 1200, seed: 'motorbike_4' },
  { file: '/public/images/products/motorbike-4a.jpg', width: 1200, height: 1200, seed: 'motorbike_4a' },
  { file: '/public/images/products/scooter-1.jpg', width: 1200, height: 1200, seed: 'scooter_1' },
  { file: '/public/images/products/scooter-1a.jpg', width: 1200, height: 1200, seed: 'scooter_1a' },
  { file: '/public/images/products/scooter-2.jpg', width: 1200, height: 1200, seed: 'scooter_2' },
  { file: '/public/images/products/scooter-2a.jpg', width: 1200, height: 1200, seed: 'scooter_2a' },
  { file: '/public/images/products/scooter-3.jpg', width: 1200, height: 1200, seed: 'scooter_3' },
  { file: '/public/images/products/scooter-3a.jpg', width: 1200, height: 1200, seed: 'scooter_3a' },
  { file: '/public/images/products/scooter-4.jpg', width: 1200, height: 1200, seed: 'scooter_4' },
  { file: '/public/images/products/scooter-4a.jpg', width: 1200, height: 1200, seed: 'scooter_4a' },
  { file: '/public/SMimages/aboutpagehero.mp4', url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4' }
];

function getSearchQuery(asset) {
  const file = asset.file.toLowerCase();
  if (file.includes('/products/scooter')) return 'electric scooter';
  if (file.includes('/products/ebike')) return 'electric bike';
  if (file.includes('/products/motorbike')) return 'electric motorbike';
  if (file.includes('/products/accessory')) return 'scooter accessories';
  if (file.includes('/products/helmet')) return 'bike helmet';
  if (file.includes('/products/lock')) return 'bike lock';
  if (file.includes('/products/battery')) return 'electric bike battery';
  if (file.includes('/products/charger')) return 'electric charger';
  if (file.includes('/collections/bikes-collection')) return 'electric bike collection';
  if (file.includes('/collections/motorbikes-collection')) return 'electric motorbike collection';
  if (file.includes('/collections/scooters-collection')) return 'electric scooter collection';
  if (file.includes('/images/hero/hero-main')) return 'electric scooter hero';
  if (file.includes('/images/essentials_left')) return 'urban electric mobility';
  if (file.includes('/images/caps_merch')) return 'electric scooter accessories';
  if (file.includes('/images/j4-')) return 'electric mobility';
  if (file.includes('/images/look_')) return 'electric mobility lifestyle';
  return asset.seed ? asset.seed : 'electric scooter';
}

function download(url, target) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location, target));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${url}: ${res.statusCode}`));
      }
      const dir = path.dirname(target);
      fs.mkdirSync(dir, { recursive: true });
      const file = fs.createWriteStream(target);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
      file.on('error', reject);
    });
    req.on('error', reject);
  });
}

(async () => {
  for (const asset of assets) {
    const target = path.join(root, asset.file);
    let url = asset.url;
    if (!url) {
      const query = encodeURIComponent(getSearchQuery(asset));
      url = `https://source.unsplash.com/${asset.width}x${asset.height}/?${query}`;
    }
    try {
      console.log('Downloading', asset.file, 'from', url);
      await download(url, target);
      const size = fs.statSync(target).size;
      console.log('Saved', asset.file, 'size', size);
    } catch (err) {
      console.error('ERROR', asset.file, err.message);
      process.exitCode = 1;
    }
  }
})();
