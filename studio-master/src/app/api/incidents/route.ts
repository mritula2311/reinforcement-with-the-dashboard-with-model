
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'incidents.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const incidents = JSON.parse(jsonData);
    return NextResponse.json(incidents);
  } catch (error) {
    console.error('Failed to read incidents data:', error);
    return NextResponse.json({ message: 'Error fetching incidents' }, { status: 500 });
  }
}
