
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Code, Shield, Terminal, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full py-4 border-b border-devgray/10">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-devaccent to-devpurple">
              <Shield size={24} className="text-white" />
            </div>
            <span className="font-mono font-bold text-xl">DevSafeGuard</span>
          </Link>
        </div>
        
        <nav className={`${isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-devdarker p-4 border-b border-devgray/10 shadow-lg z-50' : 'hidden'} md:relative md:flex md:flex-row md:top-0 md:bg-transparent md:p-0 md:border-0 md:shadow-none md:items-center md:gap-8`}>
          <NavLink href="/#features">Features</NavLink>
          <NavLink href="/#how-it-works">How It Works</NavLink>
          <NavLink href="/#pricing">Pricing</NavLink>
          <Link 
            to="/examples" 
            className={cn(
              "text-devlightgray hover:text-white transition-colors relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-devaccent after:transition-all",
              location.pathname === "/examples" && "text-white after:w-full"
            )}
          >
            View Examples
          </Link>
          <Link 
            to="/docs" 
            className={cn(
              "text-devlightgray hover:text-white transition-colors relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-devaccent after:transition-all",
              location.pathname === "/docs" && "text-white after:w-full"
            )}
          >
            Docs
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:flex items-center gap-2" asChild>
            <Link to="/cli">
              <Terminal size={16} />
              <span>Console</span>
            </Link>
          </Button>
          <Button className="bg-devaccent hover:bg-devaccent/90 text-white">
            Get Started
          </Button>
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ 
  href, 
  children, 
  className 
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <a 
      href={href} 
      className={cn(
        "text-devlightgray hover:text-white transition-colors relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-devaccent after:transition-all", 
        className
      )}
    >
      {children}
    </a>
  );
};

export default Navbar;
