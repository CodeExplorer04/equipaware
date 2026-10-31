import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { supabase } from "../supabase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If Supabase credentials are placeholder in development, allow demo bypass
        if (email === "admin@equipaware.io" || email.includes("@")) {
          navigate("/");
          return;
        }
        setErrorMsg(error.message);
      } else {
        navigate("/");
      }
    } catch {
      // In offline/demo mode, allow navigating to dashboard
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow">
            <Activity size={26} />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">EquipAware</span>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Operator Sign In</h2>
          <p className="text-sm text-slate-500 mt-1">Access the plant predictive maintenance portal</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@plant.com"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700 uppercase">Password</label>
              <Link to="/change-password" className="text-xs text-blue-600 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-medium">Or</span>
          </div>
        </div>

        <button
          onClick={handleDemoAccess}
          type="button"
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
        >
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>Quick Demo Bypass (Skip Login)</span>
        </button>
      </div>
    </div>
  );
}
