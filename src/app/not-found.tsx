import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="display text-8xl text-accent md:text-[10rem]">404</p>
      <h1 className="display mt-4 text-4xl md:text-6xl">Page au tapis.</h1>
      <p className="mt-4 text-muted">Cette page n&apos;existe pas ou a été déplacée.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Accueil</ButtonLink>
        <ButtonLink href="/planning" variant="secondary">
          Planning
        </ButtonLink>
      </div>
    </div>
  );
}
