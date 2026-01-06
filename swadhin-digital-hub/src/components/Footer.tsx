import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/team' },
      { name: 'Services', path: '/services' },
      { name: 'Solutions', path: '/solutions' },
      { name: 'Projects', path: '/projects' },
    ],
    resources: [
      { name: 'Blog', path: '/blog' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Contact', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
    { name: 'Facebook Page', icon: Facebook, url: 'https://facebook.com/swadhindigitalhub' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com' },
    { name: 'X (Twitter)', icon: Twitter, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
  ];

  return (
    <footer className="w-full bg-dark-grey/50 backdrop-blur-md border-t border-white/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-xl text-primary mb-4">Swadhin Digital Hub</h3>
            <p className="font-paragraph text-sm text-light-grey mb-6">
              Automate. Accelerate. Achieve. Your partner in performance marketing and automation excellence.
            </p>
            <div className="flex gap-4">
              {socialLinks.slice(0, 3).map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading text-base text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-light-grey hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-heading text-base text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-light-grey hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="font-heading text-base text-foreground mb-4">Legal</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-light-grey hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-heading text-base text-foreground mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.slice(3).map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-light-grey">
              © {currentYear} Swadhin Digital Hub. All rights reserved.
            </p>
            <p className="font-paragraph text-sm text-light-grey">
              Crafted with precision and innovation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
