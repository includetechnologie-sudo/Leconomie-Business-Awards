import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import hero from "@/assets/hero-gala.jpg";
import stage from "@/assets/stage.jpg";
import networking from "@/assets/networking.jpg";
import { Notice, PageHero, Reveal } from "@/components/site/ui";
import { editions } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/editions")({
  head: () => seo("Éditions précédentes", "Archives des cérémonies L’Economie Business Awards : dates, lieux, temps forts et galeries."),
  component: Editions,
});

const gallery = [
  { src: hero, alt: "Salle de gala et scène illuminée" },
  { src: stage, alt: "Lauréate applaudie sur scène" },
  { src: networking, alt: "Échanges entre dirigeants au dîner" },
];

function Lightbox({ index, onClose, onMove }: { index: number; onClose: () => void; onMove: (d: number) => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose, onMove]);
  const img = gallery[index]!;
  return (
    <motion.div role="dialog" aria-modal aria-label={img.alt} className="fixed inset-0 z-[90] flex items-center justify-center bg-night/95 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button aria-label="Fermer" className="absolute right-5 top-5 p-2 text-ivory hover:text-gold" onClick={onClose}><X /></button>
      <button aria-label="Image précédente" className="absolute left-3 p-3 text-ivory hover:text-gold" onClick={(e) => { e.stopPropagation(); onMove(-1); }}><ChevronLeft className="h-8 w-8" /></button>
      <img src={img.src} alt={img.alt} className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
      <button aria-label="Image suivante" className="absolute right-3 p-3 text-ivory hover:text-gold" onClick={(e) => { e.stopPropagation(); onMove(1); }}><ChevronRight className="h-8 w-8" /></button>
    </motion.div>
  );
}

function Editions() {
  const [open, setOpen] = useState<number | null>(null);
  const move = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)), []);
  return (
    <>
      <PageHero image={networking} eyebrow="Archives" title="Les éditions précédentes" intro="Quatre cérémonies à Douala, une même exigence : distinguer le mérite économique." />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-px bg-border md:grid-cols-2">
            {editions.map((e, i) => (
              <Reveal key={e.number} delay={i * 0.06} className="bg-background p-10">
                <span className="font-display text-7xl text-gold-gradient">{String(e.number).padStart(2, "0")}</span>
                <h2 className="mt-4 text-3xl text-night">{e.label}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted-foreground">{e.date} · {e.venue}</p>
                <p className="mt-5 text-night">{e.winners.length} distinctions remises, dont <strong>{e.winners[0]?.prize}</strong> à {e.winners[0]?.name}.</p>
                <Link to="/laureats" className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold hover:text-night">Voir le palmarès →</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-night py-24 text-ivory">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow">Galerie</p>
          <h2 className="mt-4 text-5xl">L’atmosphère des soirées</h2>
          <div className="mt-6 max-w-2xl"><Notice light>Visuels d’ambiance. Les photos et vidéos officielles des cérémonies seront ajoutées dès réception.</Notice></div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {gallery.map((g, i) => (
              <button key={g.alt} onClick={() => setOpen(i)} className="group relative aspect-[4/3] overflow-hidden" aria-label={`Agrandir : ${g.alt}`}>
                <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 border border-gold/0 transition-colors group-hover:border-gold/70" />
              </button>
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onMove={move} />}</AnimatePresence>
    </>
  );
}
