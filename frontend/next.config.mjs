import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "quhlodayqewxrnsscjop.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
