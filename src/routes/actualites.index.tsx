import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Reveal } from "@/components/site/ui";
import { articles } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/actualites/")({
  head: () => seo("Actualités et médias", "Annonces, communiqués et palmarès de L’Economie Business Awards."),
  component: News,
});

function News() {
  return (
    <>
      <PageHero eyebrow="Actualités & médias" title="Le journal des Awards" intro="Annonces, communiqués de presse, palmarès et ressources médias." />
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <ul className="divide-y divide-border border-y border-border">
            {articles.map((a) => (
              <Reveal key={a.slug}>
                <li>
                  <Link to="/actualites/$slug" params={{ slug: a.slug }} className="group grid gap-3 py-10 md:grid-cols-[180px_1fr]">
                    <span className="text-xs uppercase tracking-[0.2em] text-gold">{a.date}</span>
                    <div>
                      <h2 className="text-3xl text-night transition-colors group-hover:text-gold md:text-4xl">{a.title}</h2>
                      <p className="mt-3 text-muted-foreground">{a.excerpt}</p>
                    </div>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-16 bg-muted p-8">
            <p className="eyebrow">Espace presse</p>
            <p className="mt-3 text-night">Le dossier de presse et les visuels officiels seront disponibles en téléchargement ici. Journalistes : <Link to="/contact" search={{ sujet: "presse" }} className="text-gold underline">contactez-nous</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
