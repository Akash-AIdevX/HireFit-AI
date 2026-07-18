"use client";

import {
  FileText,
  Crown,
  ArrowRight,
  Upload,
  Clock,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
  uploadResume,
  analyzeResume,
  getDashboardStats,
} from "@/lib/review";

export default function Dashboard() {

  const { user } = useAuth();

  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------------- Dashboard ---------------- */

  const [stats, setStats] = useState<any>(null);

  const [reviewId, setReviewId] =
    useState<number | null>(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [analyzing, setAnalyzing] =
    useState(false);

  /* ---------------- Statistics ---------------- */

  const reviewsTotal =
    user?.plan === "Pro"
        ? "∞"
        : 3;

  const reviewsRemaining =
    stats?.remaining_reviews === "Unlimited"
      ? "∞"
      : stats?.remaining_reviews ?? 3;

  const reviewsUsed =
    stats?.total_reviews ?? 0;

  /* ---------------- Load Dashboard ---------------- */

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {

      const data = await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.log(error);

    }
  }

  /* ---------------- Upload Resume ---------------- */

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0];

    if (!file) return;

    try {

      setUploading(true);

      const result = await uploadResume(file);

      setReviewId(result.review_id);

      toast.success(
        "Resume uploaded successfully"
      );

      loadDashboard();

    } catch (error: any) {

      toast.error(
        error.response?.data?.detail ??
          "Upload failed"
      );

    } finally {

      setUploading(false);

    }
  }

  /* ---------------- Analyze Resume ---------------- */

  async function handleAnalyze() {

    if (!reviewId) {

      toast.error("Upload a resume first");

      return;
    }

    if (!jobDescription.trim()) {

      toast.error(
        "Paste the Job Description"
      );

      return;
    }

    try {

      setAnalyzing(true);

      const result =
        await analyzeResume({

          review_id: reviewId,

          job_description:
            jobDescription,

        });

      router.push(
        "/dashboard/result?review=" +
          encodeURIComponent(
            JSON.stringify(
              result.review
            )
          )
      );

    } catch (error: any) {

      toast.error(
        error.response?.data?.detail ??
          "Analysis failed"
      );

    } finally {

      setAnalyzing(false);

    }
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#0a0a0fbe] text-white p-6 sm:p-10"
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
      }}
    >
      {/* Animated neon gradient field, Apple Playground style */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="blob blob-blue absolute left-[6%] top-[8%] h-[460px] w-[460px] rounded-full opacity-70 blur-[110px]" />
        <div className="blob blob-purple absolute right-[8%] top-[14%] h-[420px] w-[420px] rounded-full opacity-60 blur-[110px]" />
        <div className="blob blob-pink absolute left-[30%] top-[45%] h-[480px] w-[480px] rounded-full opacity-55 blur-[120px]" />
        <div className="blob blob-cyan absolute right-[20%] bottom-[10%] h-[380px] w-[380px] rounded-full opacity-55 blur-[100px]" />
        <div className="blob blob-orange absolute left-[10%] bottom-[5%] h-[360px] w-[360px] rounded-full opacity-45 blur-[100px]" />
        <div className="blob blob-green absolute right-[38%] top-[2%] h-[320px] w-[320px] rounded-full opacity-40 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-1 text-[34px] font-semibold leading-tight tracking-[-0.02em] text-white">
              Welcome back, {user?.full_name?.split(" ")[0] || "there"}
            </h1>
            <p className="mt-1.5 text-[15px] text-white/60">
              Ready to improve your resume today?
            </p>
          </div>

          {
            user?.plan?.toLowerCase() === "pro" ? (

              <Button
                disabled
                className="rounded-full bg-green-600 px-6 py-5 text-white cursor-default"
              >
                Pro Plan Active
              </Button>

            ) : (

              <Button
                  onClick={() => router.push("/dashboard/billing")}
              >
                  {user?.plan === "Pro"
                      ? "Manage Billing"
                      : "Upgrade Plan"}
              </Button>

            )
          }
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Reviews remaining — signature activity ring */}
          <Card>
            <div className="flex items-center gap-5">
              <ActivityRing
                percent={
                  user?.plan?.toLowerCase() === "pro"
                    ? 100
                    : (Number(reviewsRemaining) / 3) * 100
                }
              />
              <div>
                <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-white/60">
                  Remaining Reviews
                </p>
                <h2 className="mt-1 text-[32px] font-semibold leading-none tracking-[-0.02em] text-white">

                  {user?.plan?.toLowerCase() === "pro" ? (

                    <>
                      Unlimited
                      <span className="ml-2 text-lg text-green-400">
                        ✓
                      </span>
                    </>

                  ) : (

                    <>
                      {reviewsRemaining}

                      <span className="ml-1 text-[17px] font-medium text-white/50">
                        / 3
                      </span>
                    </>

                  )}

                </h2>
                <p className="mt-1.5 text-[13px] text-white/50">
                  Resets on your next billing cycle
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <IconTile color="purple">
              <Crown size={20} strokeWidth={2} />
            </IconTile>
            <p className="mt-5 text-[13px] font-medium uppercase tracking-[0.04em] text-white/60">
              Current Plan
            </p>
            <h2
              className={`mt-1 text-[28px] font-semibold tracking-[-0.02em]
              ${
                user?.plan?.toLowerCase() === "pro"
                  ? "text-green-400"
                  : "text-white"
              }`}
            >
              {user?.plan || "Free"}
            </h2>
            <button className="mt-2 flex items-center gap-1 text-[13px] font-medium text-white hover:underline">
              See plan benefits
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </Card>

            <Card>
            <IconTile color="orange">
                <FileText size={20} strokeWidth={2} />
            </IconTile>

            <p className="mt-5 text-[13px] font-medium uppercase tracking-[0.04em] text-white/60">
                Total Reviews
            </p>

            <h2 className="mt-1 text-[28px] font-semibold tracking-[-0.02em] text-white">
                {reviewsUsed}
            </h2>

              <p className="mt-2 text-[13px] text-white/50">
                Average ATS Score
              </p>

              <p className="text-2xl font-semibold text-cyan-400">
                {stats?.average_score ?? 0}%
              </p>
            </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-6 py-10 text-center">
              <IconTile color="blue">
                <Upload size={20} strokeWidth={2} />
              </IconTile>
              <h2 className="mt-4 text-[19px] font-semibold tracking-[-0.01em] text-white">
                Upload your resume
              </h2>
              <p className="mt-1.5 max-w-sm text-[14px] leading-relaxed text-white/60">
                Drag and drop a PDF or Word file, or browse your computer to
                get an AI-powered review in seconds.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                hidden
                onChange={handleUpload}
                />
                <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="rounded-full bg-black px-6 py-5"
                >
                {uploading ? "Uploading..." : "Browse Files"}
                </Button>
                {
                reviewId && (

                <div className="mt-8 w-full">

                <h3 className="mb-3 text-lg font-semibold">

                Paste Job Description

                </h3>

                <textarea

                value={jobDescription}

                onChange={(e)=>setJobDescription(e.target.value)}

                rows={10}

                className="w-full rounded-2xl border p-4"

                placeholder="Paste Job Description here..."

                />

                <Button

                onClick={handleAnalyze}

                disabled={analyzing}

                className="mt-4 w-full rounded-full"

                >

                {

                analyzing

                ?

                "Analyzing..."

                :

                "Analyze Resume"

                }

                </Button>

                </div>

                )
                }
              </div>
            </div>
          </Card>

          <Card className="flex flex-col justify-between">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.04em] text-white/60">
                Review History
              </p>
              <h2 className="mt-1 text-[19px] font-semibold tracking-[-0.01em] text-white">
                See past feedback
              </h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-white/60">
                Compare versions and track how your resume has improved over
                time.
              </p>
            </div>
              <Link href="/dashboard/history">
                <button className="mt-5 flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.12]">
                  View History
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-white">
            Recent Activity
          </h2>

          <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] py-12 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/70">
              <Clock size={18} strokeWidth={2} />
            </div>
            <p className="mt-3 text-[15px] font-medium text-white">
              {stats?.latest

              ? stats.latest.filename

              : "No reviews yet"}
            </p>
            <p className="mt-1 text-[13px] text-white/50">
              {stats?.latest

              ? `ATS Score : ${stats.latest.score}%`

              : "Upload a resume above"}
            </p>
          </div>
        </Card>
      </div>

      <style jsx>{`
        .blob {
          will-change: transform;
        }
        .blob-blue {
          background: radial-gradient(circle, rgba(10, 132, 255, 0.9), transparent 70%);
          animation: drift-a 16s ease-in-out infinite;
        }
        .blob-purple {
          background: radial-gradient(circle, rgba(191, 90, 242, 0.85), transparent 70%);
          animation: drift-b 20s ease-in-out infinite;
        }
        .blob-pink {
          background: radial-gradient(circle, rgba(255, 55, 95, 0.75), transparent 70%);
          animation: drift-c 22s ease-in-out infinite;
        }
        .blob-cyan {
          background: radial-gradient(circle, rgba(50, 215, 255, 0.75), transparent 70%);
          animation: drift-a 18s ease-in-out infinite reverse;
        }
        .blob-orange {
          background: radial-gradient(circle, rgba(255, 149, 0, 0.7), transparent 70%);
          animation: drift-b 24s ease-in-out infinite reverse;
        }
        .blob-green {
          background: radial-gradient(circle, rgba(52, 199, 89, 0.6), transparent 70%);
          animation: drift-c 19s ease-in-out infinite reverse;
        }

        @keyframes drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, 40px) scale(1.12); }
          66% { transform: translate(-30px, 60px) scale(0.95); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-70px, 30px) scale(1.08); }
          66% { transform: translate(40px, -50px) scale(0.96); }
        }
        @keyframes drift-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -60px) scale(1.1); }
          66% { transform: translate(-60px, -20px) scale(0.94); }
        }

        @media (prefers-reduced-motion: reduce) {
          .blob { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.08] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-3xl transition-all duration-300 hover:bg-white/[0.11] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 to-transparent"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function IconTile({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "blue" | "purple" | "orange";
}) {
  const map = {
    blue: "bg-[#0A84FF]/25 text-[#ffffff]",
    purple: "bg-[#BF5AF2]/25 text-[#ffffff]",
    orange: "bg-[#FF9500]/25 text-[#ffffff]",
  };

  return (
    <div
      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${map[color]}`}
    >
      {children}
    </div>
  );
}

function ActivityRing({ percent }: { percent: number }) {
  const size = 76;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, percent)) / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0 -rotate-90"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#ringGradient)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A84FF" />
          <stop offset="100%" stopColor="#BF5AF2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
