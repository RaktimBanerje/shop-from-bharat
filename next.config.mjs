/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Ensures the app runs in strict mode
  images: {
    domains: ['ec2-3-107-13-124.ap-southeast-2.compute.amazonaws.com'],
  }
};

export default nextConfig;
