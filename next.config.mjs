/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://raw.githubusercontent.com/CircuitBay/Product_Images/refs/heads/master/product_images/*')],
    },
    // Method 2
    // images: {
    //     domains: ["raw.githubusercontent.com"],
    // },
};


export default nextConfig;
