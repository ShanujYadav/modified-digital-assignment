import axios from 'axios';


type Post = {
    id: number;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    link: string;
};

export default async function PostDetail({ params }: { params: { id: string } }) {
    try {
        const res = await axios.get<Post>(
            `https://demo.modifyed.xyz/wp-json/wp/v2/posts/${params.id}`
        );
        const post = res.data;

        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">{post.title.rendered}</h1>
                <p className="text-sm text-gray-500 mb-4">
                    Published on {post.date}
                </p>
                <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
            </div>

        )
    } catch (err) {
        return <div className="text-center text-red-500">Post not found!</div>;
    }
}
