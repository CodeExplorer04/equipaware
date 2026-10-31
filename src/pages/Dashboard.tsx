import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Activity, 
  ShieldAlert, 
  Wrench, 
  Send, 
  LogOut, 
  RefreshCw, 
  Sliders,
  CheckCircle2
} from "lucide-react";
import PerformanceMetrics from "../components/PerformanceMetrics";
import EquipmentOverview from "../components/EquipmentOverview";
import PredictiveMaintenance from "../components/PredictiveMaintenance";
import { Equipment, PerformanceMetric, Prediction } from "../types";

const initialEquipment: Equipment[] = [
  {
    id: "EQ-101",
    name: "Hydraulic Press C2",
    type: "Heavy Stamping Press",
    location: "Bay 3 - Metal Fabrication",
    status: "critical",
    healthScore: 42,
    predictedFailure: new Date(Date.now() + 48 * 3600 * 1000),
    nextMaintenance: new Date(Date.now() + 72 * 3600 * 1000)
  },
  {
    id: "EQ-102",
    name: "CNC Milling Center 4",
    type: "5-Axis Precision Machining",
    location: "Bay 1 - Precision Milling",
    status: "warning",
    healthScore: 68,
    predictedFailure: new Date(Date.now() + 120 * 3600 * 1000),
    nextMaintenance: new Date(Date.now() + 96 * 3600 * 1000)
  },
  {
    id: "EQ-103",
    name: "Centrifugal Pump A1",
    type: "Coolant Distribution",
    location: "Utility Basement 2",
    status: "operational",
    healthScore: 94,
    nextMaintenance: new Date(Date.now() + 360 * 3600 * 1000)
  },
  {
    id: "EQ-104",
    name: "Rotary Air Compressor 03",
    type: "Pneumatics Supply",
    location: "Compressor House B",
    status: "operational",
    healthScore: 91,
    nextMaintenance: new Date(Date.now() + 240 * 3600 * 1000)
  },
  {
    id: "EQ-105",
    name: "Steam Turbine B",
    type: "Cogeneration Power",
    location: "Turbine Hall 1",
    status: "maintenance",
    healthScore: 58,
    nextMaintenance: new Date(Date.now() + 24 * 3600 * 1000)
  }
];

const initialPredictions: Prediction[] = [
  {
    id: "PRED-01",
    equipmentId: "EQ-101 (Hydraulic Press C2)",
    failureType: "Main Hydraulic Cylinder Seal Rupture",
    probability: 0.88,
    estimatedTimeToFailure: "36 - 48 Hours",
    impact: {
      severity: "high",
      type: "Line Stoppage",
      description: "Loss of hydraulic line pressure causing immediate safety halt to Bay 3 press operations.",
      estimatedCost: 14500,
      downtime: "18 Hours"
    },
    recommendedAction: "Isolate Bay 3 pressure manifold and replace high-pressure nitrile seals immediately."
  },
  {
    id: "PRED-02",
    equipmentId: "EQ-102 (CNC Milling 4)",
    failureType: "Spindle Bearing Thermal Fatigue",
    probability: 0.64,
    estimatedTimeToFailure: "5 - 7 Days",
    impact: {
      severity: "medium",
      type: "Precision Degradation",
      description: "Excessive micro-vibration causing dimensional out-of-tolerance rejects.",
      estimatedCost: 6200,
      downtime: "6 Hours"
    },
    recommendedAction: "Schedule lubrication replenish and re-balance primary high-speed ceramic bearings."
  }
];

