import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Notice, PageHero, Reveal } from "@/components/site/ui";
import { categories, categoriesStatus } from "@/data/site";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/categories")({
  head: () => seo("Catégories de prix", "Les secteurs et distinctions proposés pour L’Economie Business Awards : banques, assurances, fintech, PME, prix transversaux."),
  component: Categories,
});

function Categories() {
  const [filter, setFilter] = useState<"all" | "sector" | "transversal">("all");
  const list = categories.filter((c) => filter === "all" || (filter === "transversal" ? c.transversal : !c.transversal));
  return (
    <>
      <PageHero eyebrow="Les distinctions" title="Les catégories de prix" intro="Secteurs d’activité et prix transversaux qui composent le palmarès." />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Notice>{categoriesStatus}</Notice>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filtrer les catégories">
            {([["all", "Toutes"], ["sector", "Par secteur"], ["transversal", "Prix transversaux"]] as const).map(([k, l]) => (
              <button key={k} role="tab" aria-selected={filter === k} onClick={() => setFilter(k)} className={cn("border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors", filter === k ? "border-night bg-night text-ivory" : "border-border text-night hover:border-gold")}>
                {l}
              </button>
            ))}
          </div>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {list.map((c, i) => (
              <Reveal key={c.sector} delay={Math.min(i, 6) * 0.04}>
                <div className="grid gap-6 py-10 md:grid-cols-[0.8fr_2fr]">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-2xl text-gold">{c.transversal ? "★" : String(categories.indexOf(c) + 1).padStart(2, "0")}</span>
                    <h2 className="text-3xl text-night md:text-4xl">{c.sector}</h2>
                  </div>
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {c.prizes.map((p) => (
                      <li key={p.name} className="border-l border-gold pl-4">
                        <p className="font-medium text-night">{p.name}</p>
                        {p.description && <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
