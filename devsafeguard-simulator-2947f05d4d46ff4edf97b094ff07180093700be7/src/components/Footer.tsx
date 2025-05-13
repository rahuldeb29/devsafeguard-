
import React from 'react';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 bg-devdarker border-t border-devgray/10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-devaccent to-devpurple">
                <Shield size={18} className="text-white" />
              </div>
              <span className="font-mono font-bold text-lg">DevSafeGuard</span>
            </div>
            <p className="text-devlightgray text-sm mb-4">
              A powerful simulation platform for developers to test application resilience.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/rahuldeb29/devsafeguard" className="text-devlightgray hover:text-white">
                <Github size={20} />
              </a>
              <a href="#" className="text-devlightgray hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-devlightgray hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLinkRouter to="/docs">Documentation</FooterLinkRouter>
              <FooterLink href="#changelog">Changelog</FooterLink>
              <FooterLink href="#roadmap">Roadmap</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <FooterLinkRouter to="/docs">API Reference</FooterLinkRouter>
              <FooterLinkRouter to="/cli">CLI Documentation</FooterLinkRouter>
              <FooterLink href="#guides">Guides & Tutorials</FooterLink>
              <FooterLink href="#blog">Blog</FooterLink>
              <FooterLink href="#community">Community</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#careers">Careers</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
              <FooterLink href="#terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-devgray/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-devlightgray mb-4 md:mb-0">
            © {new Date().getFullYear()} DevSafeGuard. All rights reserved.
          </p>
          <div className="text-sm text-devlightgray">
            Built with <span className="text-deverror">❤</span> for developers by Team Matrix
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <a 
        href={href} 
        className="text-devlightgray hover:text-white transition-colors text-sm"
      >
        {children}
      </a>
    </li>
  );
};

const FooterLinkRouter = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="text-devlightgray hover:text-white transition-colors text-sm"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
