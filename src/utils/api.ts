export const WORDPRESS_API_URL = 'https://demo.modifyed.xyz/wp-json/wp/v2';

export const fetchPosts = async () => {
    const res = await fetch(`${WORDPRESS_API_URL}/posts`);
    return res.json();
};

export const fetchPages = async () => {
    const res = await fetch(`${WORDPRESS_API_URL}/pages`);
    return res.json();
};

export const fetchPostById = async (id: string) => {
    const res = await fetch(`${WORDPRESS_API_URL}/posts/${id}`);
    return res.json();
};

export const fetchPageById = async (id: string) => {
    const res = await fetch(`${WORDPRESS_API_URL}/pages/${id}`);
    return res.json();
}