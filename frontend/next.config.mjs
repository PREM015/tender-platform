const nextConfig = {
  experimental: {
    serverActions: {
      enabled: true
    },
  },
  serverExternalPackages: [],
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
