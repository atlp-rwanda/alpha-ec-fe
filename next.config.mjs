const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  }
};

export default nextConfig;
