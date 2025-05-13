import React from "react";
import { useNavigate } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Examples = () => {
  return (
    <div className="min-h-screen bg-devdark text-white">
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Real-World Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PerformanceMetrics />
          </div>
        </div>
      </section>
    </div>
  );
};

const PerformanceMetrics = () => {
  const navigate = useNavigate();
  
  const data = [
    { month: "Jan", securityScore: 65, vulnerabilities: 12 },
    { month: "Feb", securityScore: 68, vulnerabilities: 10 },
    { month: "Mar", securityScore: 75, vulnerabilities: 8 },
    { month: "Apr", securityScore: 73, vulnerabilities: 9 },
    { month: "May", securityScore: 80, vulnerabilities: 6 },
  ];

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
  };
  
  const handleChartClick = () => {
    navigate('/metrics-dashboard');
  };

  return (
    <div className="mb-8">
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleChartClick}>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Security score and vulnerabilities over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="securityScore"
                    stroke="var(--color-securityScore)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="vulnerabilities"
                    stroke="var(--color-vulnerabilities)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="inline-block bg-devdarker rounded-md px-3 py-1 text-sm">
              Click to view detailed dashboard
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Examples;
