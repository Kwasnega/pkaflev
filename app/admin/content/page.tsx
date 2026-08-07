"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Film, Image as ImageIcon, Save, Sparkles, Upload, X } from "lucide-react";
import {
  getDefaultSiteMediaConfig,
  getStoredSiteMediaConfig,
  saveSiteMediaConfig,
  type SiteMediaConfig,
} from "@/lib/homepage-content";

const statusStyles = {
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  error: "border-red-500/30 bg-red-500/10 text-red-300",
};

function UploadInput({
  label,
  accept,
  onChange,
  currentValue,
  previewLabel,
}: {
  label: string;
  accept: string;
  onChange: (file: File) => void;
  currentValue?: string;
  previewLabel: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium uppercase tracking-[0.2em] text-white/50">{label}</label>
      <div className="flex items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10">
          <Upload className="h-4 w-4" />
          <span>Upload</span>
          <input type="file" accept={accept} className="hidden" onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onChange(file);
          }} />
        </label>
        {currentValue ? (
          <span className="truncate text-xs text-white/60">{previewLabel}</span>
        ) : (
          <span className="text-xs text-white/30">No file selected</span>
        )}
      </div>
    </div>
  );
}

export default function ContentManagementPage() {
  const [config, setConfig] = useState<SiteMediaConfig>(() => getStoredSiteMediaConfig());
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setConfig(getStoredSiteMediaConfig());
  }, []);

  const updateHeroImage = (position: 1 | 2, file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setConfig((current) => ({
      ...current,
      heroImages: current.heroImages.map((hero) =>
        hero.position === position ? { ...hero, url: objectUrl } : hero,
      ),
    }));
  };

  const updateHeroVideo = (position: 1 | 2, file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setConfig((current) => ({
      ...current,
      heroImages: current.heroImages.map((hero) =>
        hero.position === position ? { ...hero, videoUrl: objectUrl } : hero,
      ),
    }));
  };

  const updateCollectionImage = (id: string, file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setConfig((current) => ({
      ...current,
      featuredCollections: current.featuredCollections.map((collection) =>
        collection.id === id ? { ...collection, image: objectUrl } : collection,
      ),
    }));
  };

  const updatePartnerHeroImage = (file: File) => {
    setConfig((current) => ({
      ...current,
      partnerHeroImage: URL.createObjectURL(file),
    }));
  };

  const updatePartnerHeroVideo = (file: File) => {
    setConfig((current) => ({
      ...current,
      partnerHeroVideo: URL.createObjectURL(file),
    }));
  };

  const handleSave = () => {
    setSaving(true);
    try {
      saveSiteMediaConfig(config);
      setStatus({ type: "success", text: "Homepage and partner media updates saved locally." });
    } catch (_error) {
      setStatus({ type: "error", text: "Failed to save media settings." });
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    const defaults = getDefaultSiteMediaConfig();
    setConfig(defaults);
    saveSiteMediaConfig(defaults);
    setStatus({ type: "success", text: "Media reset to default assets." });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Management</h1>
          <p className="mt-1 text-sm text-white/50">Update homepage hero media, partner hero media, and category card images.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetToDefaults}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
          >
            Reset defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-slate-200 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {status ? (
        <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${statusStyles[status.type]}`}>
          {status.type === "success" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          {status.text}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Homepage hero sections</h2>
              <p className="text-sm text-white/60">Replace the two homepage hero media blocks.</p>
            </div>
          </div>

          <div className="space-y-5">
            {[1, 2].map((position) => {
              const hero = config.heroImages.find((item) => item.position === position) ?? config.heroImages[0];
              return (
                <div key={position} className="rounded-xl border border-white/10 bg-[#09090b] p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                    <Sparkles className="h-4 w-4" />
                    Hero {position}
                  </div>

                  <div className="relative mb-4 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <div className="relative aspect-[16/9]">
                      {hero?.videoUrl ? (
                        <video src={hero.videoUrl} className="h-full w-full object-cover" muted loop playsInline autoPlay />
                      ) : hero?.url ? (
                        <Image src={hero.url} alt={`Hero ${position}`} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/30">No media selected</div>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <UploadInput
                      label="Image"
                      accept="image/*"
                      onChange={(file) => updateHeroImage(position as 1 | 2, file)}
                      currentValue={hero?.url}
                      previewLabel={hero?.url ? "Image ready" : ""}
                    />
                    <UploadInput
                      label="Video"
                      accept="video/*"
                      onChange={(file) => updateHeroVideo(position as 1 | 2, file)}
                      currentValue={hero?.videoUrl}
                      previewLabel={hero?.videoUrl ? "Video ready" : ""}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <Film className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Partner hero</h2>
                <p className="text-sm text-white/60">Update the hero used on the /partner page.</p>
              </div>
            </div>

            <div className="relative mb-4 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="relative aspect-[16/9]">
                {config.partnerHeroVideo ? (
                  <video src={config.partnerHeroVideo} className="h-full w-full object-cover" muted loop playsInline autoPlay />
                ) : config.partnerHeroImage ? (
                  <Image src={config.partnerHeroImage} alt="Partner hero" fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/30">No media selected</div>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <UploadInput
                label="Image"
                accept="image/*"
                onChange={updatePartnerHeroImage}
                currentValue={config.partnerHeroImage}
                previewLabel={config.partnerHeroImage ? "Partner image ready" : ""}
              />
              <UploadInput
                label="Video"
                accept="video/*"
                onChange={updatePartnerHeroVideo}
                currentValue={config.partnerHeroVideo}
                previewLabel={config.partnerHeroVideo ? "Partner video ready" : ""}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Category cards</h2>
                <p className="text-sm text-white/60">Swap the images used for the three category cards.</p>
              </div>
            </div>

            <div className="grid gap-4">
              {config.featuredCollections.map((collection) => (
                <div key={collection.id} className="rounded-xl border border-white/10 bg-[#09090b] p-3">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-white">{collection.title}</p>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">{collection.position}</span>
                  </div>

                  <div className="relative mb-3 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                    <div className="relative aspect-[3/4]">
                      <Image src={collection.image} alt={collection.title} fill className="object-cover" />
                    </div>
                  </div>

                  <UploadInput
                    label="Card image"
                    accept="image/*"
                    onChange={(file) => updateCollectionImage(collection.id, file)}
                    currentValue={collection.image}
                    previewLabel={collection.image ? "Image ready" : ""}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
