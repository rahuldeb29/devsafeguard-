
import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const CLIIntegration = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast({
      title: "Copied to clipboard",
      description: `${label} command has been copied to your clipboard.`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const CommandBlock = ({ command, label }: { command: string; label: string }) => (
    <div className="relative">
      <pre className="bg-devdarker p-4 rounded-md text-sm font-mono overflow-x-auto">
        <code>{command}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-8 w-8 p-0"
        onClick={() => copyToClipboard(command, label)}
      >
        {copied === label ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-devaccent to-devpurple flex items-center justify-center">
              <Terminal className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">DevSafeGuard CLI</h1>
              <p className="text-devlightgray">Powerful command-line interface for security testing</p>
            </div>
          </div>

          <div className="grid gap-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Installation</h2>
              <Card>
                <CardContent className="pt-6">
                  <CommandBlock 
                    command="npm install -g @devsafeguard/cli" 
                    label="Install Command" 
                  />
                  <p className="mt-4 text-sm text-devlightgray">
                    This will install the DevSafeGuard CLI globally on your system, making the
                    <code className="mx-1 px-1 py-0.5 bg-devdarker rounded text-xs">safeguard</code>
                    command available in your terminal.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Authentication</h2>
              <Card>
                <CardContent className="pt-6">
                  <CommandBlock 
                    command="safeguard auth login" 
                    label="Login Command" 
                  />
                  <p className="mt-4 text-sm text-devlightgray">
                    Authenticate with your DevSafeGuard account. This will open a browser window where you can complete the login process.
                  </p>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Using API Key</h3>
                    <CommandBlock 
                      command="safeguard auth set-key YOUR_API_KEY" 
                      label="API Key Command" 
                    />
                    <p className="mt-4 text-sm text-devlightgray">
                      You can also authenticate using your API key directly. You can generate API keys in your <a href="#" className="text-devaccent hover:underline">account dashboard</a>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Usage</h2>
              <Tabs defaultValue="tests" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tests">Security Tests</TabsTrigger>
                  <TabsTrigger value="integration">CI/CD Integration</TabsTrigger>
                  <TabsTrigger value="config">Configuration</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tests" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-3">Run a security test</h3>
                      <CommandBlock 
                        command="safeguard test run --url https://your-app.com --test-type vulnerability" 
                        label="Vulnerability Test" 
                      />
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Run load testing</h3>
                      <CommandBlock 
                        command="safeguard test run --url https://your-app.com --test-type load --users 1000 --duration 5" 
                        label="Load Test" 
                      />
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Run DDoS simulation</h3>
                      <CommandBlock 
                        command="safeguard test run --url https://your-app.com --test-type ddos --intensity medium --duration 2" 
                        label="DDoS Test" 
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="integration" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-3">GitHub Actions</h3>
                      <CommandBlock 
                        command={`# .github/workflows/devsafeguard.yml
name: DevSafeGuard Tests
on:
  pull_request:
    branches: [ main ]
  
jobs:
  simulate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Security Tests
        uses: devsafeguard/github-action@v1
        with:
          api-key: \${{ secrets.DEVSAFEGUARD_API_KEY }}
          scenario: security-scan
          severity: high`} 
                        label="GitHub Actions" 
                      />
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">GitLab CI</h3>
                      <CommandBlock 
                        command={`# .gitlab-ci.yml
security_test:
  image: node:latest
  stage: test
  script:
    - npm install -g @devsafeguard/cli
    - safeguard auth set-key $DEVSAFEGUARD_API_KEY
    - safeguard test run --url $CI_ENVIRONMENT_URL --test-type vulnerability --report-format junit
  artifacts:
    reports:
      junit: security-report.xml`}
                        label="GitLab CI" 
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="config" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-3">Create config file</h3>
                      <CommandBlock 
                        command="safeguard init" 
                        label="Init Command" 
                      />
                      <p className="mt-2 mb-6 text-sm text-devlightgray">
                        This creates a <code className="mx-1 px-1 py-0.5 bg-devdarker rounded text-xs">safeguard.config.json</code> file in your project.
                      </p>
                      
                      <h3 className="text-lg font-semibold mb-3">Example configuration</h3>
                      <CommandBlock 
                        command={`{
  "project": "my-webapp",
  "environments": {
    "staging": {
      "url": "https://staging.example.com",
      "apiEndpoints": ["/api/users", "/api/products"]
    },
    "production": {
      "url": "https://example.com",
      "apiEndpoints": ["/api/users", "/api/products"]
    }
  },
  "tests": {
    "vulnerability": {
      "enabled": true,
      "excludePaths": ["/health", "/metrics"]
    },
    "load": {
      "enabled": true,
      "users": 1000,
      "duration": 5
    }
  }
}`} 
                        label="Config Example" 
                      />
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Run tests using config</h3>
                      <CommandBlock 
                        command="safeguard test run-all --env staging" 
                        label="Run All Tests" 
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>

            <section className="mt-4">
              <h2 className="text-2xl font-bold mb-4">Advanced Options</h2>
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <h3 className="text-lg font-semibold">Scheduling Tests</h3>
                  <CommandBlock 
                    command="safeguard schedule create --name daily-scan --cron '0 2 * * *' --test-type vulnerability" 
                    label="Schedule Command" 
                  />
                  
                  <h3 className="text-lg font-semibold">Viewing Reports</h3>
                  <CommandBlock 
                    command="safeguard report list" 
                    label="List Reports" 
                  />
                  
                  <h3 className="text-lg font-semibold">Exporting Results</h3>
                  <CommandBlock 
                    command="safeguard report export --id ABC123 --format pdf --output ./reports/" 
                    label="Export Report" 
                  />
                </CardContent>
              </Card>
            </section>

            <div className="p-8 mt-4 bg-gradient-to-br from-devaccent/10 to-devpurple/10 rounded-lg border border-devgray/10">
              <h2 className="text-2xl font-bold mb-2">Need Help?</h2>
              <p className="mb-4 text-devlightgray">
                Explore our detailed documentation or reach out to our support team for assistance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">
                  Read the Docs
                </Button>
                <Button>
                  Get Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CLIIntegration;
