"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Shield, LogOut, PanelLeft } from "lucide-react";
import Link from "next/link";
import { IncidentList } from "../dashboards/IncidentList";
import type { Incident } from "@/lib/types";

export function AppHeader({ 
  serviceType,
  incidents,
  selectedIncidentId,
  onSelectIncident
}: { 
  serviceType: "Police" | "Medical";
  incidents: Incident[];
  selectedIncidentId: string | null;
  onSelectIncident: (id: string) => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-background px-4 shadow-sm md:px-6">
       <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle incidents menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
             <div className="flex h-16 items-center border-b px-6">
                <h2 className="text-xl font-semibold">Active Incidents</h2>
            </div>
            <IncidentList 
              incidents={incidents}
              selectedIncidentId={selectedIncidentId}
              onSelectIncident={onSelectIncident}
            />
          </SheetContent>
        </Sheet>
      
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold hidden sm:inline-block">Crash Guard</span>
        </Link>
      </div>
      
      <div className="flex w-full items-center gap-4">
          <div className="ml-auto text-center flex-1">
              <h1 className="text-xl font-semibold">{serviceType} Dashboard</h1>
          </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full flex-shrink-0">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="User Menu" data-ai-hint="person" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
                <Link href="/police-dashboard">Police Dashboard</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
                <Link href="/medical-dashboard">Medical Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
