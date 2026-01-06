// HPI 1.5-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Zap, TrendingUp, Target, CheckCircle2, Star, 
  ChevronDown, ChevronUp, Users, Briefcase, MessageSquare, 
  Shield, BarChart, Globe, Cpu, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { BaseCrudService } from '@/integrations';
import { 
  Testimonials, Services, Solutions, CaseStudies, 
  BlogPosts, TeamMembers, PricingPlans, FrequentlyAskedQuestions 
} from '@/entities';

// --- Utility Components ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out opacity-0 translate-y-8 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 ${className || ''}`}
    >
      {children}
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle: string; align?: 'left' | 'center' }> = ({ title, subtitle, align = 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <AnimatedElement>
      <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i % 2 !== 0 ? 'text-primary' : ''}>{word} </span>
        ))}
      </h2>
    </AnimatedElement>
    <AnimatedElement delay={200}>
      <p className="font-paragraph text-lg md:text-xl text-light-grey max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </AnimatedElement>
    <AnimatedElement delay={300}>
      <div className={`h-1 w-24 bg-primary mt-8 ${align === 'center' ? 'mx-auto' : ''}`} />
    </AnimatedElement>
  </div>
);

// --- Main Component ---

export default function HomePage() {
  // --- Canonical Data Sources ---
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [solutions, setSolutions] = useState<Solutions[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlans[]>([]);
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Automate. Accelerate. Achieve.';

  const painPoints = [
    {
      icon: Target,
      pain: 'Manual processes eating your time',
      solution: 'Automated workflows that run 24/7',
    },
    {
      icon: TrendingUp,
      pain: 'Inconsistent lead generation',
      solution: 'Predictable, scalable lead capture systems',
    },
    {
      icon: Zap,
      pain: 'Disconnected tools and data',
      solution: 'Seamless integrations across your stack',
    },
  ];

  const trustedCompanies = [
    'https://static.wixstatic.com/media/979a33_c294c209343b4a1a99bbede04ca1235b~mv2.png?originWidth=128&originHeight=128',
    'https://static.wixstatic.com/media/979a33_f14caa01c7ac49d8a7cefd3591d20e3b~mv2.png?originWidth=128&originHeight=128',
    'https://static.wixstatic.com/media/979a33_3e91d38667f049a59c00d31ac38be081~mv2.png?originWidth=128&originHeight=128',
    'https://static.wixstatic.com/media/979a33_ce3de2f077bd483d80971ef645972249~mv2.png?originWidth=128&originHeight=128',
  ];

  // --- Effects ---

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Parallel fetching for performance
        const [
          testimonialsData,
          servicesData,
          solutionsData,
          caseStudiesData,
          blogPostsData,
          teamMembersData,
          pricingPlansData,
          faqsData
        ] = await Promise.all([
          BaseCrudService.getAll<Testimonials>('testimonials'),
          BaseCrudService.getAll<Services>('services'),
          BaseCrudService.getAll<Solutions>('solutions'),
          BaseCrudService.getAll<CaseStudies>('casestudies'),
          BaseCrudService.getAll<BlogPosts>('blogposts'),
          BaseCrudService.getAll<TeamMembers>('teammembers'),
          BaseCrudService.getAll<PricingPlans>('pricingplans'),
          BaseCrudService.getAll<FrequentlyAskedQuestions>('faqs')
        ]);

        setTestimonials(testimonialsData.items.slice(0, 3)); // Preserve original slice logic
        setServices(servicesData.items);
        setSolutions(solutionsData.items);
        setCaseStudies(caseStudiesData.items.slice(0, 6));
        setBlogPosts(blogPostsData.items.slice(0, 6));
        setTeamMembers(teamMembersData.items);
        setPricingPlans(pricingPlansData.items);
        setFaqs(faqsData.items.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchAllData();
  }, []);

  // --- Scroll Hooks ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip selection:bg-primary selection:text-primary-foreground">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Dynamic Background Grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E1E1E_1px,transparent_1px),linear-gradient(to_bottom,#1E1E1E_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-mono text-primary tracking-wider uppercase">System Online</span>
            </motion.div>

            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-foreground mb-8 leading-[0.9] tracking-tighter">
              {displayedText}
              <span className="text-primary animate-pulse">_</span>
            </h1>

            <motion.p
              className="font-paragraph text-xl md:text-2xl text-light-grey max-w-2xl mb-12 lg:mx-0 mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transform your business with cutting-edge automation and performance marketing. 
              We build systems that work while you sleep.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-8 text-xl rounded-none border-l-4 border-white relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    Book Your Demo <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                  </span>
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-10 py-8 text-xl rounded-none backdrop-blur-sm"
                >
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Hero Stats / Visual */}
          <div className="lg:col-span-4 relative">
            <motion.div
              className="grid grid-cols-1 gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { value: '500+', label: 'Automations Deployed', icon: Cpu },
                { value: '98%', label: 'Client Satisfaction', icon: CheckCircle2 },
                { value: '10x', label: 'Average ROI Increase', icon: TrendingUp },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-dark-grey/40 backdrop-blur-xl border border-white/10 p-8 flex items-center gap-6 hover:border-primary/50 transition-colors group"
                >
                  <div className="p-4 bg-white/5 rounded-full group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="text-primary w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-heading text-4xl text-white mb-1">{stat.value}</h3>
                    <p className="font-paragraph text-sm text-light-grey uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TRUSTED BY (MARQUEE) --- */}
      <section className="w-full py-12 border-y border-white/5 bg-dark-grey/20 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6">
          <p className="font-mono text-xs text-center text-light-grey mb-8 uppercase tracking-[0.3em]">Trusted by modern teams</p>
          <div className="flex justify-center gap-16 md:gap-32 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {trustedCompanies.map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt={`Trusted company ${index + 1}`}
                width={140}
                className="h-12 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- PAIN TO SOLUTION (STICKY SCROLL) --- */}
      <section className="w-full py-32 bg-background relative">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <SectionHeader title="From Pain Points to Power Moves" subtitle="We understand your challenges. Here's how we solve them." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
            {/* Sticky Left Side */}
            <div className="hidden lg:block relative">
              <div className="sticky top-32">
                <div className="relative aspect-square w-full max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[100px] animate-pulse" />
                  <Image 
                    src="https://static.wixstatic.com/media/979a33_77d3483fcfa24311860f3787aa86c255~mv2.png?originWidth=576&originHeight=576" 
                    alt="Transformation" 
                    width={600} 
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Scrolling Right Side */}
            <div className="space-y-24">
              {painPoints.map((item, index) => {
                const Icon = item.icon;
                return (
                  <AnimatedElement key={index} className="group">
                    <div className="relative bg-dark-grey/30 border border-white/10 p-10 overflow-hidden hover:border-primary/50 transition-all duration-500">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Icon size={120} />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 bg-destructive/10 rounded-lg">
                            <Icon className="text-destructive" size={24} />
                          </div>
                          <h3 className="font-heading text-2xl text-white">The Problem</h3>
                        </div>
                        <p className="font-paragraph text-xl text-light-grey mb-8 pl-4 border-l-2 border-destructive/50">
                          {item.pain}
                        </p>

                        <div className="h-px w-full bg-white/10 mb-8" />

                        <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <CheckCircle2 className="text-primary" size={24} />
                          </div>
                          <h3 className="font-heading text-2xl text-white">Our Solution</h3>
                        </div>
                        <p className="font-paragraph text-xl text-white pl-4 border-l-2 border-primary">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </AnimatedElement>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES (BENTO GRID) --- */}
      <section className="w-full py-32 bg-dark-grey/20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <SectionHeader title="Our Core Services" subtitle="Comprehensive automation and marketing solutions tailored for growth." />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedElement key={service._id} delay={index * 100}>
                <Link to="/services" className="block h-full">
                  <div className="group h-full bg-background border border-white/5 p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="mb-6 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                        <Zap size={24} />
                      </div>
                      <h3 className="font-heading text-2xl text-white mb-4 group-hover:text-primary transition-colors">
                        {service.serviceName}
                      </h3>
                      <p className="font-paragraph text-light-grey mb-6 flex-grow">
                        {service.shortDescription}
                      </p>
                      <div className="flex items-center text-sm font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                        Learn More <ArrowRight size={16} className="ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOLUTIONS (USE CASES) --- */}
      <section className="w-full py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <SectionHeader title="Intelligent Solutions" subtitle="Specific use-cases designed to solve complex operational bottlenecks." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <AnimatedElement key={solution._id} delay={index * 100}>
                <div className="flex flex-col lg:flex-row gap-8 bg-white/5 border border-white/10 p-8 hover:bg-white/[0.07] transition-colors">
                  <div className="w-full lg:w-1/3 aspect-video lg:aspect-square bg-dark-grey relative overflow-hidden">
                    {solution.cardImage && (
                      <Image 
                        src={solution.cardImage} 
                        alt={solution.title || 'Solution'} 
                        width={300} 
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-heading text-2xl text-white mb-3">{solution.title}</h3>
                    <p className="font-paragraph text-light-grey mb-6">{solution.shortDescription}</p>
                    <ul className="space-y-2 mb-6">
                      {solution.keyBenefits?.split('\n').slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-light-grey">
                          <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/solutions">
                      <Button variant="link" className="text-primary p-0 h-auto hover:text-white">
                        View Details <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS / CASE STUDIES --- */}
      <section className="w-full py-32 bg-dark-grey/30 border-y border-white/5">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">Recent <span className="text-primary">Success Stories</span></h2>
              <p className="font-paragraph text-light-grey text-lg">See how we've helped businesses scale through automation.</p>
            </div>
            <Link to="/projects">
              <Button variant="outline" className="mt-6 md:mt-0 border-white/20 text-white hover:bg-white/10">
                View All Projects
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <AnimatedElement key={study._id} delay={index * 100}>
                <Card className="bg-background border-white/10 overflow-hidden group h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                    {study.cardImage && (
                      <Image 
                        src={study.cardImage} 
                        alt={study.title || 'Case Study'} 
                        width={600} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-white group-hover:text-primary transition-colors">
                      {study.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="font-paragraph text-light-grey text-sm line-clamp-3">
                      {study.shortDescription}
                    </p>
                  </CardContent>
                  <CardFooter className="border-t border-white/5 pt-6">
                    <div className="w-full flex justify-between items-center">
                      <span className="text-xs font-mono text-primary uppercase tracking-wider">
                        {study.outcomes ? 'Results Available' : 'Case Study'}
                      </span>
                      <ArrowRight size={16} className="text-white -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </CardFooter>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="w-full py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <SectionHeader title="Meet The Experts" subtitle="The minds behind the machines." />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <AnimatedElement key={member._id} delay={index * 100}>
                <div className="group relative">
                  <div className="aspect-[3/4] overflow-hidden bg-dark-grey mb-4 relative">
                    {member.memberPhoto ? (
                      <Image 
                        src={member.memberPhoto} 
                        alt={member.memberName || 'Team Member'} 
                        width={400} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <span className="font-heading text-4xl text-white/20">
                          {member.memberName?.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <p className="text-white text-sm mb-2">{member.memberSpecialties}</p>
                      <Link to="/team">
                        <Button size="sm" className="w-full bg-primary text-black hover:bg-white">
                          Book Demo
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl text-white">{member.memberName}</h3>
                  <p className="font-paragraph text-sm text-primary">{member.memberRole}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section className="w-full py-32 bg-dark-grey/20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <SectionHeader title="Transparent Pricing" subtitle="Choose the plan that fits your growth stage." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {pricingPlans.map((plan, index) => (
              <AnimatedElement key={plan._id} delay={index * 150}>
                <div className={`relative p-8 border ${plan.isRecommended ? 'bg-white/5 border-primary shadow-[0_0_30px_rgba(100,255,218,0.1)]' : 'bg-background border-white/10'} flex flex-col h-full transition-transform hover:-translate-y-2`}>
                  {plan.isRecommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-4 py-1 uppercase tracking-widest">
                      Recommended
                    </div>
                  )}
                  <h3 className="font-heading text-2xl text-white mb-2">{plan.planName}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-primary">৳{plan.monthlyPrice}</span>
                    <span className="text-light-grey text-sm">/month</span>
                  </div>
                  <p className="font-paragraph text-sm text-light-grey mb-8 min-h-[3rem]">
                    {plan.planDescription}
                  </p>
                  
                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.featuresSummary?.split('\n').map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                        <span className="text-sm text-white">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/contact" className="w-full">
                    <Button className={`w-full ${plan.isRecommended ? 'bg-primary text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                      Get Started
                    </Button>
                  </Link>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF (TESTIMONIALS) --- */}
      <section className="w-full py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative z-10">
          <SectionHeader title="Client Feedback" subtitle="Don't just take our word for it." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedElement key={testimonial._id} delay={index * 100}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 h-full flex flex-col relative group hover:border-primary/30 transition-colors">
                  <div className="absolute -top-4 -left-4 text-6xl text-white/5 font-serif">"</div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="text-primary fill-primary" size={16} />
                    ))}
                  </div>
                  <p className="font-paragraph text-lg text-white mb-8 flex-grow italic">
                    "{testimonial.testimonialText}"
                  </p>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                    {testimonial.companyLogo ? (
                      <Image
                        src={testimonial.companyLogo}
                        alt={testimonial.companyName || 'Company'}
                        width={48}
                        className="h-12 w-12 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Users size={20} className="text-white/50" />
                      </div>
                    )}
                    <div>
                      <p className="font-heading text-sm text-white">{testimonial.clientName}</p>
                      <p className="font-paragraph text-xs text-light-grey">
                        {testimonial.clientRole}, {testimonial.companyName}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="w-full py-32 bg-dark-grey/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <SectionHeader title="Frequently Asked Questions" subtitle="Everything you need to know about our process." />

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedElement key={faq._id} delay={index * 50}>
                <AccordionItem value={faq._id} className="border border-white/10 bg-background px-6 rounded-lg data-[state=open]:border-primary/50 transition-colors">
                  <AccordionTrigger className="text-white hover:text-primary font-heading text-lg py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-light-grey pb-6 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimatedElement>
            ))}
          </Accordion>
          
          <div className="text-center mt-12">
            <Link to="/faq">
              <Button variant="link" className="text-primary">
                View All FAQs <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="w-full py-32 bg-primary text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/979a33_dfef0393912c440580d4b459768c1695~mv2.png?originWidth=1152&originHeight=768')] opacity-10 mix-blend-overlay" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-heading text-5xl md:text-7xl mb-8 tracking-tighter">Ready to Automate?</h2>
          <p className="font-paragraph text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-80">
            Stop wasting time on manual tasks. Let's build a system that scales your business automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button className="bg-black text-white hover:bg-black/80 px-12 py-8 text-xl border-none">
                Book A Strategy Call
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" className="border-black text-black hover:bg-black/10 px-12 py-8 text-xl">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}