export default function Dashboard() {
  const [equipment] = useState<Equipment[]>(initialEquipment);
  const [predictions] = useState<Prediction[]>(initialPredictions);

  // ML Live Diagnostic Playground State
  const [temperature, setTemperature] = useState(88);
  const [vibration, setVibration] = useState(16);
  const [operatingHours, setOperatingHours] = useState(3800);
  const [calculatedRisk, setCalculatedRisk] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [telegramSent, setTelegramSent] = useState(false);

  const metrics: PerformanceMetric[] = [
    { name: "Plant Health Index", value: "87.4%", unit: "Avg", trend: "up", change: 3.2 },
    { name: "Critical Units", value: 1, unit: "Machinery", trend: "down", change: -1 },
    { name: "Mean Time to Repair", value: "4.2", unit: "Hours", trend: "down", change: -8.5 },
    { name: "Predicted Savings", value: "$42.8k", unit: "Q3", trend: "up", change: 14.0 }
  ];

  const handleRunDiagnostics = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Replicate the ML scoring function from ml/app.py
      const score = (50 + 40 + temperature + vibration + operatingHours / 100) / 500;
      const risk = Math.max(0.0, Math.min(1.0, score));
      setCalculatedRisk(risk);
      setIsSimulating(false);
      setTelegramSent(false);
    }, 600);
  };

  const handleSendTelegramTest = () => {
    setTelegramSent(true);
    setTimeout(() => setTelegramSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg shadow-sm">
                <Activity size={22} />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-slate-900">EquipAware</span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  IIoT Predictive v2.4
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                to="/change-password"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:inline-block"
              >
                Settings
              </Link>
              <Link 
                to="/login"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <LogOut size={16} />
                <span>Log In</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Page Title & Status Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Plant Operations Command Center</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time condition telemetry and AI failure risk forecasting.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              <span className="w-2 h-2 mr-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Live Telemetry Stream Active
            </span>
          </div>
        </div>

        {/* Global Performance Metrics */}
        <PerformanceMetrics metrics={metrics} />

        {/* Live ML Simulation & Interactive Diagnostics Panel */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-1">
                <Sliders size={18} />
                <span>Interactive Telemetry & ML Scoring Sandbox</span>
              </div>
              <h2 className="text-xl font-bold">Simulate Machine Degradation In Real-Time</h2>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Adjust sensor parameters below to simulate mechanical wear and run the Flask ML failure prediction engine in real-time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRunDiagnostics}
                disabled={isSimulating}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <RefreshCw size={16} className={isSimulating ? "animate-spin" : ""} />
                {isSimulating ? "Evaluating..." : "Run ML Diagnostics"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-white/10">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Core Temperature</span>
                <span className="text-white font-mono">{temperature}°C</span>
              </div>
              <input 
                type="range" min="40" max="130" value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[11px] text-slate-400">Normal operating zone: 50°C - 75°C</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Vibration Amplitude</span>
                <span className="text-white font-mono">{vibration} mm/s</span>
              </div>
              <input 
                type="range" min="2" max="35" value={vibration}
                onChange={(e) => setVibration(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[11px] text-slate-400">Normal ISO range: &lt; 8 mm/s</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Duty Hours Since Service</span>
                <span className="text-white font-mono">{operatingHours} hrs</span>
              </div>
              <input 
                type="range" min="500" max="6000" step="100" value={operatingHours}
                onChange={(e) => setOperatingHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[11px] text-slate-400">Service recommended every 2500 hrs</span>
            </div>
          </div>

          {calculatedRisk !== null && (
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${calculatedRisk > 0.7 ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400">Predicted Failure Risk</div>
                  <div className="text-xl font-bold flex items-center gap-2">
                    <span>{(calculatedRisk * 100).toFixed(1)}% Probability</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${calculatedRisk > 0.7 ? "bg-red-500/20 text-red-300 border border-red-500/30" : "bg-emerald-500/20 text-emerald-300"}`}>
                      {calculatedRisk > 0.7 ? "HIGH RISK - URGENT ACTION" : "NORMAL DEGRADATION"}
                    </span>
                  </div>
                </div>
              </div>

              {calculatedRisk > 0.7 && (
                <button
                  onClick={handleSendTelegramTest}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                  {telegramSent ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Telegram Alert Dispatched!</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Dispatch Telegram Alert</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Equipment & Predictions Main Split */}
        <div className="grid grid-cols-12 gap-8 mb-8">
          <EquipmentOverview equipment={equipment} />

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow p-5 border border-slate-100">
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <Wrench size={18} className="text-blue-600" />
                Active Maintenance Schedule
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                  <div className="font-semibold text-red-800">Hydraulic Press C2</div>
                  <div className="text-xs text-red-600 mt-0.5">High-Pressure Seal Replacement</div>
                  <div className="text-xs text-slate-500 mt-1">Scheduled: In 2 Days • Tech: Team Alpha</div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <div className="font-semibold text-amber-800">CNC Milling Center 4</div>
                  <div className="text-xs text-amber-600 mt-0.5">Bearing Lubrication & Balance</div>
                  <div className="text-xs text-slate-500 mt-1">Scheduled: In 4 Days • Tech: Team Beta</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Maintenance Detail Section */}
        <PredictiveMaintenance predictions={predictions} />
      </main>
    </div>
  );
}
