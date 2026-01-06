import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { items } = await BaseCrudService.getAll<BlogPosts>('blogposts');
      setBlogPosts(items.slice(0, 6));
    };
    fetchBlogPosts();
  }, []);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="w-full py-24 bg-gradient-to-br from-secondary/10 via-background to-primary/10">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-6">
              Our <span className="text-primary">Blog</span>
            </h1>
            <p className="font-paragraph text-lg text-light-grey">
              Insights, tips, and strategies for automation and performance marketing
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post._id}
                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title || 'Blog post'}
                      width={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>
                )}

                {/* Post Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-light-grey">
                    {post.author && (
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span className="font-paragraph">{post.author}</span>
                      </div>
                    )}
                    {post.publishDate && (
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span className="font-paragraph">{formatDate(post.publishDate)}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-heading text-xl text-foreground mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-paragraph text-sm text-light-grey mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link to={`/blog/${post._id}`}>
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary/80 p-0 h-auto"
                    >
                      Read More
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
