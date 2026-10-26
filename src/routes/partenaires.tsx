import { createFileRoute } from "@tanstack/react-router";
import { ButtonLink, PageHero, Reveal, SectionTitle } from "@/components/site/ui";
import { partners } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/partenaires")({
  head: () => seo("Partenaires", "Partenaires, sponsors et institutions qui accompagnent L’Economie Business Awards."),
  component: Partners,
});

const reasons = [
  { t: "Visibilité", d: "Une présence auprès des dirigeants, investisseurs, institutions et médias." },
  { t: "Réseau", d: "Des rencontres et des partenariats au cœur de la soirée de gala." },
  { t: "Engagement", d: "Associer votre marque à la reconnaissance du mérite économique." },
];

function Partners() {
  return (
    <>
      <PageHero eyebrow="Ils nous font confiance" title="Partenaires & sponsors" intro="Entreprises et institutions qui accompagnent l’événement depuis 2022." />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          {partners.length > 0 ? (
            <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
              {partners.map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="flex aspect-[3/2] items-center justify-center bg-background p-8">
                  <img src={p.logo} alt={p.name} loading="lazy" className="max-h-16 w-auto object-contain" />
                </a>
              ))}
            </div>
          ) : (
            <p className="border-l-2 border-gold bg-muted px-4 py-3 text-sm text-muted-foreground">Les logos officiels des partenaires seront publiés ici dès leur validation.</p>
          )}
        </div>
      </section>
      <section className="bg-night-gradient py-28 text-ivory">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle light eyebrow="Devenir partenaire" title="Rejoignez l’aventure" />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.08} className="border-t border-gold/40 pt-6">
                <h3 className="text-3xl">{r.t}</h3>
                <p className="mt-3 text-ivory/65">{r.d}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14"><ButtonLink to="/contact" search={{ sujet: "partenariat" }}>Proposer un partenariat</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
