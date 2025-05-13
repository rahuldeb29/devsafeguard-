
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Code, 
  Zap, 
  Database, 
  Network, 
  Globe, 
  AlertTriangle,
  Play,
  Pause,
  BarChart3,
  Copy,
  ArrowRight,
  Server
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AttackVectors = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("custom-attacks");
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [simulationIntensity, setSimulationIntensity] = useState(2500);
  const [simulationDuration, setSimulationDuration] = useState(60);
  const [endpoint, setEndpoint] = useState("/api/data");
  const [customAttackCode, setCustomAttackCode] = useState(
`// Custom attack vector simulation
// Configure parameters below
{
  "vector": "sql-injection",
  "payloads": [
    "' OR 1=1; --",
    "'; DROP TABLE users; --",
    "' UNION SELECT username,password FROM users; --"
  ],
  "delay": 100,
  "concurrency": 5
}`);
  const [responseBody, setResponseBody] = useState("");
  const [activeResponseTab, setActiveResponseTab] = useState("response");
  const [headerMetrics, setHeaderMetrics] = useState<{ [key: string]: string }>({});
  const [enableProtection, setEnableProtection] = useState(true);

  // Define the colors object based on active tab
  const getTabColors = (tab: string) => {
    switch (tab) {
      case "custom-attacks":
        return {
          bg: "bg-deverror",
          text: "text-deverror",
          border: "border-deverror",
          hoverBg: "hover:bg-deverror/90"
        };
      case "rate-limiting":
        return {
          bg: "bg-devaccent",
          text: "text-devaccent",
          border: "border-devaccent",
          hoverBg: "hover:bg-devaccent/90"
        };
      case "database-load":
        return {
          bg: "bg-devpurple",
          text: "text-devpurple",
          border: "border-devpurple",
          hoverBg: "hover:bg-devpurple/90"
        };
      case "geo-traffic":
        return {
          bg: "bg-devgreen",
          text: "text-devgreen",
          border: "border-devgreen",
          hoverBg: "hover:bg-devgreen/90"
        };
      default:
        return {
          bg: "bg-deverror",
          text: "text-deverror",
          border: "border-deverror",
          hoverBg: "hover:bg-deverror/90"
        };
    }
  };
  
  // Get current colors based on active tab
  const colors = getTabColors(activeTab);

  const startSimulation = () => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    setProgress(0);
    setResponseTime(null);
    setResponseBody("");
    setHeaderMetrics({});

    // Simulated progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          simulationComplete();
          return 100;
        }
        return prev + 1;
      });
    }, simulationDuration * 10); // Scale the progress to the duration

    toast({
      title: "Advanced simulation started",
      description: `${getSimulationTitle(activeTab)} simulation in progress`,
    });
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    toast({
      title: "Simulation stopped",
      description: "The simulation has been manually stopped",
      variant: "destructive",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard",
    });
  };

  const getSimulationTitle = (tabName: string) => {
    switch (tabName) {
      case "custom-attacks": return "Custom attack vector";
      case "rate-limiting": return "API rate limiting";
      case "database-load": return "Database load";
      case "geo-traffic": return "Geo-distributed traffic";
      default: return "Advanced";
    }
  };

  const simulationComplete = () => {
    // Generate simulated response data based on the test type
    let simulatedResponse = "";
    let randomResponseTime = 0;

    switch (activeTab) {
      case "custom-attacks":
        randomResponseTime = Math.floor(Math.random() * 1200) + 300;
        simulatedResponse = JSON.stringify({
          success: false,
          detection: {
            vectorDetected: "SQL Injection",
            confidence: "97.8%",
            payloadsBlocked: Math.floor(simulationIntensity * 0.92),
            vulnerabilities: [
              {
                type: "Input validation bypass",
                severity: "Critical",
                cveReference: "CVE-2023-45678"
              },
              {
                type: "Authentication bypass",
                severity: "High",
                cveReference: "CVE-2023-34567"
              }
            ],
            impactAssessment: {
              dataExposure: "High",
              serviceAvailability: "Medium",
              remediationDifficulty: "Low"
            }
          }
        }, null, 2);
        
        setHeaderMetrics({
          "Content-Type": "application/json",
          "Server": "DevSafeGuard/0.1.0",
          "X-Response-Time": `${randomResponseTime}ms`,
          "X-Simulated": "true",
          "X-Attack-Vector": "SQL Injection",
          "X-Attack-Intensity": `${simulationIntensity} attempts`,
          "X-Test-Duration": `${simulationDuration}s`,
          "X-Blocked-Rate": `${Math.floor(92)}%`,
          "X-Protection-Active": `${enableProtection ? "Yes" : "No"}`,
          "X-Threat-Level": "Critical",
          "Content-Security-Policy": "default-src 'self'",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block"
        });
        break;
      
      case "rate-limiting":
        randomResponseTime = Math.floor(Math.random() * 500) + 100;
        simulatedResponse = JSON.stringify({
          success: true,
          rateLimit: {
            currentLimit: 1000,
            burstCapacity: 1200,
            totalRequests: simulationIntensity,
            throttledRequests: Math.floor(simulationIntensity * 0.75),
            allowedRequests: Math.floor(simulationIntensity * 0.25),
            recommendedSettings: {
              baseLimit: 800,
              userLimit: 100,
              ipLimit: 50,
              timeWindow: "60s"
            }
          }
        }, null, 2);
        
        setHeaderMetrics({
          "Content-Type": "application/json",
          "Server": "DevSafeGuard/0.1.0",
          "X-Response-Time": `${randomResponseTime}ms`,
          "X-Simulated": "true",
          "X-Rate-Limit-Limit": "1000",
          "X-Rate-Limit-Remaining": "0",
          "X-Rate-Limit-Reset": "60",
          "X-Rate-Limit-Policy": "Global",
          "X-Throttled-Requests": `${Math.floor(simulationIntensity * 0.75)}`,
          "X-Allowed-Requests": `${Math.floor(simulationIntensity * 0.25)}`,
          "Retry-After": "30",
          "X-Burst-Capacity": "1200",
          "Cache-Control": "no-store",
          "Content-Length": `${new Blob([simulatedResponse]).size}`
        });
        break;
      
      case "database-load":
        randomResponseTime = Math.floor(Math.random() * 2000) + 500;
        simulatedResponse = JSON.stringify({
          success: true,
          databaseMetrics: {
            queries: simulationIntensity,
            averageQueryTime: `${Math.floor(Math.random() * 50) + 20}ms`,
            slowQueries: Math.floor(simulationIntensity * 0.08),
            connectionPool: {
              totalConnections: 100,
              activeConnections: 87,
              idleConnections: 13,
              maxConnections: 100
            },
            storage: {
              diskIOPS: Math.floor(Math.random() * 1000) + 500,
              readLatency: `${Math.floor(Math.random() * 10) + 1}ms`,
              writeLatency: `${Math.floor(Math.random() * 15) + 2}ms`,
              bufferCacheHitRatio: `${Math.floor(Math.random() * 10) + 90}%`
            }
          }
        }, null, 2);
        
        setHeaderMetrics({
          "Content-Type": "application/json",
          "Server": "DevSafeGuard/0.1.0",
          "X-Response-Time": `${randomResponseTime}ms`,
          "X-Simulated": "true",
          "X-Database-Type": "PostgreSQL",
          "X-Query-Count": `${simulationIntensity}`,
          "X-Query-Avg-Time": `${Math.floor(Math.random() * 50) + 20}ms`,
          "X-Slow-Queries": `${Math.floor(simulationIntensity * 0.08)}`,
          "X-Pool-Utilization": "87%",
          "X-Pool-Max": "100",
          "X-IOPS": `${Math.floor(Math.random() * 1000) + 500}`,
          "X-Cache-Hit-Ratio": `${Math.floor(Math.random() * 10) + 90}%`,
          "X-Query-Type-Distribution": "SELECT:70%,INSERT:20%,UPDATE:8%,DELETE:2%",
          "X-Transaction-Rate": `${Math.floor(simulationIntensity * 0.4)}/s`,
          "X-Deadlocks": `${Math.floor(Math.random() * 5)}`
        });
        break;
      
      case "geo-traffic":
        randomResponseTime = Math.floor(Math.random() * 800) + 200;
        simulatedResponse = JSON.stringify({
          success: true,
          geoMetrics: {
            regions: {
              "North America": Math.floor(simulationIntensity * 0.3),
              "Europe": Math.floor(simulationIntensity * 0.25),
              "Asia": Math.floor(simulationIntensity * 0.28),
              "South America": Math.floor(simulationIntensity * 0.1),
              "Africa": Math.floor(simulationIntensity * 0.05),
              "Oceania": Math.floor(simulationIntensity * 0.02)
            },
            regionLatency: {
              "North America": `${Math.floor(Math.random() * 50) + 50}ms`,
              "Europe": `${Math.floor(Math.random() * 100) + 100}ms`,
              "Asia": `${Math.floor(Math.random() * 150) + 200}ms`,
              "South America": `${Math.floor(Math.random() * 100) + 150}ms`,
              "Africa": `${Math.floor(Math.random() * 150) + 250}ms`,
              "Oceania": `${Math.floor(Math.random() * 100) + 200}ms`
            },
            cdnUtilization: `${Math.floor(Math.random() * 30) + 65}%`,
            edgeCacheHitRate: `${Math.floor(Math.random() * 25) + 70}%`
          }
        }, null, 2);
        
        setHeaderMetrics({
          "Content-Type": "application/json",
          "Server": "DevSafeGuard/0.1.0",
          "X-Response-Time": `${randomResponseTime}ms`,
          "X-Simulated": "true",
          "X-Traffic-Distribution": "NA:30%,EU:25%,AS:28%,SA:10%,AF:5%,OC:2%",
          "X-CDN-Provider": "CloudEdge",
          "X-Edge-Location": "Multi-region",
          "X-Cache-Status": "HIT",
          "X-Cache-Hit-Rate": `${Math.floor(Math.random() * 25) + 70}%`,
          "X-Avg-Latency-NA": `${Math.floor(Math.random() * 50) + 50}ms`,
          "X-Avg-Latency-EU": `${Math.floor(Math.random() * 100) + 100}ms`,
          "X-Avg-Latency-AS": `${Math.floor(Math.random() * 150) + 200}ms`,
          "X-Request-Count": `${simulationIntensity}`,
          "X-Network-Protocol": "HTTP/2",
          "X-Content-Encoding": "br, gzip"
        });
        break;
    }

    setResponseTime(randomResponseTime);
    setResponseBody(simulatedResponse);
    setActiveResponseTab("response");

    toast({
      title: "Simulation complete",
      description: `View the results in the Response tab`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-devdarker to-devdark">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-deverror to-devpurple text-transparent bg-clip-text">
                  Advanced Attack Vectors
                </h1>
                <p className="text-devlightgray mt-2 max-w-2xl">
                  Test your application against sophisticated attack scenarios and evaluate its resilience
                  under various security conditions.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="font-mono text-xs px-2 py-1 border-devgray/20">
                  v0.1.0-beta
                </Badge>
                <Badge variant="destructive" className="font-mono text-xs px-2">
                  Advanced
                </Badge>
              </div>
            </div>

            <Card className="bg-card border-devgray/10 overflow-hidden ring-1 ring-white/5">
              <CardHeader className="border-b border-devgray/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="flex items-center">
                        <Shield className={`h-5 w-5 mr-2 ${colors.text}`} />
                        Advanced Security Testing
                      </CardTitle>
                      <Badge 
                        variant={
                          activeTab === "custom-attacks" ? "destructive" : 
                          activeTab === "rate-limiting" ? "default" : 
                          activeTab === "database-load" ? "secondary" :
                          "outline"
                        } 
                        className="font-mono text-xs"
                      >
                        {getSimulationTitle(activeTab)}
                      </Badge>
                    </div>
                    <CardDescription className="mt-1">Test your application's resilience against advanced security threats</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <Tabs defaultValue="custom-attacks" className="w-full" value={activeTab} onValueChange={(value) => setActiveTab(value)}>
                <div className="border-b border-devgray/10">
                  <div className="container px-6 py-2">
                    <TabsList className="grid grid-cols-4 bg-devdarker">
                      <TabsTrigger 
                        value="custom-attacks" 
                        className="data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-deverror"
                      >
                        <Code className="h-4 w-4 mr-2" />
                        Custom Attacks
                      </TabsTrigger>
                      <TabsTrigger 
                        value="rate-limiting" 
                        className="data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-devaccent"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Rate Limiting
                      </TabsTrigger>
                      <TabsTrigger 
                        value="database-load" 
                        className="data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-devpurple"
                      >
                        <Database className="h-4 w-4 mr-2" />
                        Database Load
                      </TabsTrigger>
                      <TabsTrigger 
                        value="geo-traffic" 
                        className="data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-green-600"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Geo Traffic
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12">
                      <Label htmlFor="endpoint" className="text-xs font-medium mb-1.5 block">Target Endpoint</Label>
                      <Input 
                        id="endpoint" 
                        placeholder="Enter API endpoint" 
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                        className="font-mono text-sm bg-devdarker border-devgray/20 focus:border-devaccent focus-visible:ring-devaccent"
                        disabled={isSimulating}
                      />
                    </div>
                  </div>

                  <TabsContent value="custom-attacks" className="space-y-6 mt-0">
                    <div className="p-4 border border-deverror/20 bg-deverror/5 rounded-md flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-deverror shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm mb-1">Advanced Attack Vector Simulation</h4>
                        <p className="text-xs text-devlightgray">
                          This mode allows you to define custom attack vectors and payloads to test your application's 
                          security controls. All simulations are executed in an isolated environment.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium mb-3 text-white">Custom Attack Configuration</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-devdarker rounded-md border border-devgray/20 overflow-hidden">
                          <Textarea 
                            className="font-mono text-sm bg-transparent border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 h-60" 
                            value={customAttackCode} 
                            onChange={(e) => setCustomAttackCode(e.target.value)}
                            placeholder="Enter custom attack configuration"
                            disabled={isSimulating}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="attack-intensity" className="text-xs">Attack Intensity</Label>
                              <Badge variant="destructive" className="font-mono">{simulationIntensity} req/s</Badge>
                            </div>
                            <Slider 
                              id="attack-intensity"
                              min={500} 
                              max={10000} 
                              step={500} 
                              value={[simulationIntensity]} 
                              onValueChange={(value) => setSimulationIntensity(value[0])} 
                              disabled={isSimulating}
                              className="py-2"
                            />
                            <p className="text-xs text-devlightgray">Number of attack attempts during simulation</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="simulation-duration" className="text-xs">Simulation Duration</Label>
                              <Badge variant="outline" className="font-mono">{simulationDuration}s</Badge>
                            </div>
                            <Slider 
                              id="simulation-duration"
                              min={10} 
                              max={120} 
                              step={5} 
                              value={[simulationDuration]} 
                              onValueChange={(value) => setSimulationDuration(value[0])} 
                              disabled={isSimulating}
                              className="py-2"
                            />
                            <p className="text-xs text-devlightgray">Duration of the attack simulation in seconds</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="enable-protection" 
                            checked={enableProtection}
                            onCheckedChange={setEnableProtection}
                            disabled={isSimulating} 
                          />
                          <Label htmlFor="enable-protection" className="text-sm">Enable WAF protection simulation</Label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rate-limiting" className="space-y-6 mt-0">
                    <div className="p-4 border border-devaccent/20 bg-devaccent/5 rounded-md flex items-start gap-3">
                      <Zap className="h-5 w-5 text-devaccent shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm mb-1">API Rate Limiting Testing</h4>
                        <p className="text-xs text-devlightgray">
                          Test how your API handles high request rates and evaluate rate limiting effectiveness.
                          Identify bottlenecks and optimize your rate limiting configuration.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium mb-3 text-white">Rate Limit Configuration</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="request-rate" className="text-xs">Request Rate</Label>
                            <Badge variant="default" className="font-mono bg-devaccent">{simulationIntensity} req/s</Badge>
                          </div>
                          <Slider 
                            id="request-rate"
                            min={500} 
                            max={10000} 
                            step={500} 
                            value={[simulationIntensity]} 
                            onValueChange={(value) => setSimulationIntensity(value[0])} 
                            disabled={isSimulating}
                            className="py-2"
                          />
                          <p className="text-xs text-devlightgray">Number of requests per second</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="test-duration" className="text-xs">Test Duration</Label>
                            <Badge variant="outline" className="font-mono">{simulationDuration}s</Badge>
                          </div>
                          <Slider 
                            id="test-duration"
                            min={10} 
                            max={120} 
                            step={5} 
                            value={[simulationDuration]} 
                            onValueChange={(value) => setSimulationDuration(value[0])} 
                            disabled={isSimulating}
                            className="py-2"
                          />
                          <p className="text-xs text-devlightgray">Duration of the rate limit test</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="burst-mode" disabled={isSimulating} defaultChecked />
                          <Label htmlFor="burst-mode" className="text-sm">Burst mode</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="ip-rotation" disabled={isSimulating} defaultChecked />
                          <Label htmlFor="ip-rotation" className="text-sm">IP rotation</Label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="database-load" className="space-y-6 mt-0">
                    <div className="p-4 border border-devpurple/20 bg-devpurple/5 rounded-md flex items-start gap-3">
                      <Database className="h-5 w-5 text-devpurple shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm mb-1">Database Load Testing</h4>
                        <p className="text-xs text-devlightgray">
                          Simulate heavy database workloads to identify performance bottlenecks and optimization opportunities.
                          Test connection pooling, query performance, and database scaling.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium mb-3 text-white">Database Test Configuration</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="query-count" className="text-xs">Query Count</Label>
                            <Badge variant="secondary" className="font-mono bg-devpurple/20 text-white">{simulationIntensity}</Badge>
                          </div>
                          <Slider 
                            id="query-count"
                            min={500} 
                            max={10000} 
                            step={500} 
                            value={[simulationIntensity]} 
                            onValueChange={(value) => setSimulationIntensity(value[0])} 
                            disabled={isSimulating}
                            className="py-2"
                          />
                          <p className="text-xs text-devlightgray">Total number of database queries</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="db-duration" className="text-xs">Test Duration</Label>
                            <Badge variant="outline" className="font-mono">{simulationDuration}s</Badge>
                          </div>
                          <Slider 
                            id="db-duration"
                            min={10} 
                            max={120} 
                            step={5} 
                            value={[simulationDuration]} 
                            onValueChange={(value) => setSimulationDuration(value[0])} 
                            disabled={isSimulating}
                            className="py-2"
                          />
                          <p className="text-xs text-devlightgray">Duration of the database load test</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="complex-queries" disabled={isSimulating} defaultChecked />
                          <Label htmlFor="complex-queries" className="text-sm">Include complex queries</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="transaction-load" disabled={isSimulating} defaultChecked />
                          <Label htmlFor="transaction-load" className="text-sm">Transaction load</Label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="geo-traffic" className="space-y-6 mt-0">
                    <div className="p-4 border border-green-600/20 bg-green-600/5 rounded-md flex items-start gap-3">
                      <Globe className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm mb-1">Geo-Distributed Traffic Testing</h4>
                        <p className="text-xs text-devlightgray">
                          Test how your application performs with traffic from various geographical regions.
                          Evaluate CDN performance, regional latency, and global availability.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium mb-3 text-white">Geo Traffic Configuration</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="request-volume" className="text-xs">Request Volume</Label>
                            <Badge variant="outline" className="font-mono border-green-600 text-green-600">{simulationIntensity}</Badge>
                          </div>
                          <Slider 
                            id="request-volume"
                            min={500} 
                            max={10000} 
                            step={500} 
                            value={[simulationIntensity]} 
                            onValueChange={(value) => setSimulationIntensity(value[0])} 
                            disabled={isSimulating}
                            className="py-2"
                          />
                          <p className="text-xs text-devlightgray">Total number of requests distributed globally</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="geo-duration" className="text-xs">Test Duration</Label>
                            <Badge variant="outline" className="font-mono">{simulationDuration}s</Badge>
                          </div>
                          <Slider 
                            id="geo-duration"
                            min={10} 
                            max={120} 
                            step={5} 
                            value={[simulationDuration]} 
                            onValueChange={(value) => setSimulationDuration(value[0])} 
                            disabled={isSimulating}
                            className="py-2"
                          />
                          <p className="text-xs text-devlightgray">Duration of the geo-distributed test</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="cdn-simulation" disabled={isSimulating} defaultChecked />
                          <Label htmlFor="cdn-simulation" className="text-sm">Simulate CDN</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="latency-simulation" disabled={isSimulating} defaultChecked />
                          <Label htmlFor="latency-simulation" className="text-sm">Simulate regional latency</Label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {isSimulating && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Simulation Progress</span>
                        <span className="font-mono">{progress}%</span>
                      </div>
                      <Progress 
                        value={progress} 
                        className="h-2"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Tabs defaultValue="response" value={activeResponseTab} onValueChange={setActiveResponseTab} className="w-full">
                          <TabsList className="h-8 bg-devdarker">
                            <TabsTrigger value="response" className="text-xs h-7">Response</TabsTrigger>
                            <TabsTrigger value="headers" className="text-xs h-7">Headers</TabsTrigger>
                            <TabsTrigger value="visualization" className="text-xs h-7">Visualization</TabsTrigger>
                          </TabsList>
                        </Tabs>
                        {responseTime !== null && (
                          <Badge variant={responseTime > 500 ? "destructive" : "default"} className="font-mono text-xs">
                            {responseTime}ms
                          </Badge>
                        )}
                      </div>
                      {responseBody && (
                        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => copyToClipboard(responseBody)}>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      )}
                    </div>
                    <div className="bg-black rounded-md border border-devgray/20 p-4 min-h-[250px] font-mono">
                      <TabsContent value="response" className="mt-0">
                        {responseBody ? (
                          <pre className="text-xs text-white overflow-auto">{responseBody}</pre>
                        ) : (
                          <div className="h-full flex items-center justify-center text-devlightgray">
                            <span className="text-xs">Run a simulation to see the response</span>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="headers" className="mt-0">
                        {Object.keys(headerMetrics).length > 0 ? (
                          <div className="text-xs text-white">
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(headerMetrics).map(([key, value]) => (
                                <React.Fragment key={key}>
                                  <div className="text-devlightgray">{key}:</div>
                                  <div>{value}</div>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-devlightgray">
                            <span className="text-xs">Run a simulation to see response headers</span>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="visualization" className="mt-0">
                        {responseBody ? (
                          <div className="text-xs text-white space-y-6">
                            {activeTab === "custom-attacks" && (
                              <div>
                                <h4 className="mb-2 text-sm">Attack Vector Effectiveness</h4>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>Attack Detection Rate</span>
                                      <span className="text-green-500 font-mono">92%</span>
                                    </div>
                                    <div className="bg-devdarker h-2 rounded-full overflow-hidden relative">
                                      <div className="absolute top-0 left-0 h-full bg-green-500" style={{ width: "92%" }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>Vulnerability Exposure</span>
                                      <span className="text-deverror font-mono">8%</span>
                                    </div>
                                    <div className="bg-devdarker h-2 rounded-full overflow-hidden relative">
                                      <div className="absolute top-0 left-0 h-full bg-deverror" style={{ width: "8%" }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {activeTab === "rate-limiting" && (
                              <div>
                                <h4 className="mb-2 text-sm">Rate Limiting Performance</h4>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>Throttled Requests</span>
                                      <span className="text-devaccent font-mono">75%</span>
                                    </div>
                                    <div className="bg-devdarker h-2 rounded-full overflow-hidden relative">
                                      <div className="absolute top-0 left-0 h-full bg-devaccent" style={{ width: "75%" }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>Allowed Requests</span>
                                      <span className="text-green-500 font-mono">25%</span>
                                    </div>
                                    <div className="bg-devdarker h-2 rounded-full overflow-hidden relative">
                                      <div className="absolute top-0 left-0 h-full bg-green-500" style={{ width: "25%" }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {activeTab === "database-load" && (
                              <div>
                                <h4 className="mb-2 text-sm">Database Performance</h4>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>Connection Pool Usage</span>
                                      <span className="text-devpurple font-mono">87%</span>
                                    </div>
                                    <div className="bg-devdarker h-2 rounded-full overflow-hidden relative">
                                      <div className="absolute top-0 left-0 h-full bg-devpurple" style={{ width: "87%" }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>Query Type Distribution</span>
                                    </div>
                                    <div className="bg-devdarker h-4 rounded-full overflow-hidden relative flex">
                                      <div className="h-full bg-blue-500" style={{ width: "70%" }}></div>
                                      <div className="h-full bg-green-500" style={{ width: "20%" }}></div>
                                      <div className="h-full bg-amber-500" style={{ width: "8%" }}></div>
                                      <div className="h-full bg-red-500" style={{ width: "2%" }}></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] mt-1">
                                      <span className="text-blue-500">SELECT (70%)</span>
                                      <span className="text-green-500">INSERT (20%)</span>
                                      <span className="text-amber-500">UPDATE (8%)</span>
                                      <span className="text-red-500">DELETE (2%)</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {activeTab === "geo-traffic" && (
                              <div>
                                <h4 className="mb-2 text-sm">Regional Distribution</h4>
                                <div className="space-y-3">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <div className="flex justify-between text-xs mb-1">
                                        <span>North America</span>
                                        <span className="font-mono">30%</span>
                                      </div>
                                      <div className="bg-devdarker h-2 rounded-full overflow-hidden relative">
                                        <div className="absolute top-0 left-0 h-full bg-green-600" style={{ width: "30%" }}></div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-xs mb-1">
                                        <span>Europe</span>
                                        <span className="font-mono">25%</span>
                                      </div>
                                      <div className="bg-devdarker h-2 rounded-full overflow-hidden relative">
                                        <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: "25%" }}></div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-xs mb-1">
                                        <span>Asia</span>
                                        <span className="font-mono">28%</span>
                                      </div>
                                      <div className="bg-devdarker h-2 rounded-full overflow-hidden relative">
                                        <div className="absolute top-0 left-0 h-full bg-amber-500" style={{ width: "28%" }}></div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-xs mb-1">
                                        <span>South America</span>
                                        <span className="font-mono">10%</span>
                                      </div>
                                      <div className="bg-devdarker h-2 rounded-full overflow-hidden relative">
                                        <div className="absolute top-0 left-0 h-full bg-purple-500" style={{ width: "10%" }}></div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-xs mb-1">
                                        <span>Africa</span>
                                        <span className="font-mono">5%</span>
                                      </div>
                                      <div className="bg-devdarker h-2 rounded-full overflow-hidden relative">
                                        <div className="absolute top-0 left-0 h-full bg-red-500" style={{ width: "5%" }}></div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-xs mb-1">
                                        <span>Oceania</span>
                                        <span className="font-mono">2%</span>
                                      </div>
                                      <div className="bg-devdarker h-2 rounded-full overflow-hidden relative">
                                        <div className="absolute top-0 left-0 h-full bg-teal-500" style={{ width: "2%" }}></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="pt-2 border-t border-devgray/20">
                              <div className="text-devlightgray mb-1">Response Code Distribution:</div>
                              <div className="bg-devdarker h-4 rounded-full overflow-hidden relative flex">
                                <div className="h-full bg-green-500" style={{ width: activeTab === "ddos" ? "15%" : "85%" }}></div>
                                <div className="h-full bg-amber-500" style={{ width: activeTab === "ddos" ? "25%" : "10%" }}></div>
                                <div className="h-full bg-red-500" style={{ width: activeTab === "ddos" ? "60%" : "5%" }}></div>
                              </div>
                              <div className="flex justify-between text-[10px] mt-1">
                                <span className="text-green-500">2xx</span>
                                <span className="text-amber-500">4xx</span>
                                <span className="text-red-500">5xx</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-devlightgray">
                            <span className="text-xs">Run a simulation to see visualized data</span>
                          </div>
                        )}
                      </TabsContent>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t border-devgray/10 p-6 flex justify-between">
                  <div className="flex items-center text-sm text-devlightgray">
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="text-xs">Advanced simulations run in an isolated environment</span>
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={stopSimulation}
                      disabled={!isSimulating}
                      className="border-devgray/20"
                    >
                      <Pause className="mr-1 h-4 w-4" />
                      Stop
                    </Button>
                    <Button 
                      onClick={startSimulation}
                      disabled={isSimulating}
                      className={
                        activeTab === "custom-attacks" ? "bg-deverror hover:bg-deverror/90" :
                        activeTab === "rate-limiting" ? "bg-devaccent hover:bg-devaccent/90" :
                        activeTab === "database-load" ? "bg-devpurple hover:bg-devpurple/90" :
                        "bg-green-600 hover:bg-green-700"
                      }
                    >
                      <Play className="mr-1 h-4 w-4" />
                      Run Simulation
                    </Button>
                  </div>
                </CardFooter>
              </Tabs>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-devgray/10 overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="w-5 h-5 mr-2 text-devaccent" />
                    Test Results Summary
                  </CardTitle>
                  <CardDescription>Overview of your application's security performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-devgray/10 rounded-md space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-green-500" />
                          <span className="font-medium">Security Score</span>
                        </div>
                        <Badge variant="outline" className="font-mono">76/100</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>SQL Injection Protection</span>
                            <span className="text-green-500">93%</span>
                          </div>
                          <Progress value={93} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>XSS Protection</span>
                            <span className="text-green-500">88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Rate Limiting Effectiveness</span>
                            <span className="text-amber-500">72%</span>
                          </div>
                          <Progress value={72} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>DDoS Resilience</span>
                            <span className="text-deverror">55%</span>
                          </div>
                          <Progress value={55} className="h-2" />
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-2">View Full Report</Button>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Critical Vulnerabilities</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start pb-2 border-b border-devgray/10">
                          <Badge variant="destructive" className="mt-0.5 mr-2">High</Badge>
                          <div className="flex-1">
                            <div>Unvalidated API inputs</div>
                            <div className="text-xs text-devlightgray">Routes affected: /api/data, /api/users</div>
                          </div>
                        </li>
                        <li className="flex items-start pb-2 border-b border-devgray/10">
                          <Badge variant="destructive" className="mt-0.5 mr-2">High</Badge>
                          <div className="flex-1">
                            <div>Missing rate limiting</div>
                            <div className="text-xs text-devlightgray">Routes affected: /api/auth/login</div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <Badge variant="secondary" className="mt-0.5 mr-2 bg-devgray/20">Medium</Badge>
                          <div className="flex-1">
                            <div>Database query optimization needed</div>
                            <div className="text-xs text-devlightgray">Routes affected: /api/products, /api/search</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-devgray/10 overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ArrowRight className="w-5 h-5 mr-2 text-devpurple" />
                    Next Steps and Recommendations
                  </CardTitle>
                  <CardDescription>Actionable insights to improve security and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-devgray/10 rounded-md">
                      <h3 className="text-sm font-medium mb-3 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-deverror" />
                        Critical Security Issues
                      </h3>
                      
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start">
                          <div className="mr-4 mt-0.5 h-5 w-5 rounded-full bg-deverror/10 flex items-center justify-center text-xs text-deverror font-medium">
                            1
                          </div>
                          <div>
                            <span className="font-medium">Add input validation</span>
                            <p className="text-xs text-devlightgray mt-0.5">
                              Implement server-side input validation for all API endpoints, 
                              especially for user and data routes that accept query parameters.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-4 mt-0.5 h-5 w-5 rounded-full bg-deverror/10 flex items-center justify-center text-xs text-deverror font-medium">
                            2
                          </div>
                          <div>
                            <span className="font-medium">Configure rate limiting</span>
                            <p className="text-xs text-devlightgray mt-0.5">
                              Set up rate limiting for authentication endpoints to prevent 
                              brute force attacks. Use Redis for distributed rate limiting.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-4 mt-0.5 h-5 w-5 rounded-full bg-deverror/10 flex items-center justify-center text-xs text-deverror font-medium">
                            3
                          </div>
                          <div>
                            <span className="font-medium">Improve DDoS protection</span>
                            <p className="text-xs text-devlightgray mt-0.5">
                              Implement a CDN or DDoS protection service. Our tests show
                              vulnerability to SYN flood attacks targeting your origin server.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border border-devgray/10 rounded-md">
                      <h3 className="text-sm font-medium mb-3 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2 text-devaccent" />
                        Performance Optimizations
                      </h3>
                      
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start">
                          <div className="mr-4 mt-0.5 h-5 w-5 rounded-full bg-devaccent/10 flex items-center justify-center text-xs text-devaccent font-medium">
                            1
                          </div>
                          <div>
                            <span className="font-medium">Optimize database queries</span>
                            <p className="text-xs text-devlightgray mt-0.5">
                              Add indexes for frequently searched fields. Optimize the product search 
                              query that currently performs a full table scan.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-4 mt-0.5 h-5 w-5 rounded-full bg-devaccent/10 flex items-center justify-center text-xs text-devaccent font-medium">
                            2
                          </div>
                          <div>
                            <span className="font-medium">Implement caching</span>
                            <p className="text-xs text-devlightgray mt-0.5">
                              Add Redis caching for frequent database queries. Product catalog
                              can be cached for up to 1 hour based on traffic patterns.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-4 mt-0.5 h-5 w-5 rounded-full bg-devaccent/10 flex items-center justify-center text-xs text-devaccent font-medium">
                            3
                          </div>
                          <div>
                            <span className="font-medium">Optimize for global traffic</span>
                            <p className="text-xs text-devlightgray mt-0.5">
                              Set up additional edge locations or use a multi-region deployment
                              to reduce latency for users in Asia and South America.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AttackVectors;
