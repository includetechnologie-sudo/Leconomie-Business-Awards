import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/ui";
import { BRAND } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/confidentialite")({
  head: () => seo("Politique de confidentialité", "Comment L’Economie Business Awards traite vos données personnelles."),
  component: () => (
    <>
      <PageHero eyebrow="Informations" title="Politique de confidentialité" />
      <section className="mx-auto max-w-3xl space-y-6 px-6 py-20 text-night">
        <h2 className="text-3xl">Données collectées</h2>
        <p>Le formulaire de contact recueille votre nom, votre e-mail, votre entreprise et votre message, uniquement pour répondre à votre demande.</p>
        <h2 className="text-3xl">Cookies</h2>
        <p>Ce site n’utilise pas de cookies publicitaires ni de mesure d’audience. Une simple mémoire de session évite de rejouer l’animation d’ouverture.</p>
        <h2 className="text-3xl">Vos droits</h2>
        <p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données auprès de l’équipe {BRAND} via la page Contact.</p>
      </section>
    </>
  ),
});
