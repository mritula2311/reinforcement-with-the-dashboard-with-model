"use client";

import { useState, useEffect } from 'react';
import type { Incident } from '@/lib/types';
import { AppHeader } from '@/components/layout/AppHeader';
import { IncidentList } from '@/components/dashboards/IncidentList';
import { PatientVitals } from '@/components/dashboards/medical/PatientVitals';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function MedicalDashboard({ initialIncidents }: { initialIncidents: Incident[] }) {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(initialIncidents[0]?.id || null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch('/api/incidents');
        if (!response.ok) {
          throw new Error('Failed to fetch incidents');
        }
        const newIncidents: Incident[] = await response.json();
        setIncidents(newIncidents);

        const currentSelectedStillExists = newIncidents.some(inc => inc.id === selectedIncidentId);

        if (!currentSelectedStillExists) {
            setSelectedIncidentId(newIncidents[0]?.id || null);
        }
      } catch (error) {
        console.error("Error fetching dynamic incident data:", error);
      }
    };

    const intervalId = setInterval(fetchIncidents, 5000);

    return () => clearInterval(intervalId);
  }, [selectedIncidentId]);

  const selectedIncident = incidents.find(inc => inc.id === selectedIncidentId);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
            <h2 className="text-xl font-semibold">Active Incidents</h2>
          </div>
          <div className="flex-1">
            <ScrollArea className="h-[calc(100vh-4rem)]">
              <IncidentList 
                incidents={incidents}
                selectedIncidentId={selectedIncidentId}
                onSelectIncident={setSelectedIncidentId}
              />
            </ScrollArea>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <AppHeader
          serviceType="Medical"
          incidents={incidents}
          selectedIncidentId={selectedIncidentId}
          onSelectIncident={setSelectedIncidentId}
        />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-gray-50 dark:bg-background">
            {selectedIncident ? (
              <PatientVitals incident={selectedIncident} key={selectedIncident.id} />
            ) : (
                <Card className="flex flex-col items-center justify-center h-full text-center p-8 shadow-none border-dashed">
                    <CardHeader>
                        <div className="mx-auto bg-muted p-3 rounded-full mb-4">
                            <Stethoscope className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <CardTitle>No Incident Selected</CardTitle>
                        <CardDescription>Please select an incident to view patient vitals.</CardDescription>
                    </CardHeader>
                </Card>
            )}
        </main>
      </div>
    </div>
  );
}
