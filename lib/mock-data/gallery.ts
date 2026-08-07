export interface GalleryImage {
  src: string;
  alt?: string;
}

export interface GallerySpread {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  images: GalleryImage[];
  layout?: string;
  product: { name: string; price: string };
}

export const DEFAULT_GALLERY_SPREADS: GallerySpread[] = [
  {
    id: 1,
    title: "The Opening",
    subtitle: "Chapter I",
    description: "Where it all begins.",
    images: [
      { src: "/SMimages/pic1.webp", alt: "Opening 1" },
      { src: "/SMimages/pic2.webp", alt: "Opening 2" }
    ],
    product: { name: "Volt X1 Electric Scooter", price: "GH₵4,850" },
    layout: "editorial-right"
  },
  {
    id: 2,
    title: "Urban Motion",
    subtitle: "Chapter II",
    description: "Riding through the city.",
    images: [
      { src: "/SMimages/pic3.webp", alt: "Urban 1" },
      { src: "/SMimages/pic4.webp", alt: "Urban 2" }
    ],
    product: { name: "Ranger Pro E-Bike", price: "GH₵9,800" },
    layout: "grid"
  }
];

export default DEFAULT_GALLERY_SPREADS;
