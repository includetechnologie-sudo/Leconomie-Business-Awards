import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHero, ShareButton } from "@/components/site/ui";
import { laureates } from "@/data/site";

export const Route = createFileRoute("/laureats/$slug")({
  loader: ({ params }) => {
    const l = laureates.find((x) => x.slug === params.slug);
    if (!l) throw notFound();
    return l;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Lauréat | L’Economie Business Awards` },
          { name: "description", content: `${loaderData.name} : ${loaderData.awards.map((a) => `${a.prize} (${a.edition.label})`).join(", ")}.` },
          { property: "og:title", content: `${loaderData.name} — Lauréat` },
          { property: "og:description", content: `Distinctions de ${loaderData.name} à L’Economie Business Awards.` },
          { property: "og:type", content: "profile" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Lauréat introuvable | L’Economie Business Awards" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <PageHero eyebrow="Lauréats" title="Fiche introuvable" intro={<Link to="/laureats" className="text-gold underline">Retour aux lauréats</Link>} />
  ),
  component: Laureate,
});

function Laureate() {
  const l = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={`Lauréat · ${l.awards.length} distinction${l.awards.length > 1 ? "s" : ""}`} title={l.name} />
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <ol className="relative border-l border-gold pl-8">
            {l.awards.map((a) => (
              <li key={a.prize + a.edition.number} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[37px] top-1.5 h-3 w-3 rotate-45 bg-gold" aria-hidden />
                <p className="text-xs uppercase tracking-[0.2em] text-gold">{a.edition.label} · {a.edition.date}</p>
                <h2 className="mt-2 text-3xl text-night">{a.prize}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{a.edition.venue}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
            <Link to="/laureats" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-night hover:text-gold"><ArrowLeft className="h-4 w-4" /> Tous les lauréats</Link>
            <ShareButton title={`${l.name} — L’Economie Business Awards`} />
          </div>
        </div>
      </section>
    </>
  );
}
