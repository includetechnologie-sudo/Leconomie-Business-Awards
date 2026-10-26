import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero-gala.jpg";
import stage from "@/assets/stage.jpg";
import networking from "@/assets/networking.jpg";
import { ButtonLink, Reveal, SectionTitle, useCountdown } from "@/components/site/ui";
import { BRAND, editions, nextEdition, objectives, selectionSteps } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "L’Economie Business Awards — Célébrer l’excellence économique" },
      { name: "description", content: "La cérémonie qui distingue depuis 2022 les entreprises et les personnalités qui font avancer l’économie camerounaise." },
      { property: "og:title", content: "L’Economie Business Awards" },
      { property: "og:description", content: "Célébrer l’excellence. Distinguer l’impact. Inspirer l’avenir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Hero() {
  const reduce = useReducedMotion();
  const lines = ["Célébrer l’excellence.", "Distinguer l’impact.", "Inspirer l’avenir."];
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-night text-ivory">
      <motion.img
        src={hero}
        alt="Salle de gala illuminée de lumières dorées, invités en tenue de soirée face à la scène"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-hero-veil" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-28 pt-40 md:pb-36">
        <p className="eyebrow">{BRAND} · Douala</p>
        <h1 className="mt-6 text-5xl leading-[0.98] sm:text-6xl md:text-8xl">
          {lines.map((l, i) => (
            <motion.span
              key={l}
              className={i === 1 ? "block italic text-gold-gradient" : "block"}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {l}
            </motion.span>
          ))}
        </h1>
        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg">
            Depuis 2022, nous réunissons dirigeants, investisseurs, institutions et médias pour honorer le mérite économique et celles et ceux qui transforment l’économie camerounaise.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink to="/categories">Découvrir les Awards <ArrowRight className="h-4 w-4" /></ButtonLink>
            <ButtonLink to="/partenaires" variant="outline">Devenir partenaire</ButtonLink>
          </div>
        </motion.div>
      </div>
      <a href="#edition" aria-label="Défiler vers la suite" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/60 md:flex">
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Défiler</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-ivory/40 pt-1.5">
          <span className="animate-scroll-dot h-1.5 w-1 rounded-full bg-gold" />
        </span>
      </a>
    </section>
  );
}

function NextEdition() {
  const c = useCountdown(nextEdition.date);
  const dateLabel = nextEdition.date
    ? new Date(nextEdition.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : "Date à annoncer";
  const items = [
    { k: "Date", v: dateLabel },
    { k: "Lieu", v: nextEdition.venue ?? `Lieu à annoncer${nextEdition.city ? ` · ${nextEdition.city}` : ""}` },
    { k: "Thème", v: nextEdition.theme ?? "Thème à annoncer" },
  ];
  return (
    <section id="edition" className="relative bg-night text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.3fr] md:items-center">
        <Reveal>
          <p className="eyebrow">Prochaine édition</p>
          <h2 className="mt-4 text-5xl md:text-6xl">{nextEdition.number}<sup className="text-2xl">e</sup> édition</h2>
          <p className="mt-4 text-ivory/60">Les informations officielles seront publiées ici dès leur confirmation par le comité d’organisation.</p>
        </Reveal>
        <Reveal delay={0.15}>
          <dl className="grid divide-y divide-gold/20 border-y border-gold/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {items.map((i) => (
              <div key={i.k} className="px-0 py-6 sm:px-6">
                <dt className="eyebrow">{i.k}</dt>
                <dd className="mt-3 font-display text-2xl">{i.v}</dd>
              </div>
            ))}
          </dl>
          {c && (
            <div className="mt-8 grid grid-cols-4 gap-3 text-center" aria-live="polite">
              {([["Jours", c.days], ["Heures", c.hours], ["Min", c.minutes], ["Sec", c.seconds]] as const).map(([l, v]) => (
                <div key={l} className="border border-gold/30 py-4">
                  <div className="font-display text-4xl text-gold-gradient">{String(v).padStart(2, "0")}</div>
                  <div className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-ivory/60">{l}</div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Home() {
  const latest = editions[0];
  return (
    <>
      <Hero />
      <NextEdition />

      {/* Ambition — éditorial blanc */}
      <section className="bg-background py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
          <Reveal className="relative">
            <img src={stage} alt="Lauréate sur scène sous les projecteurs, applaudie par le public" width={1280} height={1600} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <div className="absolute -bottom-6 -right-6 hidden h-40 w-40 border border-gold md:block" aria-hidden />
          </Reveal>
          <div>
            <SectionTitle
              eyebrow="Cinq éditions, une référence"
              title={<>Le rendez-vous du <em className="text-gold-gradient">mérite économique</em></>}
              intro="Organisé par THELIE en collaboration avec L’ECONOMIE MEDIA GROUP, l’événement accompagne, distingue et met en lumière les entreprises et les personnalités qui font avancer l’économie camerounaise."
            />
            <Reveal delay={0.2}>
              <ul className="mt-10 space-y-4">
                {objectives.slice(0, 4).map((o) => (
                  <li key={o} className="flex gap-4 text-night"><span className="mt-2.5 h-px w-6 shrink-0 bg-gold" />{o}</li>
                ))}
              </ul>
              <Link to="/a-propos" className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-night hover:text-gold">
                Notre vision <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Dernier palmarès */}
      <section className="bg-night-gradient py-28 text-ivory md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle light eyebrow={`Palmarès · ${latest.label}`} title={<>{latest.date}<br /><span className="text-ivory/60">{latest.venue}</span></>} />
          <div className="mt-16 grid gap-px bg-gold/15 md:grid-cols-2">
            {latest.winners.slice(0, 6).map((w, i) => (
              <Reveal key={w.prize} delay={i * 0.05} className="bg-night p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">{w.prize}</p>
                <p className="mt-3 font-display text-3xl">{w.name}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-12"><ButtonLink to="/laureats" variant="outline">Tous les lauréats</ButtonLink></div>
        </div>
      </section>

      {/* Processus */}
      <section className="bg-background py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle center eyebrow="Une sélection indépendante" title="Comment sont désignés les lauréats" intro="Un processus structuré, conçu pour garantir l’équité entre les candidats et la crédibilité du palmarès." />
          <ol className="mt-20 grid gap-10 md:grid-cols-5">
            {selectionSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <li className="border-t border-gold pt-6">
                  <span className="font-display text-5xl text-gold-gradient">0{i + 1}</span>
                  <h3 className="mt-3 text-2xl text-night">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA plein cadre */}
      <section className="relative overflow-hidden bg-night py-32 text-ivory md:py-44">
        <img src={networking} alt="Dirigeants échangeant lors du dîner de gala" width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-hero-veil" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="eyebrow">Partenariats</p>
            <h2 className="mt-5 text-5xl leading-tight md:text-7xl">Associez votre marque à l’excellence</h2>
            <p className="mx-auto mt-6 max-w-xl text-ivory/75">Rejoignez les institutions et entreprises qui soutiennent la reconnaissance du mérite économique.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ButtonLink to="/contact" search={{ sujet: "partenariat" }}>Devenir partenaire</ButtonLink>
              <ButtonLink to="/editions" variant="outline">Les éditions précédentes</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
