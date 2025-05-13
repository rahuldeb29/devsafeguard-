
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data - this would be expanded in a real implementation
const monthlyData = [
  { name: "Jan", securityScore: 65, vulnerabilities: 12, patches: 8 },
  { name: "Feb", securityScore: 68, vulnerabilities: 10, patches: 7 },
  { name: "Mar", securityScore: 75, vulnerabilities: 8, patches: 8 },
  { name: "Apr", securityScore: 73, vulnerabilities: 9, patches: 5 },
  { name: "May", securityScore: 80, vulnerabilities: 6, patches: 6 },
  { name: "Jun", securityScore: 85, vulnerabilities: 4, patches: 4 },
  { name: "Jul", securityScore: 87, vulnerabilities: 3, patches: 3 },
  { name: "Aug", securityScore: 84, vulnerabilities: 5, patches: 4 },
  { name: "Sep", securityScore: 90, vulnerabilities: 2, patches: 2 },
  { name: "Oct", securityScore: 92, vulnerabilities: 1, patches: 1 },
  { name: "Nov", securityScore: 88, vulnerabilities: 3, patches: 3 },
  { name: "Dec", securityScore: 95, vulnerabilities: 1, patches: 2 },
];

const weeklyData = [
  { name: "Week 1", securityScore: 82, vulnerabilities: 5, patches: 3 },
  { name: "Week 2", securityScore: 85, vulnerabilities: 4, patches: 4 },
  { name: "Week 3", securityScore: 87, vulnerabilities: 3, patches: 2 },
  { name: "Week 4", securityScore: 90, vulnerabilities: 2, patches: 3 },
];

const dailyData = [
  { name: "Mon", securityScore: 88, vulnerabilities: 3, patches: 2 },
  { name: "Tue", securityScore: 89, vulnerabilities: 2, patches: 1 },
  { name: "Wed", securityScore: 91, vulnerabilities: 2, patches: 2 },
  { name: "Thu", securityScore: 90, vulnerabilities: 3, patches: 1 },
  { name: "Fri", securityScore: 92, vulnerabilities: 1, patches: 1 },
  { name: "Sat", securityScore: 93, vulnerabilities: 1, patches: 0 },
  { name: "Sun", securityScore: 93, vulnerabilities: 1, patches: 0 },
];

// Chart config for styling
const chartConfig = {
  securityScore: {
    label: "Security Score",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
    },
  },
  vulnerabilities: {
    label: "Vulnerabilities",
    theme: {
      light: "#ef4444",
      dark: "#f87171",
    },
  },
  patches: {
    label: "Patches Applied",
    theme: {
      light: "#22c55e",
      dark: "#4ade80",
    },
  },
};

const MetricsDashboard = () => {
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [chartData, setChartData] = useState(monthlyData);
  const [securityStatus, setSecurityStatus] = useState("Good");

  useEffect(() => {
    // Update chart data based on selected time frame
    switch (timeFrame) {
      case "daily":
        setChartData(dailyData);
        break;
      case "weekly":
        setChartData(weeklyData);
        break;
      default:
        setChartData(monthlyData);
    }

    // Calculate security status based on latest score
    const latestScore = chartData[chartData.length - 1].securityScore;
    if (latestScore >= 90) {
      setSecurityStatus("Excellent");
    } else if (latestScore >= 75) {
      setSecurityStatus("Good");
    } else if (latestScore >= 60) {
      setSecurityStatus("Fair");
    } else {
      setSecurityStatus("Poor");
    }
  }, [timeFrame, chartData]);

  const exportData = () => {
    // Simple CSV export
    const headers = Object.keys(chartData[0]).join(",");
    const rows = chartData.map(row => Object.values(row).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `security-metrics-${timeFrame}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/examples">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Examples
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Security Metrics Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current Security Score</CardTitle>
            <CardDescription>Overall security rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {chartData[chartData.length - 1].securityScore}%
            </div>
            <p className={`mt-2 ${securityStatus === 'Excellent' || securityStatus === 'Good' ? 'text-green-500' : securityStatus === 'Fair' ? 'text-yellow-500' : 'text-red-500'}`}>
              {securityStatus} status
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Vulnerabilities</CardTitle>
            <CardDescription>Currently detected issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {chartData[chartData.length - 1].vulnerabilities}
            </div>
            <p className="mt-2 text-muted-foreground">
              {chartData[chartData.length - 2].vulnerabilities - chartData[chartData.length - 1].vulnerabilities > 0 
                ? `${chartData[chartData.length - 2].vulnerabilities - chartData[chartData.length - 1].vulnerabilities} fewer than previous period` 
                : `${chartData[chartData.length - 1].vulnerabilities - chartData[chartData.length - 2].vulnerabilities} more than previous period`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Patches</CardTitle>
            <CardDescription>Security fixes applied</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {chartData[chartData.length - 1].patches}
            </div>
            <p className="mt-2 text-muted-foreground">
              Total of {chartData.reduce((sum, item) => sum + item.patches, 0)} patches applied
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="security-score">Security Score</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="patches">Patches</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Metrics Overview</CardTitle>
              <CardDescription>
                Combined view of all security metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="securityScore"
                        stroke="var(--color-securityScore)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="vulnerabilities"
                        stroke="var(--color-vulnerabilities)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="patches"
                        stroke="var(--color-patches)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security-score">
          <Card>
            <CardHeader>
              <CardTitle>Security Score Trend</CardTitle>
              <CardDescription>
                Detailed view of your security score over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="securityScore"
                        stroke="var(--color-securityScore)"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vulnerabilities">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerabilities Detected</CardTitle>
              <CardDescription>
                Number of security vulnerabilities found over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="vulnerabilities"
                        fill="var(--color-vulnerabilities)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="patches">
          <Card>
            <CardHeader>
              <CardTitle>Patches Applied</CardTitle>
              <CardDescription>
                Security patches and fixes applied over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="patches"
                        fill="var(--color-patches)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetricsDashboard;
