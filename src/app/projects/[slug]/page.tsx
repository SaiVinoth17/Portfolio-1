import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPublishedProjects,
  getProjectBySlug,
  getRelatedProjects,
  getNextProject,
} from "@/lib/data/projects";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getProjectSchema } from "@/lib/seo/schema";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return getPublishedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return constructMetadata({
      title: "Project Not Found",
      description: "The requested project case study could not be resolved.",
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${project.title} — Architecture Case Study`,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.image,
    keywords: [
      project.title,
      project.category,
      ...project.tags,
      ...project.technologies,
      "Case Study",
      "Architecture",
    ],
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.slug, 2);
  const nextProject = getNextProject(project.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getProjectSchema({
        title: project.title,
        description: project.description,
        url: `/projects/${project.slug}`,
        category: project.category,
      }),
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Projects", url: "/projects" },
        { name: project.title, url: `/projects/${project.slug}` },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient
        project={project}
        relatedProjects={relatedProjects}
        nextProject={nextProject}
      />
    </>
  );
}
