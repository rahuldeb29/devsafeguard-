
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Shield, Terminal, Code } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Documentation</h1>
          
          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="cli">CLI Usage</TabsTrigger>
              <TabsTrigger value="api">API Reference</TabsTrigger>
            </TabsList>
            
            <TabsContent value="getting-started" className="space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="text-devaccent" />
                  <h2 className="text-2xl font-bold">Getting Started with DevSafeGuard</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p>DevSafeGuard is a powerful simulation platform designed to help developers test and improve their application's resilience against various security threats and failures.</p>
                  
                  <h3 className="text-xl font-semibold mt-6">Quick Start Guide</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Sign up for an account on the <a href="/#" className="text-devaccent hover:underline">home page</a>.</li>
                    <li>Install the DevSafeGuard CLI using: <code className="bg-devgray/30 px-2 py-1 rounded">npm install -g devsafeguard</code></li>
                    <li>Configure your project using: <code className="bg-devgray/30 px-2 py-1 rounded">dsg init</code></li>
                    <li>Run your first simulation: <code className="bg-devgray/30 px-2 py-1 rounded">dsg run</code></li>
                  </ol>
                  
                  <h3 className="text-xl font-semibold mt-6">System Requirements</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Node.js 16.0 or higher</li>
                    <li>NPM 7.0 or higher</li>
                    <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                  </ul>
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="text-devaccent" />
                  <h2 className="text-2xl font-bold">Platform Features</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl font-semibold mt-6">Security Testing</h3>
                  <p>Our platform provides comprehensive security testing capabilities:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>SQL Injection Simulation</strong>: Test your application's resistance to SQL injection attacks.</li>
                    <li><strong>XSS Attack Simulation</strong>: Identify cross-site scripting vulnerabilities.</li>
                    <li><strong>CSRF Simulation</strong>: Validate your CSRF protection measures.</li>
                    <li><strong>DDoS Attack Simulation</strong>: Test your application's performance under high load conditions.</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6">Performance Testing</h3>
                  <p>Evaluate your application's performance metrics:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Load Testing</strong>: Simulate thousands of concurrent users.</li>
                    <li><strong>Response Time Analysis</strong>: Measure your application's response time under various conditions.</li>
                    <li><strong>Resource Utilization</strong>: Monitor CPU, memory, and network usage during tests.</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6">Resilience Testing</h3>
                  <p>Ensure your application can handle failures gracefully:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Network Failure Simulation</strong>: Test your application's behavior during network outages.</li>
                    <li><strong>Service Dependency Failures</strong>: Simulate third-party service failures.</li>
                    <li><strong>Database Connection Issues</strong>: Test database connection timeout handling.</li>
                  </ul>
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="cli" className="space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="text-devaccent" />
                  <h2 className="text-2xl font-bold">CLI Reference</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p>The DevSafeGuard CLI (Command Line Interface) provides powerful tools for integrating security and resilience testing into your development workflow.</p>
                  
                  <h3 className="text-xl font-semibold mt-6">Installation</h3>
                  <pre className="bg-devgray/30 p-4 rounded overflow-x-auto">
                    <code>npm install -g devsafeguard</code>
                  </pre>
                  
                  <h3 className="text-xl font-semibold mt-6">Available Commands</h3>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">dsg init</h4>
                    <p>Initialize a new DevSafeGuard configuration in your project.</p>
                    <pre className="bg-devgray/30 p-4 rounded overflow-x-auto"><code>dsg init [--advanced]</code></pre>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">dsg run</h4>
                    <p>Run security and resilience tests on your application.</p>
                    <pre className="bg-devgray/30 p-4 rounded overflow-x-auto"><code>dsg run [--profile=&lt;profile-name&gt;] [--output=json|html]</code></pre>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">dsg scan</h4>
                    <p>Perform a quick vulnerability scan on your codebase.</p>
                    <pre className="bg-devgray/30 p-4 rounded overflow-x-auto"><code>dsg scan [--level=basic|advanced] [--fix]</code></pre>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6">CI/CD Integration</h3>
                  <p>DevSafeGuard can be integrated into your CI/CD pipeline. Example for GitHub Actions:</p>
                  <pre className="bg-devgray/30 p-4 rounded overflow-x-auto">
                    <code>{`name: Security Testing
on: [push, pull_request]
jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install DevSafeGuard
        run: npm install -g devsafeguard
      - name: Run Security Scan
        run: dsg scan --output=json > security-report.json`}</code>
                  </pre>
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Code className="text-devaccent" />
                  <h2 className="text-2xl font-bold">API Reference</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p>DevSafeGuard provides a RESTful API that allows you to programmatically integrate testing into your applications and workflows.</p>
                  
                  <h3 className="text-xl font-semibold mt-6">Authentication</h3>
                  <p>All API requests require authentication using an API key. You can generate an API key from your account dashboard.</p>
                  <pre className="bg-devgray/30 p-4 rounded overflow-x-auto">
                    <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.devsafeguard.com/v1/scans`}</code>
                  </pre>
                  
                  <h3 className="text-xl font-semibold mt-6">Endpoints</h3>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">GET /v1/scans</h4>
                    <p>List all security scans for your account.</p>
                    <pre className="bg-devgray/30 p-4 rounded overflow-x-auto">
                      <code>{`// Request
GET https://api.devsafeguard.com/v1/scans

// Response
{
  "scans": [
    {
      "id": "scan_123456",
      "status": "completed",
      "created_at": "2023-06-15T10:30:00Z",
      "results_url": "https://api.devsafeguard.com/v1/scans/scan_123456/results"
    },
    // ...
  ],
  "total": 24,
  "page": 1
}`}</code>
                    </pre>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">POST /v1/scans</h4>
                    <p>Create a new security scan.</p>
                    <pre className="bg-devgray/30 p-4 rounded overflow-x-auto">
                      <code>{`// Request
POST https://api.devsafeguard.com/v1/scans
{
  "target_url": "https://myapp.example.com",
  "scan_type": "comprehensive",
  "notify_email": "security@example.com"
}

// Response
{
  "scan_id": "scan_789012",
  "status": "queued",
  "estimated_completion": "2023-06-15T11:30:00Z"
}`}</code>
                    </pre>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6">Rate Limits</h3>
                  <p>The API has the following rate limits:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Free tier</strong>: 100 requests per hour</li>
                    <li><strong>Professional tier</strong>: 1,000 requests per hour</li>
                    <li><strong>Enterprise tier</strong>: 10,000 requests per hour</li>
                  </ul>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
