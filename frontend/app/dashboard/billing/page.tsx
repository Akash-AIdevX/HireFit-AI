"use client";

import { useEffect, useState } from "react";
import { checkout, getBilling, cancelSubscription } from "@/lib/payment";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Banknote, ChevronRight, X, CheckCircle2, Sparkles } from "lucide-react";

export default function BillingPage() {
  const [billing, setBilling] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function loadBilling() {
    const data = await getBilling();
    setBilling(data);
  }

  useEffect(() => {
    loadBilling();
  }, []);

  async function upgrade() {
    try {
      setLoading(true);
      const data = await checkout();
      window.location.href = data.url;
    } catch {
      toast.error("Unable to start checkout. Verify network connection.");
    } finally {
      setLoading(false);
    }
  }

  async function cancel() {
    try {
      const data = await cancelSubscription();
      toast.success(data.message);
      loadBilling();
    } catch {
      toast.error("Unable to cancel. Access secure gateway.");
    }
  }

  if (!billing) {
    return (
      <div className="relative min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center font-sans">
        <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
        <p className="mt-4 text-sm text-cyan-400/70 tracking-wide">Syncing secure billing gateway...</p>
      </div>
    );
  }

  const isFree = billing.plan.toLowerCase() === "free";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0fbe] text-white font-sans flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.03),transparent,rgba(255,255,255,0.02))]" />
      </div>

      {/* Dynamic Billing Content Panel */}
      <div className="relative z-10 w-full max-w-4xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col p-8 md:p-12 lg:p-16">
        <header className="flex items-center justify-between gap-6 pb-12 mb-12 border-b border-white/[0.06]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Account Overview</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              Billing & Plans
            </h2>
          </div>
          
          <span className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.2)] ${
            billing.subscription_status.toLowerCase() === 'active' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-white/5 border-white/10 text-white/70'
          }`}>
            {billing.subscription_status.toUpperCase()}
          </span>
        </header>

        {/* Action Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 grow">
          
          {/* Current Plan Card */}
          <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 text-white flex flex-col justify-between shadow-2xl backdrop-blur-md">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/40 mb-4">Current Subscription</p>
              <p className="text-sm font-semibold text-white/60 mb-1">Tier</p>
              <h3 className="text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                {billing.plan}
              </h3>
              <p className="text-sm text-white/40">Secure provisioning active.</p>
            </div>

            {isFree && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-cyan-400/80 hover:text-cyan-400 font-medium flex items-center gap-1 p-0 h-auto text-sm self-start mt-6 transition-colors bg-transparent border-none cursor-pointer outline-none"
              >
                View full benefits <ChevronRight className="w-4 h-4"/>
              </button>
            )}
          </div>

          {/* Support/Usage Status Card */}
          <div className="p-10 rounded-3xl bg-white/[0.01] border border-white/[0.03] text-white flex flex-col justify-between backdrop-blur-md">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/40 mb-4">API Status</p>
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-cyan-400/10 text-cyan-400 mb-6">
                <Banknote className="w-8 h-8"/>
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-1">Secure Billing Pipeline</h3>
              <p className="text-sm text-white/50">Active connection established via secure encryption layers.</p>
            </div>
          </div>
        </div>

        {/* Action Footer section with premium buttons */}
        <footer className="pt-12 mt-12 border-t border-white/[0.06] flex flex-col sm:flex-row justify-end items-center gap-4">
          {isFree ? (
            /* --- AI / Sparkle Themed Glowing Action Button --- */
            <div className="relative group w-full sm:w-auto overflow-hidden rounded-2xl p-[1px] transition-all duration-300 active:scale-[0.98]">
              {/* Rotating/pulsing background border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-blue-600 opacity-80 blur-sm group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-blue-500" />
              
              <Button
                onClick={upgrade}
                disabled={loading}
                className="relative w-full sm:w-auto px-10 h-14 bg-[#0a0a0f]/90 text-white hover:bg-[#0a0a0f]/40 font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-xl flex items-center justify-center gap-2 tracking-wide border-0 shadow-[0_0_30px_rgba(6,182,212,0.25)] group-hover:shadow-[0_0_40px_rgba(217,70,239,0.4)]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Connecting Intellect...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-400 group-hover:animate-spin duration-1000" />
                    <span>Upgrade to Pro Plan</span>
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Button
              onClick={cancel}
              className="w-full sm:w-auto px-10 h-14 bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98] shadow-[0_8px_32px_rgba(239,68,68,0.1)]"
            >
              Cancel Subscription
            </Button>
          )}
        </footer>
      </div>

      {/* --- Premium Glassmorphic Benefits Modal Pop-up --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div 
            className="relative w-full max-w-md p-8 bg-[#0d0d14]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Plan Details</span>
              <h3 className="text-2xl font-extrabold text-white mt-1">Free Tier Benefits</h3>
              <p className="text-sm text-white/40 mt-1">Features currently included in your lifetime free package.</p>
            </div>

            {/* Benefit Items List */}
            <div className="space-y-4 my-6">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Lifeline Free Plan</h4>
                  <p className="text-xs text-white/50 mt-0.5">Basic dashboard components completely free forever.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Standard Resume Review</h4>
                  <p className="text-xs text-white/50 mt-0.5">Access foundational structured templates.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Secure Cloud Storage</h4>
                  <p className="text-xs text-white/50 mt-0.5">Safely sync persistent build properties and file records.</p>
                </div>
              </div>
            </div>

            {/* Modal Action CTA with matching AI style */}
            <div className="relative group w-full overflow-hidden rounded-xl p-[1px] mt-4">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-blue-600 opacity-70 blur-xs" />
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  upgrade();
                }}
                className="relative w-full h-12 bg-[#0d0d14] text-white hover:bg-transparent font-semibold rounded-xl transition-all duration-300 border-0"
              >
                Unlock Pro Features instead
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}