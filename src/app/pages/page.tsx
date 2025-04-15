import Link from 'next/link';
import { fetchPages } from '@/utils/api';

type Page = {
  id: number;
  title: { rendered: string };
};

export default async function PagesList() {
  const pages: Page[] = await fetchPages();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          Website Pages
        </h1>

        <div className="space-y-4">
          {pages.map((page) => (
            <Link href={`/pages/${page.id}`} key={page.id}>
              <div className="bg-white rounded-lg shadow-md p-6 m-4 transition-all hover:shadow-lg hover:scale-[1.01] hover:border hover:border-blue-500 cursor-pointer">
                <h2 className="text-2xl text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  {page.title.rendered}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
