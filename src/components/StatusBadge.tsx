import { EquipmentStatus } from "../types";

export default function StatusBadge({ status }: { status: EquipmentStatus }) {
  const styles = {
    critical: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    maintenance: "bg-blue-100 text-blue-700",
    operational: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
}