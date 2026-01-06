import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { BaseCrudService } from '@/integrations';
import { BlogPosts } from '@/entities';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPosts | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const fetchedPost = await BaseCrudService.getById<BlogPosts>('blogposts', id);
        setPost(fetchedPost);
      }
    };
    fetchPost();
  }, [id]);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="font-paragraph text-lg text-light-grey">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <article className="w-full py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Back Button */}
          <Link to="/blog">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="mr-2" size={16} />
              Back to Blog
            </Button>
          </Link>

          {/* Featured Image */}
          {post.featuredImage && (
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={post.featuredImage}
                alt={post.title || 'Blog post'}
                width={800}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Post Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm text-light-grey">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="font-paragraph">{post.author}</span>
                </div>
              )}
              {post.publishDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="font-paragraph">{formatDate(post.publishDate)}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Post Content */}
          <motion.div
            className="prose prose-invert max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="font-paragraph text-lg text-foreground leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
      <Chatbot />
    </div>
  );
}
