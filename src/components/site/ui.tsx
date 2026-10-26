import { Link, type LinkProps } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { Share2, Check } from "lucide-react";
import logoAsset from "@/assets/logo.webp.asset.json";
import { cn } from "@/lib/utils";

export const LOGO_URL = logoAsset.url;

/** Logo officiel, affiché tel quel (aucune modification). */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={LOGO_URL}
      alt="L’Economie Business Awards"
      width={1920}
      height={1334}
      className={cn("h-auto object-contain", className)}
      draggable={false}
    />
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-night";
export const btn = {
  gold: cn(btnBase, "bg-gold-gradient text-night shadow-gold hover:brightness-110 hover:-translate-y-0.5"),
  outline: cn(btnBase, "border border-gold/60 text-ivory hover:border-gold hover:bg-gold/10"),
  dark: cn(btnBase, "bg-night text-ivory hover:bg-night-soft"),
};

export function ButtonLink({ variant = "gold", className, children, ...props }: LinkProps & { variant?: keyof typeof btn; className?: string; children: ReactNode }) {
  return (
    <Link {...props} className={cn(btn[variant], className)}>
      {children}
    </Link>
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title, intro, light, center }: { eyebrow: string; title: ReactNode; intro?: ReactNode; light?: boolean; center?: boolean }) {
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={cn("mt-4 text-4xl leading-[1.05] md:text-6xl", light ? "text-ivory" : "text-night")}>{title}</h2>
      <div className={cn("gold-rule mt-6 w-24", center && "mx-auto")} />
      {intro && <p className={cn("mt-6 text-base leading-relaxed md:text-lg", light ? "text-ivory/70" : "text-muted-foreground")}>{intro}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: ReactNode; intro?: ReactNode; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-night pt-40 pb-24 text-ivory md:pt-48 md:pb-32">
      {image && <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />}
      <div className="absolute inset-0 bg-hero-veil" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.02] md:text-7xl">{title}</h1>
          {intro && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ivory/75">{intro}</p>}
        </Reveal>
      </div>
      <div className="gold-rule absolute bottom-0 left-0 right-0" />
    </section>
  );
}

export function Notice({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={cn("border-l-2 border-gold px-4 py-2 text-sm", light ? "bg-ivory/5 text-ivory/70" : "bg-muted text-muted-foreground")}>{children}</p>
  );
}

export function ShareButton({ title, className }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* annulé */ }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button type="button" onClick={share} className={cn("inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold hover:text-gold-light", className)}>
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Lien copié" : "Partager"}
    </button>
  );
}

export function useCountdown(target: string | null) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!target) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  if (!target || now === null) return null;
  const diff = Math.max(0, new Date(target).getTime() - now);
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff / 36e5) % 24),
    minutes: Math.floor((diff / 6e4) % 60),
    seconds: Math.floor((diff / 1e3) % 60),
  };
}
