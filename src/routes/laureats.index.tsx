import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Reveal } from "@/components/site/ui";
import { editions, slugify } from "@/data/site";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/laureats/")({
  head: () => seo("Les lauréats", "Le palmarès complet de L’Economie Business Awards, de la 1re édition (2022) à la 4e édition (2026)."),
  component: Laureates,
});

function Laureates() {
  const [ed, setEd] = useState<number | null>(null);
  const shown = editions.filter((e) => ed === null || e.number === ed);
  return (
    <>
      <PageHero eyebrow="Palmarès" title={<>Les <em className="text-gold-gradient">lauréats</em></>} intro="Entreprises et personnalités distinguées depuis la première édition." />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2" aria-label="Filtrer par édition">
            {[null, ...editions.map((e) => e.number)].map((n) => (
              <button key={n ?? "all"} onClick={() => setEd(n)} aria-pressed={ed === n} className={cn("border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors", ed === n ? "border-night bg-night text-ivory" : "border-border text-night hover:border-gold")}>
                {n === null ? "Toutes les éditions" : editions.find((e) => e.number === n)!.label}
              </button>
            ))}
          </div>
          {shown.map((e) => (
            <div key={e.number} className="mt-20">
              <Reveal className="flex flex-col gap-2 border-b border-gold pb-6 md:flex-row md:items-end md:justify-between">
                <h2 className="text-4xl text-night md:text-5xl">{e.label}</h2>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{e.date} · {e.venue}</p>
              </Reveal>
              <ul className="mt-2 divide-y divide-border">
                {e.winners.map((w) => (
                  <li key={w.prize + w.name}>
                    <Link to="/laureats/$slug" params={{ slug: slugify(w.name) }} className="group grid gap-1 py-5 md:grid-cols-[1.2fr_1fr] md:items-center">
                      <span className="font-display text-2xl text-night transition-colors group-hover:text-gold">{w.name}</span>
                      <span className="text-sm text-muted-foreground">{w.prize}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
