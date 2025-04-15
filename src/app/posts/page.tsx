"use client"
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Post = {
    id: number;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    link: string;
};

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<HTMLDivElement>(null);

    const fetchPosts = useCallback(async () => {
        try {
            const res = await axios.get(
                `https://demo.modifyed.xyz/wp-json/wp/v2/posts?page=${page}&per_page=5`
            );
            if (res.data.length > 0) {
                setPosts((prev) => [...prev, ...res.data]);
                setHasMore(true);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
            setHasMore(false);
        }
    }, [page]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        const ref = observerRef.current;
        if (ref) observer.observe(ref);

        return () => {
            if (ref) observer.unobserve(ref);
        };
    }, [hasMore]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
            <div className="w-full max-w-2xl mx-auto">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 mb-8"
                    >
                        <div className="p-6 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                                    {post.title.rendered}
                                </h2>
                                <div
                                    className="text-gray-600 text-sm line-clamp-4"
                                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                />
                            </div>
                            <Link
                                href={`/posts/${post.id}`}
                                className="mt-5 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition"
                            >
                                Know More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div ref={observerRef} className="h-10 mt-10 text-center">
                    <span className="text-gray-500">Loading more posts...</span>
                </div>
            )}
        </div>

    );
}