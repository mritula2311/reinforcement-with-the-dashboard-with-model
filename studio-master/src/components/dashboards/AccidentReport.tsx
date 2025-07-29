"use client";

import { useState, useEffect } from 'react';
import type { Incident } from '@/lib/types';
import { generateAccidentReport } from '@/ai/flows/generateAccidentReport';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot } from 'lucide-react';

interface AccidentReportProps {
  incident: Incident;
  serviceType: "Police" | "Medical";
}

export function AccidentReport({ incident, serviceType }: AccidentReportProps) {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getReport() {
      if (!incident) return;
      setLoading(true);
      setReport(null);
      try {
        const result = await generateAccidentReport({ incident, role: serviceType });
        setReport(result.report);
      } catch (error) {
        console.error("Failed to generate report:", error);
        setReport("Could not generate AI summary for this incident.");
      } finally {
        setLoading(false);
      }
    }
    getReport();
  }, [incident.id, serviceType]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">AI Summary</CardTitle>
        <Bot className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[70%]" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        )}
        {report && <p className="text-sm text-muted-foreground whitespace-pre-wrap">{report}</p>}
      </CardContent>
    </Card>
  );
}
