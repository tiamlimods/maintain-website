import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  output: 'export',
  basePath: '/maintain-site', // 替换为你的仓库名称
  assetPrefix: '/maintain-site/', // 替换为你的仓库名称
}
export default nextConfig;
