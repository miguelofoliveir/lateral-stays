import type { ReactNode } from "react";

interface StatusCardProps {
  title: string;
  description: string;
  tone: "neutral" | "success" | "error";
  children?: ReactNode;
}

const toneClassNames: Record<StatusCardProps["tone"], string> = {
  neutral: "border-slate-200 bg-white text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-rose-200 bg-rose-50 text-rose-900"
};

export const StatusCard = ({ title, description, tone, children }: StatusCardProps) => (
  <section
    className={`rounded-2xl border p-6 shadow-sm ${toneClassNames[tone]}`}
    aria-live={tone === "neutral" ? "polite" : undefined}
  >
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm leading-6">{description}</p>
    </div>
    {children ? <div className="mt-4">{children}</div> : null}
  </section>
);
