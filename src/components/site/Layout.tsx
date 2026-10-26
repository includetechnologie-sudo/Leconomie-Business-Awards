import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo, btn } from "./ui";
import { BRAND, contact, socials } from "@/data/site";
import { cn } from "@/lib/utils";

export const NAV = [
  { to: "/a-propos", label: "À propos" },
  { to: "/categories", label: "Catégories" },
  { to: "/nomines", label: "Nominés" },
  { to: "/laureats", label: "Lauréats" },
  { to: "/editions", label: "Éditions" },
  { to: "/actualites", label: "Actualités" },
  { to: "/partenaires", label: "Partenaires" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled || open ? "bg-night/95 backdrop-blur-md border-b border-gold/20" : "bg-transparent")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" aria-label={`${BRAND} — accueil`} className="shrink-0">
          <Logo className={cn("transition-all duration-500", scrolled ? "w-24" : "w-28 md:w-32")} />
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:text-gold" activeProps={{ className: "!text-gold" }}>
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className={cn(btn.gold, "px-5 py-2.5")}>Contact</Link>
        </nav>
        <button type="button" className="p-2 text-ivory lg:hidden" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Navigation mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 pb-8">
              {[...NAV, { to: "/contact", label: "Contact" } as const].map((n) => (
                <Link key={n.to} to={n.to} className="border-b border-ivory/10 py-4 font-display text-2xl text-ivory hover:text-gold" activeProps={{ className: "!text-gold" }}>
                  {n.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-night text-ivory">
      <div className="gold-rule" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="w-44" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
            Depuis 2022, {BRAND} distingue les entreprises et les personnalités qui font avancer l’économie camerounaise. Organisé par {contact.organizer}.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explorer</p>
          <ul className="mt-5 space-y-2.5 text-sm text-ivory/70">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-gold">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-5 space-y-2.5 text-sm text-ivory/70">
            <li>{contact.website}</li>
            {contact.email && <li><a href={`mailto:${contact.email}`} className="hover:text-gold">{contact.email}</a></li>}
            {contact.phone && <li>{contact.phone}</li>}
            <li><Link to="/contact" className="hover:text-gold">Nous écrire</Link></li>
            {socials.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer" className="hover:text-gold">{s.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-ivory/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {BRAND}. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="hover:text-gold">Mentions légales</Link>
            <Link to="/confidentialite" className="hover:text-gold">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
