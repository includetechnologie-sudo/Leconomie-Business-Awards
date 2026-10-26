import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ButtonLink, PageHero, Reveal } from "@/components/site/ui";
import { nominees, nextEdition } from "@/data/site";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/nomines/")({
  head: () => seo("Les nominés", "Découvrez les entreprises et personnalités nominées à la prochaine édition de L’Economie Business Awards."),
  component: Nominees,
});

function Nominees() {
  const cats = useMemo(() => [...new Set(nominees.map((n) => n.category))], []);
  const [cat, setCat] = useState<string | null>(null);
  const list = nominees.filter((n) => !cat || n.category === cat);
  return (
    <>
      <PageHero eyebrow={`${nextEdition.number}e édition`} title="Les nominés" intro="Les entreprises et personnalités retenues par le comité, catégorie par catégorie." />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          {nominees.length === 0 ? (
            <Reveal className="mx-auto max-w-2xl py-16 text-center">
              <p className="eyebrow">À venir</p>
              <h2 className="mt-4 text-4xl text-night md:text-5xl">La liste des nominés sera dévoilée prochainement</h2>
              <p className="mt-6 text-muted-foreground">Elle sera publiée ici à l’issue de la présélection par le comité d’organisation.</p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <ButtonLink to="/categories" variant="dark">Voir les catégories</ButtonLink>
                <ButtonLink to="/laureats" variant="gold">Les lauréats précédents</ButtonLink>
              </div>
            </Reveal>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {[null, ...cats].map((c) => (
                  <button key={c ?? "all"} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn("border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em]", cat === c ? "border-night bg-night text-ivory" : "border-border text-night hover:border-gold")}>
                    {c ?? "Toutes"}
                  </button>
                ))}
              </div>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((n) => (
                  <Link key={n.slug} to="/nomines/$slug" params={{ slug: n.slug }} className="group block">
                    <div className="aspect-[4/5] overflow-hidden bg-night">
                      {n.photo && <img src={n.photo} alt={n.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">{n.category}</p>
                    <h3 className="mt-2 text-2xl text-night">{n.name}</h3>
                    <p className="text-sm text-muted-foreground">{n.company}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
