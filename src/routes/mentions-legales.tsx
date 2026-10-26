import { createFileRoute } from "@tanstack/react-router";
import { Notice, PageHero } from "@/components/site/ui";
import { BRAND, contact } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/mentions-legales")({
  head: () => seo("Mentions légales", "Mentions légales du site officiel de L’Economie Business Awards."),
  component: () => (
    <>
      <PageHero eyebrow="Informations" title="Mentions légales" />
      <section className="mx-auto max-w-3xl space-y-6 px-6 py-20 text-night">
        <Notice>Les informations légales complètes (raison sociale, siège, responsable de publication, hébergeur) restent à fournir par l’organisateur.</Notice>
        <h2 className="text-3xl">Éditeur</h2>
        <p>Le site {contact.website} présente {BRAND}, événement organisé par {contact.organizer}.</p>
        <h2 className="text-3xl">Propriété intellectuelle</h2>
        <p>Le nom, le logo et les contenus de {BRAND} sont protégés. Toute reproduction sans autorisation est interdite.</p>
      </section>
    </>
  ),
});
