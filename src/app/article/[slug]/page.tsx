import { prisma } from "@/lib/prisma";
import { formatDate, getReadingTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

async function getArticle(slug: string) {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { category: true, author: true },
  });

  if (article) {
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    });
  }

  return article;
}

async function getRelatedArticles(categoryId: string, currentId: string) {
  return await prisma.article.findMany({
    where: {
      published: true,
      categoryId,
      id: { not: currentId },
    },
    include: { category: true, author: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} - NewsPortal`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article || !article.published) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.categoryId, article.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <Link href={`/category/${article.category.slug}`} className="hover:text-primary-600">
          {article.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-800 truncate max-w-xs">{article.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          {/* Category Badge */}
          <span
            className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full mb-4"
            style={{ backgroundColor: article.category.color }}
          >
            {article.category.name}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold text-sm">
                {article.author.name.charAt(0)}
              </div>
              <span className="font-medium text-gray-700">{article.author.name}</span>
            </div>
            <span>•</span>
            <span>{formatDate(article.createdAt)}</span>
            <span>•</span>
            <span>{getReadingTime(article.content)} min read</span>
            <span>•</span>
            <span>{article.views.toLocaleString()} views</span>
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            </div>
          )}

          {/* Excerpt */}
          <p className="text-lg text-gray-600 italic mb-8 pl-4 border-l-4 border-primary-500">
            {article.excerpt}
          </p>

          {/* Content */}
          <div className="article-content">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Share this article</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Facebook
              </button>
              <button className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-600 transition-colors">
                Twitter
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                WhatsApp
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                Copy Link
              </button>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-heading font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">
              About the Author
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{article.author.name}</p>
                <p className="text-sm text-gray-500">{article.author.email}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
