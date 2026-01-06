import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { BaseCrudService } from '@/integrations';
import { Solutions } from '@/entities';

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<Solutions[]>([]);

  useEffect(() => {
    const fetchSolutions = async () => {
      const { items } = await BaseCrudService.getAll<Solutions>('solutions');
      setSolutions(items);
    };
    fetchSolutions();
  }, []);

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
              Automation <span className="text-primary">Solutions</span>
            </h1>
            <p className="font-paragraph text-lg text-light-grey">
              Real-world use cases that transform how you work
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="w-full py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution._id}
                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Solution Image */}
                {solution.cardImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={solution.cardImage}
                      alt={solution.title || 'Solution'}
                      width={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>
                )}

                {/* Solution Content */}
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-foreground mb-3">
                    {solution.title}
                  </h3>
                  <p className="font-paragraph text-sm text-light-grey mb-4">
                    {solution.shortDescription}
                  </p>

                  {solution.detailedDescription && (
                    <div className="mb-4">
                      <p className="font-paragraph text-sm text-foreground leading-relaxed">
                        {solution.detailedDescription}
                      </p>
                    </div>
                  )}

                  {solution.keyBenefits && (
                    <div className="mb-6">
                      <h4 className="font-heading text-sm text-primary mb-2">Key Benefits:</h4>
                      <p className="font-paragraph text-sm text-light-grey">
                        {solution.keyBenefits}
                      </p>
                    </div>
                  )}

                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Get Started
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-dark-grey/30">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl text-foreground mb-4">
              Ready to Automate Your Business?
            </h2>
            <p className="font-paragraph text-lg text-light-grey mb-8 max-w-2xl mx-auto">
              Let's discuss which solution fits your needs best
            </p>
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
                Schedule a Consultation
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
