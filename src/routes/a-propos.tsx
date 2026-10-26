import { createFileRoute } from "@tanstack/react-router";
import stage from "@/assets/stage.jpg";
import { PageHero, Reveal, SectionTitle } from "@/components/site/ui";
import { audiences, BRAND, objectives } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/a-propos")({
  head: () => seo("À propos", "Vision, mission et objectifs de L’Economie Business Awards, organisés par THELIE et L’ECONOMIE MEDIA GROUP."),
  component: About,
});

const values = [
  { t: "Excellence", d: "Distinguer les performances qui élèvent les standards de l’économie." },
  { t: "Innovation", d: "Ouvrir le palmarès à la fintech, à la technologie, à l’IA et à l’économie verte." },
  { t: "Leadership", d: "Honorer les dirigeantes et dirigeants qui inspirent et transforment." },
  { t: "Responsabilité", d: "Encourager l’impact sociétal et environnemental des entreprises." },
];

function About() {
  return (
    <>
      <PageHero image={stage} eyebrow="À propos" title={<>Une référence du <em className="text-gold-gradient">monde des affaires</em></>} intro={`Depuis 2022, ${BRAND} accompagne, distingue et met en lumière les entreprises et les personnalités qui font avancer l’économie camerounaise.`} />
      <section className="py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
          <SectionTitle eyebrow="Notre mission" title="Reconnaître le mérite économique" intro="Organisé par THELIE en collaboration avec L’ECONOMIE MEDIA GROUP, l’événement s’est imposé comme un rendez-vous reconnu, réunissant chaque année dirigeants, investisseurs, institutions et médias." />
          <Reveal delay={0.1}>
            <p className="eyebrow">Objectifs</p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {objectives.map((o) => <li key={o} className="py-4 text-night">{o}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>
      <section className="bg-night-gradient py-28 text-ivory">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle light eyebrow="Nos valeurs" title="Ce que nous célébrons" />
          <div className="mt-16 grid gap-10 md:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08} className="border-t border-gold/40 pt-6">
                <h3 className="text-3xl">{v.t}</h3>
                <p className="mt-3 text-sm text-ivory/65">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="À qui s’adressent les Awards" title="Toutes les forces de l’économie" />
          <div className="mt-12 flex flex-wrap gap-3">
            {audiences.map((a) => <span key={a} className="border border-gold/50 px-5 py-3 text-sm text-night">{a}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}
