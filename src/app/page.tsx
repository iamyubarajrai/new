import ArticleCard from "@/components/ArticleCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getFeaturedArticles() {
  return await prisma.article.findMany({
    where: { published: true, featured: true },
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

async function getLatestArticles() {
  return await prisma.article.findMany({
    where: { published: true },
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

async function getPopularArticles() {
  return await prisma.article.findMany({
    where: { published: true },
    include: { category: true, author: true },
    orderBy: { views: "desc" },
    take: 5,
  });
}

async function getCategories() {
  return await prisma.category.findMany({
    include: { _count: { select: { articles: true } } },
    orderBy: { name: "asc" },
  });
}

export default async function HomePage() {
  const [featured, latest, popular, categories] = await Promise.all([
    getFeaturedArticles(),
    getLatestArticles(),
    getPopularArticles(),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breaking News Ticker */}
      <div className="bg-accent-600 text-white px-4 py-2 rounded-lg mb-8 flex items-center gap-3 overflow-hidden">
        <span className="font-bold text-sm whitespace-nowrap bg-white text-accent-600 px-3 py-0.5 rounded">
          BREAKING
        </span>
        <div className="overflow-hidden">
          <p className="text-sm whitespace-nowrap animate-marquee">
            {featured[0]?.title || "Stay tuned for the latest news updates"}
          </p>
        </div>
      </div>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ArticleCard article={featured[0]} featured />
            </div>
            <div className="flex flex-col gap-6">
              {featured.slice(1, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Articles */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-gray-900">
              Latest News
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-primary-600 to-transparent ml-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Popular Articles */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-heading font-bold text-gray-900 mb-4 pb-2 border-b-2 border-accent-500">
              Most Popular
            </h3>
            <div className="space-y-4">
              {popular.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="flex gap-3 group"
                >
                  <span className="text-3xl font-bold text-gray-200 group-hover:text-primary-400 transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {article.views.toLocaleString()} views
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-heading font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {category._count.articles}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
