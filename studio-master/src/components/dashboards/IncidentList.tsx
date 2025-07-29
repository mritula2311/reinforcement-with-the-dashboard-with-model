"use client";

import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Incident } from "@/lib/types";

interface IncidentListProps {
  incidents: Incident[];
  selectedIncidentId: string | null;
  onSelectIncident: (id: string) => void;
}

const severityVariantMap = {
  Low: "default",
  Medium: "secondary",
  High: "outline",
  Critical: "destructive",
} as const;

const severityIconMap = {
    Low: <ShieldCheck className="w-4 h-4 text-green-500" />,
    Medium: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
    High: <AlertTriangle className="w-4 h-4 text-orange-500" />,
    Critical: <AlertTriangle className="w-4 h-4 text-destructive" />,
};

export function IncidentList({ incidents, selectedIncidentId, onSelectIncident }: IncidentListProps) {
  return (
    <nav className="grid items-start p-2 text-sm font-medium gap-1">
        {incidents.map((incident) => (
          <button
            key={incident.id}
            onClick={() => onSelectIncident(incident.id)}
            className={cn(
              "flex flex-col items-start gap-1 rounded-lg p-3 text-left text-sm transition-all hover:bg-muted border-l-4 border-transparent",
              selectedIncidentId === incident.id
                ? "bg-muted border-primary text-primary"
                : "text-muted-foreground"
            )}
            aria-pressed={selectedIncidentId === incident.id}
          >
             <div className="flex w-full items-start justify-between">
                <div className="flex items-center gap-2">
                    {severityIconMap[incident.severity]}
                    <span className="font-semibold text-primary">{incident.location}</span>
                </div>
                <Badge className="ml-auto" variant={severityVariantMap[incident.severity]}>{incident.severity}</Badge>
            </div>
            <div className="flex items-center gap-4 pl-6 text-xs">
                <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{incident.coords.lat}, {incident.coords.lng}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{incident.timestamp}</span>
                </div>
            </div>
          </button>
        ))}
    </nav>
  );
}
