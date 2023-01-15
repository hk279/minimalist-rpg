/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // redirects: async () => {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/auth",
  //       permanent: true,
  //     },
  //   ];
  // }
};

module.exports = nextConfig;
