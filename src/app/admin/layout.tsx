import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console · Aevion Studio",
  description: "Internal administrative systems and control plane.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 antialiased font-sans selection:bg-emerald-500 selection:text-black">
      {children}
    </div>
  );
}
