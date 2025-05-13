
import React from 'react';
import { Users, Shield, Zap, Activity, Code, BarChart3, Database, Network } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-devdarker/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Powerful simulation tools</h2>
          <p className="section-subtitle">
            Test your application's resilience with our comprehensive suite of developer-focused tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Users />}
            title="User Base Simulation"
            description="Simulate thousands of concurrent users with realistic behavior patterns, API calls, and session flows."
          />
          
          <FeatureCard 
            icon={<Shield />}
            title="DDoS Attack Testing"
            description="Test your defenses against various attack vectors including SYN floods, UDP floods, and application layer attacks."
          />
          
          <FeatureCard 
            icon={<Activity />}
            title="Edge Case Scenarios"
            description="Simulate traffic spikes, service outages, high latency conditions, and other real-world challenges."
          />
          
          <FeatureCard 
            icon={<Code />}
            title="Developer API"
            description="Integrate simulation capability directly into your CI/CD pipeline with our REST API and CLI tools."
          />
          
          <FeatureCard 
            icon={<BarChart3 />}
            title="Advanced Analytics"
            description="Visualize performance metrics and identify bottlenecks with detailed reports and dashboards."
          />
          
          <FeatureCard 
            icon={<Network />}
            title="Global Traffic Distribution"
            description="Test from 20+ regions worldwide to simulate geographical traffic distribution and latency patterns."
          />
        </div>
        
        <div className="mt-16 bg-gradient-to-br from-devdarker to-card p-8 rounded-2xl border border-devgray/20">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Infrastructure Impact Analysis</h3>
              <p className="text-devlightgray mb-6">
                DevSafeGuard precisely measures how different traffic patterns and attack vectors 
                affect your infrastructure, helping you optimize resource allocation and autoscaling policies.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-devsuccess"></div>
                  <span>CPU utilization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-devaccent"></div>
                  <span>Memory consumption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-devwarning"></div>
                  <span>Database connections</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-deverror"></div>
                  <span>Network throughput</span>
                </div>
              </div>
            </div>
            <div className="flex-1 h-64 bg-devdarker rounded-xl border border-devgray/20 p-4 overflow-hidden">
              <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAsODAgQyAxMDAsNTAgMTUwLDMwMCAyNTAsOTAgQyAzNTAsNDAwIDQwMCwxMCA1MDAsMjUwIEMgNjAwLDE5MCA3MDAsMzAwIDgwMCw4MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMEVBNUU5IiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNIDAsOTAgQyA4MCwyMDAgMjAwLDEwMCAyNTAsMjUwIEMgMzAwLDMwMCA0NTAsMTAwIDUwMCwyMDAgQyA1NTAsMzAwIDcwMCwyMDAgODAwLDkwIiBmaWxsPSJub25lIiBzdHJva2U9IiM4QjVDRjYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0gMCwyMDAgQyA1MCwxMDAgMTAwLDI1MCAxNTAsMjAwIEMgMjAwLDE1MCAzMDAsMzUwIDUwMCwxNTAgQyA3MDAsMzAwIDc1MCw1MCA4MDAsMjAwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="feature-card">
      <div className="feature-icon w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-devlightgray">{description}</p>
    </div>
  );
};

export default Features;
