/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        removeConsole: false,
    },
    images: {
        domains: ['res.cloudinary.com'], // Cloudinary domain
    },
};

export default nextConfig;
