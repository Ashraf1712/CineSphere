/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATA_API_KEY: process.env.DATA_API_KEY,
        API_URL: process.env.API_URL,
        IMAGE_URL: process.env.IMAGE_URL
    },
    images: {
        domains: ['image.tmdb.org'],
    },
};

export default nextConfig;