import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { BaseCrudService } from '@/integrations';
import { CaseStudies } from '@/entities';

export default function ProjectsPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      const { items } = await BaseCrudService.getAll<CaseStudies>('casestudies');
      setCaseStudies(items);
    };
    fetchCaseStudies();
  }, []);

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
              Case <span className="text-primary">Studies</span>
            </h1>
            <p className="font-paragraph text-lg text-light-grey">
              Real results from real projects. See how we've helped businesses transform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="w-full py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy._id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Case Study Image */}
                {caseStudy.cardImage && (
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={caseStudy.cardImage}
                      alt={caseStudy.title || 'Case Study'}
                      width={600}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full">
                      <TrendingUp size={20} />
                    </div>
                  </div>
                )}

                {/* Case Study Content */}
                <div className="p-8">
                  <h2 className="font-heading text-3xl text-foreground mb-4">
                    {caseStudy.title}
                  </h2>
                  
                  <p className="font-paragraph text-base text-light-grey mb-6">
                    {caseStudy.shortDescription}
                  </p>

                  {/* Key Results */}
                  {caseStudy.keyResults && (
                    <div className="mb-6 bg-primary/10 border border-primary/20 rounded-xl p-6">
                      <h3 className="font-heading text-lg text-primary mb-3">
                        Key Results
                      </h3>
                      <p className="font-paragraph text-sm text-foreground leading-relaxed">
                        {caseStudy.keyResults}
                      </p>
                    </div>
                  )}

                  {/* Approach */}
                  {caseStudy.approach && (
                    <div className="mb-6">
                      <h3 className="font-heading text-lg text-foreground mb-3">
                        Our Approach
                      </h3>
                      <p className="font-paragraph text-sm text-light-grey leading-relaxed">
                        {caseStudy.approach}
                      </p>
                    </div>
                  )}

                  {/* Outcomes */}
                  {caseStudy.outcomes && (
                    <div>
                      <h3 className="font-heading text-lg text-foreground mb-3">
                        Outcomes
                      </h3>
                      <p className="font-paragraph text-sm text-light-grey leading-relaxed">
                        {caseStudy.outcomes}
                      </p>
                    </div>
                  )}
                </div>
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
