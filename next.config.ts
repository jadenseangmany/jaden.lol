import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/ucsd-ta",
        destination: "/leadership/ucsd-ta",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
