
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // This is required to allow the Next.js dev server to accept requests from the
    // Firebase Studio UI.
    allowedDevOrigins: [
      '6000-firebase-studio-1755750596544.cluster-ancjwrkgr5dvux4qug5rbzyc2y.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
