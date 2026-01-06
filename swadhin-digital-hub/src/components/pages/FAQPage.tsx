import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { BaseCrudService } from '@/integrations';
import { FrequentlyAskedQuestions } from '@/entities';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchFAQs = async () => {
      const { items } = await BaseCrudService.getAll<FrequentlyAskedQuestions>('faqs');
      
      // Sort by displayOrder and isFeatured
      const sortedItems = items.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (a.displayOrder || 0) - (b.displayOrder || 0);
      });
      
      setFaqs(sortedItems);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(items.map((faq) => faq.category).filter(Boolean))
      ) as string[];
      setCategories(['All', ...uniqueCategories]);
    };
    fetchFAQs();
  }, []);

  const toggleFaq = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs =
    selectedCategory === 'All'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="w-full py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="font-paragraph text-lg text-light-grey">
              Find answers to common questions about our services and solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="w-full py-8 bg-dark-grey/30">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-paragraph text-sm transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white/5 text-light-grey border border-white/10 hover:border-primary/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ List */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq._id}
                className={`bg-white/5 backdrop-blur-md border rounded-2xl overflow-hidden ${
                  faq.isFeatured ? 'border-primary/50' : 'border-white/10'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <button
                  onClick={() => toggleFaq(faq._id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="font-heading text-lg text-foreground mb-1">
                      {faq.question}
                    </h3>
                    {faq.category && (
                      <span className="font-paragraph text-xs text-primary">
                        {faq.category}
                      </span>
                    )}
                  </div>
                  {expandedId === faq._id ? (
                    <ChevronUp className="text-primary flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-primary flex-shrink-0" size={24} />
                  )}
                </button>

                {expandedId === faq._id && (
                  <motion.div
                    className="px-6 pb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-paragraph text-base text-light-grey leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
