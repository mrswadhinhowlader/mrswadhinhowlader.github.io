import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const { items } = await BaseCrudService.getAll<TeamMembers>('teammembers');
      setTeamMembers(items);
    };
    fetchTeamMembers();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleBookDemo = (url: string | undefined) => {
    if (url) {
      window.open(url, '_blank');
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
              Meet Our <span className="text-primary">Team</span>
            </h1>
            <p className="font-paragraph text-lg text-light-grey">
              Experts in automation and performance marketing, ready to transform your business
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="w-full py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Member Photo */}
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  {member.memberPhoto ? (
                    <Image
                      src={member.memberPhoto}
                      alt={member.memberName || 'Team member'}
                      width={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                      <span className="font-heading text-4xl text-primary">
                        {member.memberName ? getInitials(member.memberName) : '??'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-foreground mb-2">
                    {member.memberName}
                  </h3>
                  <p className="font-paragraph text-sm text-primary mb-4">
                    {member.memberRole}
                  </p>

                  {member.memberBio && (
                    <p className="font-paragraph text-sm text-light-grey mb-4 leading-relaxed">
                      {member.memberBio}
                    </p>
                  )}

                  {member.memberSpecialties && (
                    <div className="mb-6">
                      <h4 className="font-heading text-xs text-foreground mb-2">Specialties:</h4>
                      <p className="font-paragraph text-xs text-light-grey">
                        {member.memberSpecialties}
                      </p>
                    </div>
                  )}

                  {member.bookDemoUrl && (
                    <Button
                      onClick={() => handleBookDemo(member.bookDemoUrl)}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Book Demo
                    </Button>
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
