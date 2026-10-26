import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow dev assets when the app is opened via a tunnel (ngrok, etc.).
  // Without this, Next returns 403 for /_next/* when Origin is the public URL.
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.ngrok.app",
  ],
  // Artworks uploaded from the admin panel are served from Vercel Blob.
  images: {
    remotePatterns: [new URL("https://*.public.blob.vercel-storage.com/**")],
  },
};

export default nextConfig;
