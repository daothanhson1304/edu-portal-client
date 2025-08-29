/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@edu/ui'],
  env: {
    CONTACT_FROM: process.env.CONTACT_FROM,
    CONTACT_TO: process.env.CONTACT_TO,
    APP_BASE_URL: process.env.APP_BASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
