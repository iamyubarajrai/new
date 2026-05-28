import Link from "next/link";
import Image from "next/image";
import { formatDate, getReadingTime } from "@/lib/utils";

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    imageUrl: string | null;
    views: number;
    createdAt: Date | string;
    category: {
      name: string;
      slug: string;
      color: string;
    };
    author: {
      name: string;
    };
  };
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link href={`/article/${article.slug}`} className="group block">
        <article className="relative h-[500px] rounded-xl overflow-hidden">
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span
              className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full mb-3"
              style={{ backgroundColor: article.category.color }}
            >
              {article.category.name}
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3 group-hover:text-primary-200 transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-200 mb-4 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span>{article.author.name}</span>
              <span>•</span>
              <span>{formatDate(article.createdAt)}</span>
              <span>•</span>
              <span>{getReadingTime(article.content)} min read</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-700" />
          )}
          <span
            className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full"
            style={{ backgroundColor: article.category.color }}
          >
            {article.category.name}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-heading font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{article.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span>{article.author.name}</span>
              <span>•</span>
              <span>{formatDate(article.createdAt)}</span>
            </div>
            <span>{getReadingTime(article.content)} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
