"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signup } from "@/lib/auth";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const signupSchema = z.object({
  full_name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[0-9]/, "Must contain number"),
});

type SignupData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(data: SignupData) {
    try {
      setLoading(true);

      await signup(data);

      toast.success("Account created successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.detail ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-white/70">
          Full Name
        </label>
        <Input
          placeholder="Enter your full name"
          {...register("full_name")}
          className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-white/35 backdrop-blur-2xl focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-0"
        />
        <p className="mt-2 text-sm text-red-400">{errors.full_name?.message}</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/70">
          Email
        </label>
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-white/35 backdrop-blur-2xl focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-0"
        />
        <p className="mt-2 text-sm text-red-400">{errors.email?.message}</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/70">
          Password
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            {...register("password")}
            className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 pr-12 text-white placeholder:text-white/35 backdrop-blur-2xl focus-visible:ring-2 focus-visible:ring-cyan-400/40 focus-visible:ring-offset-0"
          />

          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 transition hover:text-white/80"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <p className="mt-2 text-sm text-red-400">{errors.password?.message}</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex h-12 w-full items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-r from-[#0A84FF] to-[#BF5AF2] px-6 font-medium text-white shadow-[0_10px_30px_rgba(90,120,255,0.35)] transition-all duration-300 hover:scale-[1.01] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}