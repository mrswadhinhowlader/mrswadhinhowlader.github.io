import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { BaseCrudService } from '@/integrations';
import { PricingPlans } from '@/entities';

export default function PricingPage() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlans[]>([]);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      const { items } = await BaseCrudService.getAll<PricingPlans>('pricingplans');
      setPricingPlans(items);
    };
    fetchPricingPlans();
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
              Simple, Transparent <span className="text-primary">Pricing</span>
            </h1>
            <p className="font-paragraph text-lg text-light-grey">
              Choose the plan that fits your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="w-full py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan._id}
                className={`relative bg-white/5 backdrop-blur-md border rounded-2xl p-8 ${
                  plan.isRecommended
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : 'border-white/10'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {plan.isRecommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full flex items-center gap-1">
                    <Star size={14} className="fill-current" />
                    <span className="font-heading text-xs">Recommended</span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-heading text-2xl text-foreground mb-2">
                    {plan.planName}
                  </h3>
                  <p className="font-paragraph text-sm text-light-grey mb-6">
                    {plan.planDescription}
                  </p>
                  <div className="mb-4">
                    <span className="font-heading text-5xl text-primary">
                      {plan.monthlyPrice}
                    </span>
                    <span className="font-paragraph text-lg text-light-grey"> BDT/mo</span>
                  </div>
                </div>

                {plan.featuresSummary && (
                  <div className="mb-6">
                    <p className="font-paragraph text-sm text-foreground leading-relaxed">
                      {plan.featuresSummary}
                    </p>
                  </div>
                )}

                <div className="space-y-3 mb-8">
                  {plan.whatsAppMessengerAutomationSubscription !== undefined &&
                    plan.whatsAppMessengerAutomationSubscription > 0 && (
                      <div className="flex items-start gap-2">
                        <Check className="text-primary flex-shrink-0 mt-1" size={16} />
                        <span className="font-paragraph text-sm text-light-grey">
                          WhatsApp/Messenger Automation: {plan.whatsAppMessengerAutomationSubscription} BDT/mo
                          {plan.whatsAppMessengerAutomationSetup && plan.whatsAppMessengerAutomationSetup > 0
                            ? ` + ${plan.whatsAppMessengerAutomationSetup} BDT setup`
                            : ''}
                        </span>
                      </div>
                    )}

                  {plan.linkedInViralPostAutomation !== undefined &&
                    plan.linkedInViralPostAutomation > 0 && (
                      <div className="flex items-start gap-2">
                        <Check className="text-primary flex-shrink-0 mt-1" size={16} />
                        <span className="font-paragraph text-sm text-light-grey">
                          LinkedIn Viral Post Automation: {plan.linkedInViralPostAutomation} BDT
                        </span>
                      </div>
                    )}

                  {plan.commentBotPrice !== undefined && plan.commentBotPrice > 0 && (
                    <div className="flex items-start gap-2">
                      <Check className="text-primary flex-shrink-0 mt-1" size={16} />
                      <span className="font-paragraph text-sm text-light-grey">
                        Comment Bot: {plan.commentBotPrice} BDT
                      </span>
                    </div>
                  )}

                  {plan.websiteChatbotPrice !== undefined && plan.websiteChatbotPrice > 0 && (
                    <div className="flex items-start gap-2">
                      <Check className="text-primary flex-shrink-0 mt-1" size={16} />
                      <span className="font-paragraph text-sm text-light-grey">
                        Website Chatbot: {plan.websiteChatbotPrice} BDT
                      </span>
                    </div>
                  )}

                  {plan.customAutomationNote && (
                    <div className="flex items-start gap-2">
                      <Check className="text-primary flex-shrink-0 mt-1" size={16} />
                      <span className="font-paragraph text-sm text-light-grey">
                        {plan.customAutomationNote}
                      </span>
                    </div>
                  )}
                </div>

                <Link to="/contact">
                  <Button
                    className={`w-full ${
                      plan.isRecommended
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-white/5 text-foreground border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Additional Pricing Info */}
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-heading text-2xl text-foreground mb-4">
              Need a Custom Solution?
            </h3>
            <p className="font-paragraph text-base text-light-grey mb-6 max-w-2xl mx-auto">
              We offer custom automation solutions tailored to your specific requirements. 
              Contact us for a personalized quote.
            </p>
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Contact Sales
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
