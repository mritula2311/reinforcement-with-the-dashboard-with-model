import { MedicalDashboard } from "@/components/dashboards/medical/MedicalDashboard";
import type { Incident } from "@/lib/types";
import fs from 'fs/promises';
import path from 'path';

async function getIncidents(): Promise<Incident[]> {
    const filePath = path.join(process.cwd(), 'src', 'data', 'incidents.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const incidents = JSON.parse(jsonData);
    return incidents;
}

export default async function MedicalDashboardPage() {
    const incidents = await getIncidents();
    return <MedicalDashboard initialIncidents={incidents} />;
}
