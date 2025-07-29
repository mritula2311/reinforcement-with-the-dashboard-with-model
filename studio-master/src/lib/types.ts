export type Incident = {
  id: string;
  location: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  timestamp: string;
  coords: {
    lat: number;
    lng: number;
  };
  sensorData: {
    impact: number; // in G-force
    speed: number; // in km/h
  };
  vitals?: {
    heartRate: number;
    bloodPressure: string;
    respirationRate: number;
  };
};
