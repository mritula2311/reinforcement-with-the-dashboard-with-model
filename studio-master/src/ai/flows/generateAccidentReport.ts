'use server';
/**
 * @fileOverview Generates a role-specific accident report using AI.
 *
 * - generateAccidentReport - A function that generates the report.
 * - GenerateAccidentReportInput - The input type for the function.
 * - GenerateAccidentReportOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import type { Incident } from '@/lib/types';
import { z } from 'genkit';

const GenerateAccidentReportInputSchema = z.object({
  incident: z.object({
    location: z.string(),
    severity: z.string(),
    sensorData: z.object({
      impact: z.number(),
      speed: z.number(),
    }),
    vitals: z
      .object({
        heartRate: z.number(),
        bloodPressure: z.string(),
        respirationRate: z.number(),
      })
      .optional(),
  }),
  role: z.enum(['Police', 'Medical']),
});
export type GenerateAccidentReportInput = z.infer<typeof GenerateAccidentReportInputSchema>;

const GenerateAccidentReportOutputSchema = z.object({
  report: z.string().describe('The generated accident report.'),
});
export type GenerateAccidentReportOutput = z.infer<typeof GenerateAccidentReportOutputSchema>;

export async function generateAccidentReport(
  input: GenerateAccidentReportInput
): Promise<GenerateAccidentReportOutput> {
  return generateAccidentReportFlow(input);
}

const policePrompt = ai.definePrompt({
  name: 'generatePoliceAccidentReportPrompt',
  input: { schema: GenerateAccidentReportInputSchema },
  output: { schema: GenerateAccidentReportOutputSchema },
  prompt: `You are an expert accident analyst. Based on the provided data, generate a concise report for a police officer.

**Incident Data:**
- Location: {{{incident.location}}}
- Severity: {{{incident.severity}}}
- Impact Force: {{{incident.sensorData.impact}}} G
- Speed at Impact: {{{incident.sensorData.speed}}} km/h
{{#if incident.vitals}}
- Heart Rate: {{{incident.vitals.heartRate}}} BPM
- Blood Pressure: {{{incident.vitals.bloodPressure}}} mmHg
- Respiration Rate: {{{incident.vitals.respirationRate}}} breaths/min
{{/if}}

**Instructions:**
Generate a report for a police officer. Focus on the situation from a law enforcement and traffic management perspective. Include:
1.  A brief summary of the accident's severity based on impact and speed.
2.  Potential traffic implications and suggestions (e.g., road closure, diversion).
3.  Likely need for additional emergency services (e.g., fire, heavy rescue).

Produce the output as a single block of text for the report.
`,
});

const medicalPrompt = ai.definePrompt({
  name: 'generateMedicalAccidentReportPrompt',
  input: { schema: GenerateAccidentReportInputSchema },
  output: { schema: GenerateAccidentReportOutputSchema },
  prompt: `You are an expert accident analyst. Based on the provided data, generate a concise report for a medical first responder.

**Incident Data:**
- Location: {{{incident.location}}}
- Severity: {{{incident.severity}}}
- Impact Force: {{{incident.sensorData.impact}}} G
- Speed at Impact: {{{incident.sensorData.speed}}} km/h
{{#if incident.vitals}}
- Heart Rate: {{{incident.vitals.heartRate}}} BPM
- Blood Pressure: {{{incident.vitals.bloodPressure}}} mmHg
- Respiration Rate: {{{incident.vitals.respirationRate}}} breaths/min
{{/if}}

**Instructions:**
Generate a report for a medical first responder. Focus on the likely medical situation. Include:
1.  An assessment of potential injuries based on the G-force and speed.
2.  Key vitals to watch and their implications.
3.  Recommendations for pre-arrival preparation (e.g., prepare trauma bay, specific equipment).

Produce the output as a single block of text for the report.
`,
});

const generateAccidentReportFlow = ai.defineFlow(
  {
    name: 'generateAccidentReportFlow',
    inputSchema: GenerateAccidentReportInputSchema,
    outputSchema: GenerateAccidentReportOutputSchema,
  },
  async (input) => {
    let selectedPrompt = policePrompt;
    if (input.role === 'Medical') {
      selectedPrompt = medicalPrompt;
    }
    const { output } = await selectedPrompt(input);
    return output!;
  }
);
