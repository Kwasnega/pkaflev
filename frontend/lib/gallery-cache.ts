type GallerySpread = {
  id: number | string;
  title: string;
  subtitle: string;
  description: string;
  images: { src: string; position?: string; size?: string }[];
  product: { name: string; price: string };
  layout: string;
};

declare global {
  interface Window {
    __SMGalleryPreloadedImages?: Set<string>;
  }
}

const getImageSources = (spreads: GallerySpread[]) => {
  return Array.from(new Set(spreads.flatMap((spread) => Array.isArray(spread.images) ? spread.images.map((image) => image.src).filter(Boolean) : [])));
};

export const preloadGalleryAssets = (spreads: GallerySpread[], limit = 18) => {
  if (typeof window === "undefined") return;

  if (!window.__SMGalleryPreloadedImages) {
    window.__SMGalleryPreloadedImages = new Set<string>();
  }

  getImageSources(spreads).slice(0, limit).forEach((src) => {
    if (window.__SMGalleryPreloadedImages?.has(src)) return;
    window.__SMGalleryPreloadedImages?.add(src);

    const img = new window.Image();
    img.decoding = "async";
    img.loading = "eager";
    img.src = src;
  });
};

export const getCachedGallerySpreads = async (fallback: GallerySpread[]) => {
  if (typeof window === "undefined") return fallback;
  preloadGalleryAssets(fallback, 24);
  return fallback;
};

export const warmGalleryInBackground = (fallback: GallerySpread[]) => {
  if (typeof window === "undefined") return;

  const run = () => {
    preloadGalleryAssets(fallback, 24);
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 2500 });
  } else {
    globalThis.setTimeout(run, 1200);
  }
};
