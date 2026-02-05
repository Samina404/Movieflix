import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://movieflix-demo.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://movieflix-demo.vercel.app/movies',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://movieflix-demo.vercel.app/watch-later',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ];
}
