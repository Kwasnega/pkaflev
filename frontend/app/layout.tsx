import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/components/cart-provider";
import { ProductProvider } from "@/components/product-provider";
import { WishlistProvider } from "@/components/wishlist-provider";
import { HeaderWrapper } from "@/components/header-wrapper";
import { FooterWrapper } from "@/components/footer-wrapper";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "PKAF STORE | Premium Multi-Category Store",
    template: "%s | PKAF STORE",
  },
  description: "Discover premium products at PKAF STORE. Shop the latest in fashion, gear, accessories, and more. POWER YOUR EVERYDAY.",
  keywords: [
    "PKAF STORE",
    "streetwear",
    "urban fashion",
    "premium clothing",
    "mens fashion",
    "womens fashion",
    "jackets",
    "bombers",
    "puffer jackets",
    "Ghana fashion",
    "African streetwear",
  ],
  authors: [{ name: "PKAF STORE" }],
  creator: "PKAF STORE",
  publisher: "PKAF STORE",
  metadataBase: new URL("https://pkafstore.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PKAF STORE | Premium Multi-Category Store",
    description: "Discover premium products at PKAF STORE. Shop the latest in fashion, gear, accessories, and more. POWER YOUR EVERYDAY.",
    url: "https://pkafstore.com",
    siteName: "PKAF STORE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PKAF STORE - Premium Multi-Category Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PKAF STORE | Premium Multi-Category Store",
    description: "Discover premium products at PKAF STORE. Shop the latest in fashion, gear, accessories, and more. POWER YOUR EVERYDAY.",
    images: ["/og-image.jpg"],
    creator: "@pkafstore",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "fashion",
};

import { SmoothScroll } from "@/components/smooth-scroll";
import { SmoothPageTransition } from "@/components/smooth-page-transition";
import { AppWrapper } from "@/components/app-wrapper";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { GalleryPreloader } from "@/components/gallery-preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-geist-sans: 'Geist', sans-serif;
            --font-geist-mono: 'Geist Mono', monospace;
          }
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <ProductProvider>
            <WishlistProvider>
              <CartProvider>
                <SmoothScroll>
                  <AnalyticsTracker />
                  <GalleryPreloader />
                  <AppWrapper>
                    <HeaderWrapper />
                    <SmoothPageTransition>
                      {children}
                    </SmoothPageTransition>
                    <FooterWrapper />
                  </AppWrapper>
                </SmoothScroll>
              </CartProvider>
            </WishlistProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
