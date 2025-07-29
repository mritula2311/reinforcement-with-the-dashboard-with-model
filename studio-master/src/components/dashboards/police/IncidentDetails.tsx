
"use client";

import type { Incident } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Gauge, Wind } from 'lucide-react';
import MapComponent from '../GoogleMap';
import { AccidentReport } from '../AccidentReport';

export function IncidentDetails({ incident }: { incident: Incident }) {
  if (!incident) {
    return null;
  }
  
  return (
    <Card className="h-full overflow-hidden border-0 shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Incident Details: {incident.id}</CardTitle>
                <CardDescription>{incident.location}</CardDescription>
            </div>
            <Button variant="accent" size="lg" className="flex-shrink-0">
                <AlertTriangle className="mr-2 h-4 w-4" /> Alert Rescue Teams
            </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 p-6">
                <div className="relative h-96 w-full rounded-lg overflow-hidden border shadow-inner">
                    <MapComponent center={incident.coords} />
                </div>
            </div>
            <div className="lg:col-span-1 bg-muted/10 p-6 space-y-6 border-l">
                <h3 className="text-lg font-semibold text-foreground">Vehicle Sensor Data</h3>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Impact Force</CardTitle>
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-3xl font-bold">{incident.sensorData.impact} G</div>
                    <p className="text-xs text-muted-foreground">G-force reading</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Speed at Impact</CardTitle>
                    <Wind className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-3xl font-bold">{incident.sensorData.speed} km/h</div>
                    <p className="text-xs text-muted-foreground">Vehicle speed</p>
                    </CardContent>
                </Card>
                <AccidentReport incident={incident} serviceType="Police" />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
