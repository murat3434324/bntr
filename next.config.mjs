/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['letsquirt.com', 'ipify.org']
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          ]
        }
      ];
    }
  };
  
  export default nextConfig;