import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { LAB_EXPERIMENTS, LabExperiment } from "@/lib/data/labExperiments";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getProjectSchema } from "@/lib/seo/schema";
import LabDetailClient from "./LabDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LAB_EXPERIMENTS.map((exp) => ({
    slug: exp.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experiment = LAB_EXPERIMENTS.find((e) => e.slug === slug);

  if (!experiment) {
    return constructMetadata({
      title: "Experiment Not Found · Aevion Lab",
      description: "The requested WebGL experiment does not exist.",
      path: `/lab/${slug}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${experiment.title} · Aevion Lab R&D`,
    description: `${experiment.subtitle} — ${experiment.description}`,
    path: `/lab/${experiment.slug}`,
    keywords: [
      experiment.title,
      experiment.category,
      experiment.renderer,
      "WebGL Experiment",
      "Interactive 3D Graphics",
    ],
  });
}

export default async function LabExperimentDetailPage({ params }: Props) {
  const { slug } = await params;
  const experiment = LAB_EXPERIMENTS.find((e) => e.slug === slug);

  if (!experiment) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Lab", url: "/lab" },
    { name: experiment.title, url: `/lab/${experiment.slug}` },
  ];

  const softwareSchema = getProjectSchema({
    title: `${experiment.title} (Aevion Lab)`,
    description: experiment.description,
    url: `/lab/${experiment.slug}`,
    category: experiment.category,
  });

  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <LabDetailClient experiment={experiment} />
    </main>
  );
}
