import { prisma } from "@/lib/prisma";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getCategory(slug: string) {
  return await prisma.category.findUnique({
    where: { slug },
  });
}

async function getArticles(categoryId: string) {
  return await prisma.article.findMany({
    where: { published: true, categoryId },
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} News - NewsPortal`,
    description: `Browse the latest ${category.name} news and articles on NewsPortal.`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);

  if (!category) {
    notFound();
  }

  const articles = await getArticles(category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <span className="text-gray-800">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <h1 className="text-3xl font-heading font-bold text-gray-900">
            {category.name}
          </h1>
        </div>
        <p className="text-gray-500">
          {articles.length} article{articles.length !== 1 ? "s" : ""} in this category
        </p>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
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
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No articles yet
          </h2>
          <p className="text-gray-400">
            Check back later for new articles in this category.
          </p>
        </div>
      )}
    </div>
  );
}
