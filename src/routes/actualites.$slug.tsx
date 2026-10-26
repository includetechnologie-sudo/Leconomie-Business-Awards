import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHero, ShareButton } from "@/components/site/ui";
import { articles } from "@/data/site";

export const Route = createFileRoute("/actualites/$slug")({
  loader: ({ params }) => {
    const a = articles.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | L’Economie Business Awards` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Article introuvable | L’Economie Business Awards" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => <PageHero eyebrow="Actualités" title="Article introuvable" intro={<Link to="/actualites" className="text-gold underline">Retour aux actualités</Link>} />,
  component: Article,
});

function Article() {
  const a = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={a.date} title={a.title} />
      <article className="mx-auto max-w-3xl px-6 py-20">
        {a.body.map((p, i) => <p key={i} className="mb-6 text-lg leading-relaxed text-night">{p}</p>)}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
          <Link to="/actualites" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-night hover:text-gold"><ArrowLeft className="h-4 w-4" /> Actualités</Link>
          <ShareButton title={a.title} />
        </div>
      </article>
    </>
  );
}
