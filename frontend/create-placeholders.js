const fs = require('fs');
const path = require('path');
const root = process.cwd();
const placeholders = {
  png: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
  jpg: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAQIDBf/EACUQAAICAQMCBQUAAAAAAAAAAAECAwQRAAUSIRMxQSJhcYGRsf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAXEQADAQAAAAAAAAAAAAAAAAABAhEh/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z',
  webp: 'UklGRhIAAABXRUJQVlA4IBYAAAAwAQCdASoEAAQAAVAfJgCdASoCAAIALmkA/wB8AA==',
  mp4: 'AAAAHGZ0eXBpc29tAAACAGlzb21pc28yYXZjMQAAAGF2YzEAAAABAAEAAAAAAABQbW9vAAAAAAABAAEAAAAAAAB0bHNkAAAAAAABAAAAAQAAA21kYXQAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA=',
};
const files = [
  '/SMimages/aboutpagehero.mp4',
  '/SMimages/pic2.webp',
  '/images/J4-1.png',
  '/images/J4-11.jpg',
  '/images/J4-13.jpg',
  '/images/J4-3.jpg',
  '/images/J4-7.jpg',
  '/images/J4-9.jpg',
  '/images/LOGO.jpg',
  '/images/caps_merch.png',
  '/images/collections/bikes-collection.webp',
  '/images/collections/motorbikes-collection.webp',
  '/images/collections/scooters-collection.webp',
  '/images/essentials_left.png',
  '/images/hero/hero-main.jpg',
  '/images/look_1_1772585711621.png',
  '/images/look_1_new_1772586185397.png',
  '/images/look_2_new_1772586200765.png',
  '/images/look_7_new_1772586448482.png',
  '/images/products/accessory-1.jpg',
  '/images/products/accessory-1a.jpg',
  '/images/products/battery-1.jpg',
  '/images/products/charger-1.jpg',
  '/images/products/ebike-1.jpg',
  '/images/products/ebike-1a.jpg',
  '/images/products/ebike-2.jpg',
  '/images/products/ebike-2a.jpg',
  '/images/products/ebike-3.jpg',
  '/images/products/ebike-3a.jpg',
  '/images/products/ebike-4.jpg',
  '/images/products/ebike-4a.jpg',
  '/images/products/helmet-1.jpg',
  '/images/products/lock-1.jpg',
  '/images/products/motorbike-1.jpg',
  '/images/products/motorbike-1a.jpg',
  '/images/products/motorbike-2.jpg',
  '/images/products/motorbike-2a.jpg',
  '/images/products/motorbike-3.jpg',
  '/images/products/motorbike-3a.jpg',
  '/images/products/motorbike-4.jpg',
  '/images/products/motorbike-4a.jpg',
  '/images/products/scooter-1.jpg',
  '/images/products/scooter-1a.jpg',
  '/images/products/scooter-2.jpg',
  '/images/products/scooter-2a.jpg',
  '/images/products/scooter-3.jpg',
  '/images/products/scooter-3a.jpg',
  '/images/products/scooter-4.jpg',
  '/images/products/scooter-4a.jpg',
];
for (const ref of files) {
  const rel = ref.slice(1);
  const targetPath = path.join(root, 'public', rel);
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (fs.existsSync(targetPath)) {
    console.log('skip existing', ref);
    continue;
  }
  let type = 'png';
  if (ref.endsWith('.jpg') || ref.endsWith('.jpeg')) type = 'jpg';
  else if (ref.endsWith('.webp')) type = 'webp';
  else if (ref.endsWith('.mp4')) type = 'mp4';
  const data = Buffer.from(placeholders[type], 'base64');
  fs.writeFileSync(targetPath, data);
  console.log('created', ref, 'size', data.length);
}
