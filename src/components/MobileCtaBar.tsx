"use client";

import { usePathname } from "next/navigation";
import { TRIAL_CTA, whatsappUrl } from "@/lib/nav";
import { ButtonLink } from "@/components/ui";

export function MobileCtaBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/essai")) return null;
  const wa = whatsappUrl();

  return (
    <aside aria-label="Réservation rapide" className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-bg/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <ButtonLink href="/essai" className="flex-1">
        {TRIAL_CTA}
      </ButtonLink>
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nous écrire sur WhatsApp"
          className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-line"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-5 fill-current">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
          </svg>
        </a>
      )}
    </aside>
  );
}
