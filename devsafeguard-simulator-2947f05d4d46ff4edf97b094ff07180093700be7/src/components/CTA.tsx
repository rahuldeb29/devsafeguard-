
import React from 'react';
import { Button } from "@/components/ui/button";
import { TerminalSquare, ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="bg-gradient-to-br from-devdarker to-card rounded-3xl overflow-hidden border border-devgray/10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to test your application's resilience?
              </h2>
              <p className="text-lg text-devlightgray mb-8">
                Get started with DevSafeGuard today and ensure your application performs flawlessly 
                under any conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="fancy-button px-8 py-6 text-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="px-8 py-6 text-lg border-devgray/30 hover:bg-devdarker/50">
                  Schedule Demo
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-2 text-devlightgray">
                <TerminalSquare size={16} className="text-devaccent" />
                <span className="text-sm">CLI available for MacOS, Linux, and Windows</span>
              </div>
            </div>
            <div className="flex-1 relative py-8">
              <div className="absolute inset-0 bg-gradient-to-r from-devaccent/20 to-devpurple/20 rounded-full filter blur-[80px] opacity-50"></div>
              <div className="terminal w-full h-full shadow-xl shadow-devdarker/50 relative z-10">
                <div className="terminal-header">
                  <div className="terminal-dot bg-red-500"></div>
                  <div className="terminal-dot bg-yellow-500"></div>
                  <div className="terminal-dot bg-green-500"></div>
                  <div className="ml-4 text-xs text-devlightgray">install.sh</div>
                </div>
                <div className="pt-3 space-y-2">
                  <div className="flex">
                    <span className="text-devlightgray mr-2">$</span>
                    <span className="terminal-command">curl -sSL https://get.devsafeguard.io | bash</span>
                  </div>
                  <div className="terminal-output">
                    » Downloading DevSafeGuard CLI v0.1.0...<br />
                    » Installation complete!<br />
                  </div>
                  <div className="flex">
                    <span className="text-devlightgray mr-2">$</span>
                    <span className="terminal-command">devsafeguard --version</span>
                  </div>
                  <div className="terminal-output">
                    DevSafeGuard CLI v0.1.0<br />
                  </div>
                  <div className="flex">
                    <span className="text-devlightgray mr-2">$</span>
                    <span className="terminal-command">devsafeguard login</span>
                  </div>
                  <div className="terminal-output">
                    » Opening browser to login...<br />
                    » Successfully logged in as developer@example.com<br />
                  </div>
                  <div className="flex">
                    <span className="text-devlightgray mr-2">$</span>
                    <span className="terminal-prompt"></span>
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

export default CTA;
