
import React from 'react';
import { ChevronRight, Terminal, Server, BarChart3, AlertTriangle } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle">
            Four simple steps to validate your application's resilience before you deploy to production.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          <StepCard 
            number={1}
            icon={<Terminal />}
            title="Configure"
            description="Set up your application endpoints and authentication using our CLI tool or web dashboard."
          />
          
          <StepCard 
            number={2}
            icon={<Server />}
            title="Simulate"
            description="Choose your simulation scenario: user traffic patterns, DDoS attacks, or custom events."
          />
          
          <StepCard 
            number={3}
            icon={<AlertTriangle />}
            title="Stress Test"
            description="Run your simulation in our isolated environment that mimics production conditions."
          />
          
          <StepCard 
            number={4}
            icon={<BarChart3 />}
            title="Analyze"
            description="Review detailed metrics and recommendations to optimize your infrastructure."
          />
        </div>
        
        <div className="mt-20 text-center p-8 rounded-xl border border-devaccent/20 bg-gradient-to-b from-devaccent/5 to-transparent">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">Developer-first approach</h3>
            <p className="text-devlightgray mb-6">
              We built DevSafeGuard with developers in mind. Integrate with your existing workflow using our API, CLI, 
              or direct integrations with CI/CD pipelines like GitHub Actions, CircleCI, and Jenkins.
            </p>
            
            <div className="mt-8 terminal text-left max-w-2xl mx-auto">
              <div className="font-mono text-sm">
                <div className="flex items-start">
                  <span className="text-devlightgray mr-2">$</span>
                  <div>
                    <span className="terminal-command">devsafeguard integrate --ci="github-actions"</span>
                    <div className="terminal-output mt-1">
                      ✓ Created .github/workflows/devsafeguard.yml<br />
                      ✓ Added API keys as repository secrets
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-start">
                  <span className="text-devlightgray mr-2">$</span>
                  <div>
                    <span className="terminal-command">cat .github/workflows/devsafeguard.yml</span>
                    <pre className="mt-1 text-xs text-devlightgray overflow-x-auto">
{`name: DevSafeGuard Tests
on:
  pull_request:
    branches: [ main ]
  
jobs:
  simulate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Traffic Simulation
        uses: devsafeguard/github-action@v1
        with:
          api-key: \${{ secrets.DEVSAFEGUARD_API_KEY }}
          scenario: production-traffic
          duration: 5m
          users: 5000`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ 
  number, 
  icon, 
  title, 
  description 
}: { 
  number: number; 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="relative">
      <div className="bg-card p-6 rounded-xl border border-devgray/10 h-full">
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-devaccent flex items-center justify-center text-white font-bold">
          {number}
        </div>
        {number < 4 && (
          <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2">
            <ChevronRight className="text-devgray h-8 w-8" />
          </div>
        )}
        <div className="feature-icon w-fit">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-devlightgray">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorks;
