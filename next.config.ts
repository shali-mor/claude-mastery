import type { NextConfig } from "next";

const ContentSecurityPolicy = [
  "default-src 'self'",
  // Next.js requires unsafe-inline + unsafe-eval for dev; locked down in prod
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://clerk.com",
  "style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev",
  "img-src 'self' data: blob: https://img.clerk.com https://images.clerk.dev https://*.clerk.accounts.dev",
  "font-src 'self' data: https://*.clerk.accounts.dev",
  // Allow Anthropic API calls + Clerk auth endpoints
  "connect-src 'self' https://api.anthropic.com https://clerk.com https://*.clerk.accounts.dev https://api.clerk.com wss://*.clerk.accounts.dev",
  "worker-src blob:",
  "frame-src https://accounts.google.com https://clerk.com https://*.clerk.accounts.dev",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
