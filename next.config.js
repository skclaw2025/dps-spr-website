/** @type {import('next').NextConfig} */
module.exports = {
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          { key: "Accept-Ranges", value: "bytes" },
          { key: "Cache-Control", value: "public, max-age=31536000" },
        ],
      },
    ];
  },
};
