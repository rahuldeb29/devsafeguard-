
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Shield, Server, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-20 relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-devaccent/10 text-devaccent text-sm font-medium mb-2">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-devaccent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-devaccent"></span>
            </span>
            Alpha Release 0.1.0
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">
            <span className="block">Simulate real-world conditions for your</span>
            <span className="bg-gradient-to-r from-devaccent to-devpurple text-transparent bg-clip-text">
              web applications
            </span>
          </h1>
          
          <p className="text-xl text-devlightgray max-w-2xl mx-auto">
            Testing in production is risky. DevSafeGuard lets you simulate user traffic, 
            DDoS attacks, and edge cases—all in a controlled environment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button className="fancy-button px-8 py-6 text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg border-devgray/30 hover:bg-devdarker/50">
              View Documentation
            </Button>
          </div>
          
          <div className="flex items-center gap-2 mt-6 text-devlightgray">
            <Shield className="h-4 w-4 text-devsuccess" />
            <span className="text-sm">No credit card required • Unlimited simulation runs</span>
          </div>
        </div>
        
        <div className="mt-16 relative">
          <div className="terminal w-full max-w-4xl mx-auto shadow-xl shadow-devdarker/50">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <div className="ml-4 text-xs text-devlightgray">devsafeguard-cli ~ simulate</div>
            </div>
            <div className="pt-3 space-y-2">
              <div className="flex">
                <span className="text-devlightgray mr-2">$</span>
                <span className="terminal-command">devsafeguard init --project=myapp</span>
              </div>
              <div className="terminal-output">✓ Project configuration loaded</div>
              <div className="flex">
                <span className="text-devlightgray mr-2">$</span>
                <span className="terminal-command">devsafeguard simulate --users=10000 --pattern=spike</span>
              </div>
              <div className="terminal-output">
                » Starting simulation with 10,000 virtual users<br />
                » Pattern: traffic spike over 2 minutes<br />
                » Target: https://api.example.com<br />
                » Orchestrating requests across 8 regions<br />
                » [====================] 100% Complete<br />
                » Performance report available at: https://devsafeguard.io/report/a8f2b
              </div>
              <div className="flex">
                <span className="text-devlightgray mr-2">$</span>
                <span className="terminal-command">devsafeguard attack --type=ddos --intensity=medium</span>
              </div>
              <div className="terminal-warning">
                ! Warning: Attack simulation will stress your infrastructure<br />
                ! Confirm to proceed [y/N]:
              </div>
              <div className="flex">
                <span className="text-devlightgray mr-2">$</span>
                <span className="terminal-command">y</span>
              </div>
              <div className="terminal-output">
                » Initiating controlled DDoS attack simulation<br />
                » Targeting frontend: 80% traffic to /login<br />
                » Executing SYN flood pattern<br />
                » [====================] 100% Complete<br />
                » Your system withstood 84% of traffic before degradation<br />
                » Weak points identified: cache efficiency, DB connection pool
              </div>
              <div className="flex">
                <span className="text-devlightgray mr-2">$</span>
                <span className="terminal-prompt"></span>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-8 text-sm text-devlightgray">
            <div className="flex items-center gap-1.5">
              <Server size={14} className="text-devaccent" />
              <span>8 global regions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-devpurple" />
              <span>Realistic traffic patterns</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database size={14} className="text-devaccent" />
              <span>Detailed metrics</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
