"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus, Loader2, Check } from "lucide-react";
import { DEFAULT_HERO_IMAGES } from "@/lib/homepage-content";

interface SiteSettings {
  id: string;
  heroImage1: string;
  heroImage2: string;
  updatedAt: string;
}

export function HeroImagesManager() {
  const [settings, setSettings] = useState<SiteSettings | null>({
    id: "homepage",
    heroImage1: DEFAULT_HERO_IMAGES[0]?.url || "",
    heroImage2: DEFAULT_HERO_IMAGES[1]?.url || "",
    updatedAt: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);
  const [uploading1, setUploading1] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, imageNum: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSettings((prev) => prev ? {
        ...prev,
        ...(imageNum === 1 ? { heroImage1: previewUrl } : { heroImage2: previewUrl }),
      } : prev);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      if (imageNum === 1) {
        setUploading1(true);
        setTimeout(() => setUploading1(false), 800);
      } else {
        setUploading2(true);
        setTimeout(() => setUploading2(false), 800);
      }
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Homepage Hero Images</h3>
          <p className="text-sm text-white/50 mt-1">Update the two hero images on the homepage</p>
        </div>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-green-400 text-sm"
          >
            <Check className="w-4 h-4" />
            <span>Saved!</span>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hero Image 1 */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10">
            {settings?.heroImage1 ? (
              <img
                src={settings.heroImage1}
                alt="Hero Image 1"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white/30">
                <ImagePlus className="w-12 h-12" />
              </div>
            )}
            {uploading1 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
          <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-colors">
            <ImagePlus className="w-4 h-4" />
            <span className="text-sm">{uploading1 ? "Uploading..." : "Change Image 1"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, 1)}
              disabled={uploading1}
            />
          </label>
        </div>

        {/* Hero Image 2 */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10">
            {settings?.heroImage2 ? (
              <img
                src={settings.heroImage2}
                alt="Hero Image 2"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white/30">
                <ImagePlus className="w-12 h-12" />
              </div>
            )}
            {uploading2 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
          <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-colors">
            <ImagePlus className="w-4 h-4" />
            <span className="text-sm">{uploading2 ? "Uploading..." : "Change Image 2"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, 2)}
              disabled={uploading2}
            />
          </label>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-xs text-white/50">
          <strong className="text-white/70">Recommended:</strong> Use images with aspect ratio 4:3 or 16:9. 
          Maximum file size 5MB. Supported formats: JPG, PNG, WebP.
        </p>
      </div>
    </motion.div>
  );
}
