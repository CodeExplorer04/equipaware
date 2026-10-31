import { AlertTriangle, Clock, DollarSign, AlertOctagon, GaugeCircle, TrendingDown } from "lucide-react";
import { Prediction } from "../types";

export default function PredictiveMaintenance({ predictions }: { predictions: Prediction[] }) {
  const sortedPredictions = [...predictions].sort((a, b) => b.probability - a.probability);
  const highRiskPredictions = sortedPredictions.slice(0, 3);

  return (
    <div className="col-span-12 bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <GaugeCircle className="h-5 w-5 text-blue-600" />
          ML Predictive Maintenance Forecasts
        </h2>
        <span className="text-sm text-gray-500">{predictions.length} predictions</span>
      </div>

      {predictions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6">
          <GaugeCircle className="h-16 w-16 text-green-600 mb-3" />
          <p className="text-xl font-medium">No failures predicted</p>
          <p className="text-gray-500">All equipment is operating normally</p>
        </div>
      ) : (
        <div className="space-y-6 mt-4">
          {highRiskPredictions.map((prediction) => (
            <div key={prediction.id} className="border rounded-md p-4 bg-white shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium text-lg text-blue-700">{prediction.failureType}</h3>
                  <p className="text-sm text-gray-500">Equipment ID {prediction.equipmentId}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Failure probability</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded">
                      <div className="h-2 rounded bg-red-500" style={{ width: `${prediction.probability * 100}%` }} />
                    </div>
                    <span className="text-sm font-medium">{Math.round(prediction.probability * 100)}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>{prediction.estimatedTimeToFailure}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-md border p-3">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <AlertTriangle size={16} className="mr-1 text-yellow-500" />
                    Impact Analysis
                  </h4>
                  <p className="text-sm text-gray-600">{prediction.impact.description}</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="text-red-500" />
                      <span className="text-sm">{prediction.impact.estimatedCost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingDown size={14} className="text-red-500" />
                      <span className="text-sm">{prediction.impact.downtime}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-3">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <AlertOctagon size={16} className="mr-1 text-red-500" />
                    Risk Factors
                  </h4>
                  <ul className="text-sm list-disc pl-5 space-y-1 text-gray-600">
                    <li>Abnormal vibration patterns</li>
                    <li>Increased power consumption</li>
                    <li>Temperature fluctuations</li>
                  </ul>
                </div>

                <div className="rounded-md border p-3">
                  <h4 className="text-sm font-medium mb-2">Recommended Action</h4>
                  <p className="text-sm text-gray-600">{prediction.recommendedAction}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
