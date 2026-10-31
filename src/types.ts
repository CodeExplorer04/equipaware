export type EquipmentStatus = "critical" | "warning" | "maintenance" | "operational";

export interface Equipment {
  id: string;
  name: string;
  type: string;
  location: string;
  status: EquipmentStatus;
  healthScore: number;
  predictedFailure?: Date;
  nextMaintenance: Date;
}

export interface PerformanceMetric {
  name: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  change?: number;
}

export interface Prediction {
  id: string;
  equipmentId: string;
  failureType: string;
  probability: number;
  estimatedTimeToFailure: string;
  impact: {
    severity: "low" | "medium" | "high";
    type: string;
    description: string;
    estimatedCost: number;
    downtime: string;
  };
  recommendedAction: string;
}