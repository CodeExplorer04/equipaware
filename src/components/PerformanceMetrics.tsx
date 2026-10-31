import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";
import { PerformanceMetric } from "../types";

export default function PerformanceMetrics({ metrics }: { metrics: PerformanceMetric[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <div key={metric.name} className="bg-white rounded-xl shadow p-4">
          <div className="text-sm text-gray-500">{metric.name}</div>
          <div className="mt-1 flex items-baseline gap-2">
            <div className="text-2xl font-semibold">{metric.value}</div>
            {metric.unit && <span className="text-sm text-gray-500">{metric.unit}</span>}
          </div>
          <div className="mt-2 text-xs font-medium flex items-center">
            {metric.trend === "up" ? (
              <ArrowUpIcon className="h-3 w-3 mr-1 text-green-600" />
            ) : metric.trend === "down" ? (
              <ArrowDownIcon className="h-3 w-3 mr-1 text-red-600" />
            ) : (
              <ArrowRightIcon className="h-3 w-3 mr-1 text-gray-400" />
            )}
            <span>{metric.change ?? 0}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
