/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./src/components/abas/**/*.html'],
  },
};

export default nextConfig;
