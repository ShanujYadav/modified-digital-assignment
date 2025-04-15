// app/pages/[id]/page.tsx

import { fetchPageById } from '@/utils/api';
import { Metadata } from 'next';

type Page = {
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
};

type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = await fetchPageById(params.id);
    return {
        title: page.title.rendered,
        description: page.excerpt.rendered,
    };
}

export default async function PageDetailPage({ params }: Props) {
    const page = await fetchPageById(params.id);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <header className="mb-10 text-center">
                <h1
                    className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-800"
                    dangerouslySetInnerHTML={{ __html: page.title.rendered }}
                />
                <p className="text-gray-500 text-sm">
                    {new Date(page.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
                <div
                    className="mt-4 text-lg text-gray-700 prose prose-lg prose-blue mx-auto"
                    dangerouslySetInnerHTML={{ __html: page.excerpt.rendered }}
                />
            </header>

            <main
                className="prose prose-lg lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
        </div>
    );
}