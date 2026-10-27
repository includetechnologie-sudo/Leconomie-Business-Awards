import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { btn, Notice, PageHero } from "@/components/site/ui";
import { contact } from "@/data/site";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const subjects = { information: "Demande d’information", partenariat: "Partenariat", presse: "Presse & médias", candidature: "Candidature" } as const;
type Subject = keyof typeof subjects;

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { sujet?: Subject | undefined } => {
    const v = s["sujet"];
    return { sujet: typeof v === "string" && v in subjects ? (v as Subject) : undefined };
  },
  head: () => seo("Contact", "Contactez l’équipe de L’Economie Business Awards : informations, partenariats, presse."),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom").max(100),
  email: z.string().trim().email("Adresse e-mail invalide").max(255),
  company: z.string().trim().max(120).optional(),
  subject: z.enum(Object.keys(subjects) as [Subject, ...Subject[]]),
  message: z.string().trim().min(10, "Votre message est trop court").max(2000),
});

function Contact() {
  const { sujet } = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<z.infer<typeof schema> | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setDone(r.data);
  };

  const mailto = done && contact.email
    ? `mailto:${contact.email}?subject=${encodeURIComponent(`${subjects[done.subject]} — ${done.name}`)}&body=${encodeURIComponent(`${done.message}\n\n${done.name}${done.company ? ` (${done.company})` : ""}\n${done.email}`)}`
    : null;

  const field = "mt-2 w-full border border-input bg-background px-4 py-3 text-night outline-none transition-colors focus:border-gold";
  return (
    <>
      <PageHero eyebrow="Contact" title="Écrivons ensemble la prochaine édition" intro="Informations, partenariats, presse ou candidatures : notre équipe vous répond." />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-[1fr_1.6fr]">
          <div className="space-y-6">
            <div><p className="eyebrow">Organisation</p><p className="mt-2 text-night">{contact.organizer}</p></div>
            <div><p className="eyebrow">Site officiel</p><p className="mt-2 text-night">{contact.website}</p></div>
            <div><p className="eyebrow">E-mail</p><p className="mt-2 text-night">{contact.email ?? "À communiquer"}</p></div>
            <div><p className="eyebrow">Téléphone</p><p className="mt-2 text-night">{contact.phone ?? "À communiquer"}</p></div>
            <div><p className="eyebrow">Adresse</p><p className="mt-2 text-night">{contact.address ?? "Douala, Cameroun"}</p></div>
          </div>
          {done ? (
            <div className="border border-gold p-10" role="status">
              <p className="eyebrow">Message prêt</p>
              <h2 className="mt-3 text-4xl text-night">Merci, {done.name}.</h2>
              {mailto ? (
                <>
                  <p className="mt-4 text-muted-foreground">Finalisez l’envoi depuis votre messagerie.</p>
                  <a href={mailto} className={cn(btn.dark, "mt-8")}>Ouvrir ma messagerie</a>
                </>
              ) : (
                <div className="mt-6"><Notice>L’envoi en ligne n’est pas encore activé : l’adresse e-mail officielle doit être configurée. Votre message n’a pas été transmis.</Notice></div>
              )}
              <button onClick={() => setDone(null)} className="mt-8 block text-xs font-semibold uppercase tracking-[0.2em] text-gold">Modifier le message</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-6 sm:grid-cols-2">
              {([["name", "Nom complet *", "text"], ["email", "E-mail *", "email"], ["company", "Entreprise", "text"]] as const).map(([n, l, t]) => (
                <label key={n} className={cn("text-xs font-semibold uppercase tracking-[0.18em] text-night", n === "company" && "sm:col-span-2")}>
                  {l}
                  <input name={n} type={t} className={field} aria-invalid={!!errors[n]} />
                  {errors[n] && <span className="mt-1 block normal-case tracking-normal text-destructive">{errors[n]}</span>}
                </label>
              ))}
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-night sm:col-span-2">
                Sujet
                <select name="subject" defaultValue={sujet ?? "information"} className={field}>
                  {Object.entries(subjects).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-night sm:col-span-2">
                Message *
                <textarea name="message" rows={6} className={field} aria-invalid={!!errors["message"]} />
                {errors["message"] && <span className="mt-1 block normal-case tracking-normal text-destructive">{errors["message"]}</span>}
              </label>
              <div className="sm:col-span-2"><button type="submit" className={btn.gold}>Envoyer</button></div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
