import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to N8N webhook
      const response = await fetch('https://n8n.swadhindigitalhub.com/webhook/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="font-paragraph text-lg text-light-grey">
              Ready to transform your business? Let's talk about your automation needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl text-foreground mb-6">
                Let's Start a Conversation
              </h2>
              <p className="font-paragraph text-base text-light-grey mb-8">
                Whether you need automation solutions, performance marketing, or just want to 
                explore possibilities, we're here to help.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base text-foreground mb-1">Email</h3>
                    <a
                      href="mailto:info@swadhindigitalhub.com"
                      className="font-paragraph text-sm text-light-grey hover:text-primary transition-colors"
                    >
                      info@swadhindigitalhub.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base text-foreground mb-1">Phone</h3>
                    <a
                      href="tel:+8801234567890"
                      className="font-paragraph text-sm text-light-grey hover:text-primary transition-colors"
                    >
                      +880 1234 567 890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base text-foreground mb-1">Location</h3>
                    <p className="font-paragraph text-sm text-light-grey">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              {/* Calendly-style Booking */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <h3 className="font-heading text-xl text-foreground mb-3">
                  Schedule a Demo
                </h3>
                <p className="font-paragraph text-sm text-light-grey mb-4">
                  Book a 30-minute consultation to discuss your automation needs
                </p>
                <Button
                  onClick={() => window.open('https://calendly.com/swadhindigitalhub', '_blank')}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Book Your Demo
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-2xl text-foreground mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="font-paragraph text-sm text-foreground mb-2 block">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-foreground"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="font-paragraph text-sm text-foreground mb-2 block">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-foreground"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="font-paragraph text-sm text-foreground mb-2 block">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-foreground"
                    placeholder="+880 1234 567 890"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="font-paragraph text-sm text-foreground mb-2 block">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-foreground"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-paragraph text-sm text-foreground mb-2 block">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-foreground min-h-32"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-primary/20 border border-primary/50 rounded-xl p-4">
                    <p className="font-paragraph text-sm text-primary">
                      Thank you! We'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-destructive/20 border border-destructive/50 rounded-xl p-4">
                    <p className="font-paragraph text-sm text-destructive">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2" size={16} />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
