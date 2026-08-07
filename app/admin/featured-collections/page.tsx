"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  Image as ImageIcon, 
  Save, 
  Sparkles,
  Loader2,
  Check,
  X
} from "lucide-react";
import Image from "next/image";
import { DEFAULT_FEATURED_COLLECTIONS, DEFAULT_HERO_IMAGES } from "@/lib/homepage-content";

interface FeaturedCollection {
  id: string;
  title: string;
  image: string;
  link: string;
  position: "left" | "center" | "right";
}

interface HeroImage {
  id: string;
  url: string;
  position: 1 | 2;
}

export default function SiteSettingsPage() {
  const [collections, setCollections] = useState<FeaturedCollection[]>(DEFAULT_FEATURED_COLLECTIONS);
  const [heroImages, setHeroImages] = useState<HeroImage[]>(DEFAULT_HERO_IMAGES);
  const [activeTab, setActiveTab] = useState<"hero" | "collections">("hero");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    setCollections(DEFAULT_FEATURED_COLLECTIONS);
    setHeroImages(DEFAULT_HERO_IMAGES);
    setLoading(false);
  }, []);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(id);

    try {
      const url = URL.createObjectURL(file);
      setCollections((prev) =>
        prev.map((col) =>
          col.id === id ? { ...col, image: url } : col
        )
      );

      setMessage({ type: "success", text: "Image uploaded successfully!" });
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({ type: "error", text: "Failed to upload image" });
    } finally {
      setUploading(null);
    }
  };

  const handleHeroImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(id);

    try {
      const url = URL.createObjectURL(file);
      setHeroImages((prev) =>
        prev.map((hero) =>
          hero.id === id ? { ...hero, url } : hero
        )
      );

      setMessage({ type: "success", text: "Hero image uploaded successfully!" });
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({ type: "error", text: "Failed to upload hero image" });
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      setMessage({ type: "success", text: "Homepage content is now local-only and updated in memory." });
    } catch (error) {
      console.error("Save error:", error);
      setMessage({ type: "error", text: "Failed to save changes" });
    } finally {
      setSaving(false);
    }
  };

  const updateCollection = (id: string, field: keyof FeaturedCollection, value: string) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === id ? { ...col, [field]: value } : col
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-white/60 mt-1">
            Manage hero images and featured collections on the homepage
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          Save Changes
        </button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl ${
            message.type === "success"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {message.type === "success" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          {message.text}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10">
        <button
          onClick={() => setActiveTab("hero")}
          className={`pb-3 px-4 text-sm font-medium transition-colors ${
            activeTab === "hero"
              ? "text-white border-b-2 border-white"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          Hero Images
        </button>
        <button
          onClick={() => setActiveTab("collections")}
          className={`pb-3 px-4 text-sm font-medium transition-colors ${
            activeTab === "collections"
              ? "text-white border-b-2 border-white"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          Featured Collections
        </button>
      </div>

      {/* Hero Images Tab */}
      {activeTab === "hero" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {heroImages.map((hero) => (
            <motion.div
              key={hero.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Hero Image {hero.position}
                  </h3>
                  <p className="text-sm text-white/50">Displayed in hero slider</p>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Hero Image</label>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-white/5 border-2 border-dashed border-white/20 hover:border-white/40 transition-colors group">
                  {hero.url ? (
                    <>
                      <Image
                        src={hero.url}
                        alt={`Hero ${hero.position}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer flex flex-col items-center gap-2">
                          <Upload className="w-8 h-8 text-white" />
                          <span className="text-white text-sm">Change Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleHeroImageUpload(e, hero.id)}
                            disabled={uploading === hero.id}
                          />
                        </label>
                      </div>
                      {uploading === hero.id && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                      )}
                    </>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/5 transition-colors">
                      <Upload className="w-10 h-10 text-white/40" />
                      <span className="text-white/60 text-sm">Upload Hero Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleHeroImageUpload(e, hero.id)}
                        disabled={uploading === hero.id}
                      />
                    </label>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Featured Collections Tab */}
      {activeTab === "collections" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {collection.position === "left" ? "Left Card" : "Right Card"}
                  </h3>
                  <p className="text-sm text-white/50">Featured on homepage</p>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Card Image</label>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 border-2 border-dashed border-white/20 hover:border-white/40 transition-colors group">
                  {collection.image ? (
                    <>
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer flex flex-col items-center gap-2">
                          <Upload className="w-8 h-8 text-white" />
                          <span className="text-white text-sm">Change Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, collection.id)}
                            disabled={uploading === collection.id}
                          />
                        </label>
                      </div>
                      {uploading === collection.id && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                      )}
                    </>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/5 transition-colors">
                      <Upload className="w-10 h-10 text-white/40" />
                      <span className="text-white/60 text-sm">Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, collection.id)}
                        disabled={uploading === collection.id}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Title Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Card Title</label>
                <input
                  type="text"
                  value={collection.title}
                  onChange={(e) => updateCollection(collection.id, "title", e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  placeholder="Enter card title"
                />
              </div>

              {/* Link Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Link</label>
                <input
                  type="text"
                  value={collection.link}
                  onChange={(e) => updateCollection(collection.id, "link", e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  placeholder="Enter link URL"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Preview Section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
        <div className="grid grid-cols-2 gap-4">
          {collections.map((collection) => (
            <div key={collection.id} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-semibold text-sm">{collection.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
