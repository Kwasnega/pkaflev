const fs = require('fs');
const path = require('path');
const refs = [
'/SMimages/aboutpagehero.mp4','/SMimages/logo1.webp','/SMimages/pic1.webp','/SMimages/pic19.webp','/SMimages/pic2.webp','/SMimages/pic3.webp','/SMimages/pic4.webp','/SMimages/pic5.webp','/SMimages/pic6.webp','/SMimages/pic7.webp','/SMimages/pic9.webp','/SMimages/pkaflevlogo.mp4','/SMimages/productimages/blackbat.webp','/SMimages/productimages/cityboy.webp','/SMimages/productimages/xmeomvbke3hav5xoqnt1.webp','/images/J4-1.png','/images/J4-11.jpg','/images/J4-13.jpg','/images/J4-3.jpg','/images/J4-7.jpg','/images/J4-9.jpg','/images/LOGO.jpg','/images/caps_merch.png','/images/collections/bikes-collection.webp','/images/collections/motorbikes-collection.webp','/images/collections/scooters-collection.webp','/images/essentials_left.png','/images/hero/hero-main.jpg','/images/look_1_1772585711621.png','/images/look_1_new_1772586185397.png','/images/look_2_new_1772586200765.png','/images/look_7_new_1772586448482.png','/images/products/accessory-1.jpg','/images/products/accessory-1a.jpg','/images/products/battery-1.jpg','/images/products/charger-1.jpg','/images/products/ebike-1.jpg','/images/products/ebike-1a.jpg','/images/products/ebike-2.jpg','/images/products/ebike-2a.jpg','/images/products/ebike-3.jpg','/images/products/ebike-3a.jpg','/images/products/ebike-4.jpg','/images/products/ebike-4a.jpg','/images/products/helmet-1.jpg','/images/products/lock-1.jpg','/images/products/motorbike-1.jpg','/images/products/motorbike-1a.jpg','/images/products/motorbike-2.jpg','/images/products/motorbike-2a.jpg','/images/products/motorbike-3.jpg','/images/products/motorbike-3a.jpg','/images/products/motorbike-4.jpg','/images/products/motorbike-4a.jpg','/images/products/scooter-1.jpg','/images/products/scooter-1a.jpg','/images/products/scooter-2.jpg','/images/products/scooter-2a.jpg','/images/products/scooter-3.jpg','/images/products/scooter-3a.jpg','/images/products/scooter-4.jpg','/images/products/scooter-4a.jpg'
];
const root = process.cwd();
const missing = [];
for (const ref of refs) {
  const rel = ref.slice(1);
  const full = path.join(root, 'public', rel);
  if (!fs.existsSync(full)) {
    missing.push(ref);
  }
}
console.log('MISSING COUNT', missing.length);
missing.forEach(x => console.log(x));
