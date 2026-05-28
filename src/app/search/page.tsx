import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function searchArticles(query: string) {
  if (!query.trim()) return [];

  return await prisma.article.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: query } },
        { excerpt: { contains: query } },
        { content: { contains: query } },
      ],
    },
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const articles = await searchArticles(query);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <span className="text-gray-800">Search</span>
      </nav>

      {/* Search Form */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
          Search Articles
        </h1>
        <form action="/search" method="GET" className="flex gap-3">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search for articles..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results */}
      {query && (
        <div className="mb-4">
          <p className="text-gray-600">
            {articles.length} result{articles.length !== 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-gray-900">&quot;{query}&quot;</span>
          </p>
        </div>
      )}

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No results found
          </h2>
          <p className="text-gray-400">
            Try different keywords or browse our categories.
          </p>
        </div>
      ) : null}
    </div>
  );
}
