import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';

export default function ServicesPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<{ [key: string]: number | null }>({});

  useEffect(() => {
    const fetchServices = async () => {
      const { items } = await BaseCrudService.getAll<Services>('services');
      setServices(items);
    };
    fetchServices();
  }, []);

  const toggleFaq = (serviceId: string, faqIndex: number) => {
    setExpandedFaq((prev) => ({
      ...prev,
      [serviceId]: prev[serviceId] === faqIndex ? null : faqIndex,
    }));
  };

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
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="font-paragraph text-lg text-light-grey">
              Comprehensive automation and marketing solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Service Image */}
                {service.cardImage && (
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.cardImage}
                      alt={service.serviceName || 'Service'}
                      width={600}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>
                )}

                {/* Service Content */}
                <div className="p-8">
                  <h2 className="font-heading text-3xl text-foreground mb-4">
                    {service.serviceName}
                  </h2>
                  <p className="font-paragraph text-base text-light-grey mb-6">
                    {service.shortDescription}
                  </p>
                  <div className="font-paragraph text-base text-foreground mb-8 leading-relaxed">
                    {service.detailedDescription}
                  </div>

                  {/* Mini FAQs */}
                  {(service.faqQuestion1 || service.faqQuestion2) && (
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="font-heading text-xl text-primary mb-4">
                        Frequently Asked Questions
                      </h3>
                      <div className="space-y-4">
                        {service.faqQuestion1 && (
                          <div className="bg-white/5 rounded-xl overflow-hidden">
                            <button
                              onClick={() => toggleFaq(service._id, 1)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                            >
                              <span className="font-paragraph text-sm text-foreground">
                                {service.faqQuestion1}
                              </span>
                              {expandedFaq[service._id] === 1 ? (
                                <ChevronUp className="text-primary flex-shrink-0" size={20} />
                              ) : (
                                <ChevronDown className="text-primary flex-shrink-0" size={20} />
                              )}
                            </button>
                            {expandedFaq[service._id] === 1 && (
                              <div className="px-4 pb-4">
                                <p className="font-paragraph text-sm text-light-grey">
                                  {service.faqAnswer1}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {service.faqQuestion2 && (
                          <div className="bg-white/5 rounded-xl overflow-hidden">
                            <button
                              onClick={() => toggleFaq(service._id, 2)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                            >
                              <span className="font-paragraph text-sm text-foreground">
                                {service.faqQuestion2}
                              </span>
                              {expandedFaq[service._id] === 2 ? (
                                <ChevronUp className="text-primary flex-shrink-0" size={20} />
                              ) : (
                                <ChevronDown className="text-primary flex-shrink-0" size={20} />
                              )}
                            </button>
                            {expandedFaq[service._id] === 2 && (
                              <div className="px-4 pb-4">
                                <p className="font-paragraph text-sm text-light-grey">
                                  {service.faqAnswer2}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
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
