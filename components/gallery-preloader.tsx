"use client";

import { useEffect } from "react";
import { warmGalleryInBackground } from "@/lib/gallery-cache";

const FALLBACK_GALLERY_SEED = [
  {
    id: 1,
    title: "The Opening",
    subtitle: "Chapter I",
    description: "Where it all begins. Clean lines, bold presence.",
    images: [
      { src: "/SMimages/pic1.webp" },
      { src: "/SMimages/pic3.webp" },
    ],
    product: { name: "SM Army MTY", price: "GH₵200" },
    layout: "editorial-right",
  },
  {
    id: 2,
    title: "Dual Nature",
    subtitle: "Light & Shadow",
    description: "Two sides of the same vision.",
    images: [
      { src: "/SMimages/pic5.webp" },
      { src: "/SMimages/pic3.webp" },
    ],
    product: { name: "Contrast Jacket", price: "GH₵85" },
    layout: "split",
  },
  {
    id: 3,
    title: "Urban Flow",
    subtitle: "Movement",
    description: "Streetwear that moves with you.",
    images: [
      { src: "/SMimages/pic6.webp" },
      { src: "/SMimages/pic7.webp" },
      { src: "/SMimages/pic5.webp" },
    ],
    product: { name: "Flow Set", price: "GH₵120" },
    layout: "layered",
  },
];

export function GalleryPreloader() {
  useEffect(() => {
    warmGalleryInBackground(FALLBACK_GALLERY_SEED);
  }, []);

  return null;
}
