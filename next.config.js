/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 忽略构建时的 TypeScript 错误
    ignoreBuildErrors: true,
  },
  // 如果你有其他配置，保留它们
};

module.exports = nextConfig;