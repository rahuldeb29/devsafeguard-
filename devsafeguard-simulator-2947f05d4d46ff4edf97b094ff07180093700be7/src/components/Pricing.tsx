
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, Terminal, AlertCircle } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-devdarker/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Simple pricing for developers</h2>
          <p className="section-subtitle">
            Transparent pricing based on simulation minutes. No hidden costs or surprises.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard 
            title="Developer"
            price="Free"
            description="Perfect for individual projects and early testing."
            features={[
              "1,000 simulation minutes/month",
              "Up to 10,000 concurrent users",
              "Basic traffic patterns",
              "5 saved scenarios",
              "Community support"
            ]}
            buttonText="Get Started"
            buttonVariant="outline"
          />
          
          <PricingCard 
            title="Team"
            price="$49"
            period="/month"
            description="For teams working on multiple applications."
            features={[
              "10,000 simulation minutes/month",
              "Up to 100,000 concurrent users",
              "Advanced traffic patterns",
              "20 saved scenarios",
              "DDoS attack simulations",
              "Email support",
              "Team member accounts"
            ]}
            buttonText="Start 14-day Trial"
            buttonVariant="default"
            popular={true}
          />
          
          <PricingCard 
            title="Enterprise"
            price="Custom"
            description="For high-scale applications and organizations."
            features={[
              "Unlimited simulation minutes",
              "Unlimited concurrent users",
              "Custom traffic scenarios",
              "Advanced DDoS simulations",
              "On-premise deployment option",
              "SLA and dedicated support",
              "Compliance reporting"
            ]}
            buttonText="Contact Sales"
            buttonVariant="outline"
          />
        </div>
        
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-devlightgray">
            <AlertCircle size={18} className="text-devaccent" />
            <span>Need more information? Check our detailed pricing page or contact us.</span>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="link" className="text-devaccent">
              View Pricing Details
            </Button>
            <Button variant="link" className="text-devlightgray">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ 
  title, 
  price, 
  period = "", 
  description, 
  features, 
  buttonText, 
  buttonVariant = "default", 
  popular = false 
}: { 
  title: string; 
  price: string; 
  period?: string; 
  description: string; 
  features: string[]; 
  buttonText: string; 
  buttonVariant?: "default" | "outline" | "link"; 
  popular?: boolean;
}) => {
  return (
    <div className={`relative bg-card rounded-xl border ${popular ? 'border-devaccent' : 'border-devgray/10'} overflow-hidden`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-devaccent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-end mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-devlightgray ml-1">{period}</span>}
        </div>
        <p className="text-devlightgray mb-6">{description}</p>
        
        <Button 
          variant={buttonVariant as any} 
          className={`w-full ${buttonVariant === 'default' ? 'bg-devaccent hover:bg-devaccent/90' : ''}`}
        >
          {buttonText}
        </Button>
      </div>
      
      <div className="border-t border-devgray/10 p-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-devaccent shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pricing;
