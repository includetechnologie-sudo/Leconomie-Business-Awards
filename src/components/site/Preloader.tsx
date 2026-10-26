import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LOGO_URL } from "./ui";
import { BRAND } from "@/data/site";

const KEY = "eba-intro-seen";

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === "1"; sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    if (seen || reduce) { setShow(false); return; }
    const t = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Chargement"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night-gradient"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.5 }}
            />
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={LOGO_URL} alt="L’Economie Business Awards" className="relative w-56 object-contain md:w-72" />
              <span aria-hidden className="animate-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-ivory/25 to-transparent" />
            </motion.div>
          </div>
          <motion.p
            className="mt-8 font-display text-xl tracking-[0.18em] text-ivory md:text-2xl"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.18em" }}
            transition={{ duration: 1.1, delay: 0.9 }}
          >
            {BRAND}
          </motion.p>
          <motion.div
            className="gold-rule mt-5 h-px w-48"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
