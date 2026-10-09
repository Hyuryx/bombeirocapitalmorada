/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      '/*': ['./src/components/abas/**/*.html'],
    },
  }
};

export default nextConfig;
