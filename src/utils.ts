import { loadEnv } from 'vite';

const { GITHUB_PERSONAL_ACCESS_TOKEN } = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

export const slugify = (input: string) => {
    if (!input) return '';

    // make lower case and trim
    var slug = input.toLowerCase().trim();

    // remove accents from charaters
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // replace invalid chars with spaces
    slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();

    // replace multiple spaces or hyphens with a single hyphen
    slug = slug.replace(/[\s-]+/g, '-');

    return slug;
};

export const unslugify = (slug: string) =>
    slug.replace(/\-/g, ' ').replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());

export const kFormatter = (num: number) => {
    return Math.abs(num) > 999 ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + 'k' : Math.sign(num) * Math.abs(num);
};

export const getRepositoryDetails = async (repositoryFullname: string) => {
    try {
        const response = await fetch('https://api.github.com/repos/' + repositoryFullname, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        if (!response.ok) {
            console.error(`GitHub API error: ${response.status} ${response.statusText}`);
            return {};
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch failed:', error);
        return {};
    }
};

export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}
