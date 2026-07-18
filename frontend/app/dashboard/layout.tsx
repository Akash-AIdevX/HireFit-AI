"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    // Replaced min-h-screen with h-screen to strictly define viewport height boundaries
    <div className="relative flex h-screen w-screen bg-[#07070a] text-white overflow-hidden">
      
      {/* 
        High-Visibility Ambient Background
        Boosted opacity values (35% - 40%) so the neon clusters cut cleanly through the blur panels
      */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Left Cyan Cluster */}
        <div className="absolute -left-20 top-20 h-[450px] w-[450px] rounded-full bg-cyan-400/35 blur-[130px] animate-pulse duration-[6000ms]" />
        
        {/* Right Fuchsia Cluster */}
        <div className="absolute -right-20 top-40 h-[500px] w-[500px] rounded-full bg-fuchsia-500/35 blur-[140px] animate-pulse duration-[8000ms]" />
        
        {/* Center Blue Cluster */}
        <div className="absolute bottom-10 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/40 blur-[120px] animate-pulse duration-[7000ms]" />
        
        {/* Global Mesh Gradients for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.02),transparent,rgba(255,255,255,0.01))]" />
      </div>

      {/* Interactive Interface Elements Layer (z-10) */}
      <Sidebar />

      {/* Main content viewport area constrained to layout container heights */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Topbar />
        
        {/* Dynamic page context display wrapper with isolated internal scrolling */}
        <div className="p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}