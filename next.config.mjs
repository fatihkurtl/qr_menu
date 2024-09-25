/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.logojoy.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ideacdn.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media.istockphoto.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.lezzet.com.tr',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.pcrm.org',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.eatingwell.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'assets.epicurious.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'assets.tmecosys.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'hips.hearstapps.com',
                port: '',
                pathname: '/**',
            },
        ]
    }
};

export default nextConfig;
