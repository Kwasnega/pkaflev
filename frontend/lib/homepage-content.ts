export interface HeroImage {
  id: string;
  url: string;
  position: 1 | 2;
  videoUrl?: string;
}

export interface FeaturedCollection {
  id: string;
  title: string;
  image: string;
  link: string;
  position: "left" | "center" | "right";
}

export interface SiteMediaConfig {
  heroImages: HeroImage[];
  featuredCollections: FeaturedCollection[];
  partnerHeroImage: string;
  partnerHeroVideo?: string;
}

const REPLACEMENT_HERO_IMAGE = "/purescooter.jpg";
const LEGACY_HERO_IMAGE = "/SMimages/pic5.webp";

export const DEFAULT_HERO_IMAGES: HeroImage[] = [
  {
    id: "hero1",
    url: "/SMimages/pic4.webp",
    position: 1,
    videoUrl: "/herovideo.mp4",
  },
  {
    id: "hero2",
    url: REPLACEMENT_HERO_IMAGE,
    position: 2,
    videoUrl: "",
  },
];

export const DEFAULT_FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    id: "scooters",
    title: "Electric Scooters",
    image: "/images/collections/scooters-collection.webp",
    link: "/shop?category=SCOOTERS",
    position: "left",
  },
  {
    id: "bikes",
    title: "Electric Bikes",
    image: "/images/collections/bikes-collection.webp",
    link: "/shop?category=BIKES",
    position: "center",
  },
  {
    id: "motorbikes",
    title: "Motorbikes",
    image: "/images/collections/motorbikes-collection.webp",
    link: "/shop?category=MOTORBIKES",
    position: "right",
  },
];

const SITE_MEDIA_STORAGE_KEY = "pkaf_site_media_config";

export const getDefaultSiteMediaConfig = (): SiteMediaConfig => ({
  heroImages: DEFAULT_HERO_IMAGES,
  featuredCollections: DEFAULT_FEATURED_COLLECTIONS,
  partnerHeroImage: REPLACEMENT_HERO_IMAGE,
  partnerHeroVideo: "",
});

export function getStoredSiteMediaConfig(): SiteMediaConfig {
  if (typeof window === "undefined") return getDefaultSiteMediaConfig();

  try {
    const saved = window.localStorage.getItem(SITE_MEDIA_STORAGE_KEY);
    if (!saved) return getDefaultSiteMediaConfig();

    const parsed = JSON.parse(saved) as Partial<SiteMediaConfig>;
    const defaultConfig = getDefaultSiteMediaConfig();

    const heroImages = parsed.heroImages?.length ? parsed.heroImages : defaultConfig.heroImages;

    return {
      heroImages: heroImages.map((hero) =>
        hero.position === 2 && hero.url === LEGACY_HERO_IMAGE
          ? { ...hero, url: REPLACEMENT_HERO_IMAGE }
          : hero
      ),
      featuredCollections: parsed.featuredCollections?.length ? parsed.featuredCollections : defaultConfig.featuredCollections,
      partnerHeroImage:
        parsed.partnerHeroImage === LEGACY_HERO_IMAGE
          ? REPLACEMENT_HERO_IMAGE
          : parsed.partnerHeroImage || defaultConfig.partnerHeroImage,
      partnerHeroVideo: parsed.partnerHeroVideo || "",
    };
  } catch {
    return getDefaultSiteMediaConfig();
  }
}

export function saveSiteMediaConfig(config: SiteMediaConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SITE_MEDIA_STORAGE_KEY, JSON.stringify(config));
}

export const getHomepageHeroImages = () => getStoredSiteMediaConfig().heroImages;
export const getFeaturedCollections = () => getStoredSiteMediaConfig().featuredCollections;
export const getPartnerHeroMedia = () => {
  const config = getStoredSiteMediaConfig();
  return { imageSrc: config.partnerHeroImage, videoSrc: config.partnerHeroVideo || "" };
};
