import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight, ChevronRight, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types';
import PageHeader from '@/components/PageHeader';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      setLoading(true);
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPost(data);

      const { data: relData } = await supabase
        .from('blog_posts')
        .select('*')
        .neq('id', data.id)
        .eq('category', data.category)
        .limit(3);

      setRelated(relData ?? []);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-3xl font-bold text-primary-900 mb-3">Article not found</h1>
        <p className="text-gray-500 mb-6">The article you are looking for may have been moved or removed.</p>
        <Link to="/blog" className="px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  const paragraphs = post.content.split('\n\n');

  return (
    <>
      <PageHeader
        title={post.title}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Blog', to: '/blog' },
          { label: post.title },
        ]}
        bgImage={post.image_url}
      />

      {/* Meta bar */}
      <div className="bg-white border-b border-primary-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
              {post.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <p className="font-semibold text-primary-900">{post.author}</p>
              <p className="text-xs text-gray-400">Author</p>
            </div>
          </div>
          <div className="h-8 w-px bg-primary-100 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-gray-500">
            <Calendar className="w-4 h-4" />
            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock className="w-4 h-4" />
            {post.read_mins} min read
          </div>
          <span className="ml-auto px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      {/* Article */}
      <article className="py-16 bg-cream-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-3xl overflow-hidden shadow-xl">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-64 sm:h-96 object-cover"
            />
          </div>
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-primary-100">
            <p className="text-xl text-gray-600 leading-relaxed font-display italic mb-8 pb-8 border-b border-primary-100">
              {post.excerpt}
            </p>
            <div className="prose-content space-y-6">
              {paragraphs.map((para, i) => {
                const trimmed = para.trim();
                if (!trimmed) return null;
                if (/^\d+\.\s/.test(trimmed)) {
                  const num = trimmed.match(/^(\d+)\./)?.[1];
                  const rest = trimmed.replace(/^\d+\.\s/, '');
                  return (
                    <div key={i} className="flex gap-4">
                      <span className="font-display text-2xl font-bold text-primary-300 shrink-0">{num}.</span>
                      <p className="text-gray-700 leading-relaxed flex-1">{rest}</p>
                    </div>
                  );
                }
                if (/^Week \d/.test(trimmed)) {
                  const weekMatch = trimmed.match(/^(Week \d+:.*)$/);
                  return (
                    <h3 key={i} className="font-display text-2xl font-bold text-primary-900 mt-8 mb-2">
                      {weekMatch?.[1] ?? trimmed}
                    </h3>
                  );
                }
                if (trimmed === trimmed.toUpperCase() && trimmed.length < 60 && !/^[0-9]/.test(trimmed)) {
                  return (
                    <h3 key={i} className="font-display text-xl font-bold text-primary-900 mt-8 mb-2">
                      {trimmed}
                    </h3>
                  );
                }
                return (
                  <p key={i} className="text-gray-700 leading-relaxed">{trimmed}</p>
                );
              })}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-primary-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-primary-900 mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="group bg-cream-50 rounded-2xl overflow-hidden border border-primary-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden h-44">
                    <img
                      src={rel.image_url}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h3 className="font-display text-base font-semibold text-primary-900 mt-1 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-primary-700 font-semibold">
                      Read more
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
