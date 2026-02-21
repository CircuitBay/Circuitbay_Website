/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            new URL('https://cdn.circuitbay.org/*'),
        ],
    },
};


export default nextConfig;
