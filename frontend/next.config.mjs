/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    // 👇 this disables the spinning "N"
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
