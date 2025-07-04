/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'quhlodayqewxrnsscjop.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
