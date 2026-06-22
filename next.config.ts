import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Üst dizindeki diğer lockfile'lar nedeniyle yanlış workspace root seçilmesini önler.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
