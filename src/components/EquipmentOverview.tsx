import { AlertTriangle, Clock } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Equipment } from "../types";

export default function EquipmentOverview({ equipment }: { equipment: Equipment[] }) {
  const statusPriority = { critical: 0, warning: 1, maintenance: 2, operational: 3 };
  const sortedEquipment = [...equipment].sort(
    (a, b) => statusPriority[a.status] - statusPriority[b.status]
  );

  return (
    <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-lg font-medium">Equipment Overview</h2>
        <span className="text-sm text-gray-500">{equipment.length} machines monitored</span>
      </div>

      <div className="divide-y">
        {sortedEquipment.map((item) => (
          <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <StatusBadge status={item.status} />
                <h3 className="font-medium">{item.name}</h3>
              </div>
              <p className="text-sm text-gray-500">{item.type} • {item.location}</p>
            </div>

            <div className="min-w-40 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <AlertTriangle size={16} />
                {item.predictedFailure ? (
                  <span>Failure predicted {item.predictedFailure.toLocaleDateString()}</span>
                ) : (
                  <span>No immediate failure predicted</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-gray-600 mt-1">
                <Clock size={16} />
                <span>Next maintenance {item.nextMaintenance.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
