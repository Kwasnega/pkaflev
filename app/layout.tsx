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
    default: "PKAF LEV | Premium LEV Experiences",
    template: "%s | PKAF LEV",
  },
  description: "Discover premium LEV experiences at PKAF LEV. Shop electric mobility, range-boosting gear, and partner solutions. WE WEAR THE FUTURE.",
  keywords: [
    "PKAF LEV",
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
  authors: [{ name: "PKAF LEV" }],
  creator: "PKAF LEV",
  publisher: "PKAF LEV",
  metadataBase: new URL("https://pkaflev.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PKAF LEV | Premium LEV Experiences",
    description: "Discover premium LEV experiences. Shop electric mobility, range-boosting gear, and partner solutions. WE WEAR THE FUTURE.",
    url: "https://pkaflev.com",
    siteName: "PKAF LEV",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PKAF LEV - Premium LEV Experiences",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PKAF LEV | Premium LEV Experiences",
    description: "Discover premium LEV experiences. Shop electric mobility, range-boosting gear, and partner solutions. WE WEAR THE FUTURE.",
    images: ["/og-image.jpg"],
    creator: "@pkaflev",
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
