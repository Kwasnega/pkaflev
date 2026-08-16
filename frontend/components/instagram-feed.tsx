"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Instagram } from "lucide-react";

// Static grid of product images linking to Instagram
const INSTAGRAM_IMAGES = [
  { src: "/SMimages/pic5.webp", alt: "BLACK BAT" },
  { src: "/SMimages/pic3.webp", alt: "CITY BOY" },
  { src: "/SMimages/pic5.webp", alt: "SM VA" },
  { src: "/SMimages/pic7.webp", alt: "WE GREAT" },
  { src: "/SMimages/pic5.webp", alt: "MIY" },
  { src: "/SMimages/pic4.webp", alt: "SM ESSENTIAL" },
];

export function InstagramFeed() {
  return (
    <section className="relative py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[10px] tracking-[0.6em] uppercase text-white/40 mb-4">Follow Us</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">@pkaf_store</h2>
          <a 
            href="https://www.instagram.com/pkaf_store" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <Instagram size={18} />
            <span>Follow us on Instagram</span>
            <ExternalLink size={14} />
          </a>
        </motion.div>

        {/* Image Grid - Links to Instagram */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {INSTAGRAM_IMAGES.map((image, index) => (
            <motion.a
              key={index}
              href="https://www.instagram.com/pkaf_store"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative aspect-square overflow-hidden bg-white/5 cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.instagram.com/pkaf_store"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            <Instagram size={18} />
            View Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
