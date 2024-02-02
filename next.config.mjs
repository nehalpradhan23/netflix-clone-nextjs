/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["image.tmdb.org"],
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
