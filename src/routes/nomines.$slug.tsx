import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, ShareButton } from "@/components/site/ui";
import { nominees } from "@/data/site";

export const Route = createFileRoute("/nomines/$slug")({
  loader: ({ params }) => {
    const n = nominees.find((x) => x.slug === params.slug);
    if (!n) throw notFound();
    return n;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Nominé | L’Economie Business Awards` },
          { name: "description", content: `${loaderData.name}, ${loaderData.company} — nominé : ${loaderData.category}.` },
          { property: "og:title", content: `${loaderData.name} — Nominé` },
          { property: "og:description", content: loaderData.bio },
          { property: "og:type", content: "profile" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Nominé introuvable | L’Economie Business Awards" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <PageHero eyebrow="Nominés" title="Profil introuvable" intro={<Link to="/nomines" className="text-gold underline">Retour aux nominés</Link>} />
  ),
  component: Nominee,
});

function Nominee() {
  const n = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={n.category} title={n.name} intro={n.company} />
      <section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-[1fr_1.5fr]">
          {n.photo && <img src={n.photo} alt={n.name} className="aspect-[4/5] w-full object-cover" />}
          <div>
            <p className="text-lg leading-relaxed text-night">{n.bio}</p>
            <ShareButton title={n.name} className="mt-8" />
          </div>
        </div>
      </section>
    </>
  );
}
