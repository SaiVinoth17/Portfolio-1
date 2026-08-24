import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = __dirname.replace(/\\/g, "/");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    root: projectRoot,
  },
  webpack: (config) => {
    config.resolve.modules = [
      path.resolve(__dirname, "node_modules"),
      "node_modules",
    ];
    return config;
  },
};

export default nextConfig;
