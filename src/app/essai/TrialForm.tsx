"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import type { FormState } from "@/lib/booking";
import { bookTrial } from "./actions";
import { Button, ButtonLink } from "@/components/ui";

export type SessionOption = {
  id: string;
  name: string;
  day: string;
  time: string;
  meta: string;
  dates: { value: string; label: string }[];
};

const initial: FormState = { status: "idle" };

const inputCls =
  "mt-2 block min-h-12 w-full rounded-sm border border-line bg-sunken px-4 text-base text-fg placeholder:text-muted/60 focus:border-fg focus:outline-none aria-[invalid=true]:border-error";

export function TrialForm({ options, preselected }: { options: SessionOption[]; preselected?: string }) {
  const [state, action, pending] = useActionState(bookTrial, initial);
  const v = state.values ?? {};
  const [sessionId, setSessionId] = useState(v.sessionId ?? preselected ?? "");
  const [age, setAge] = useState(v.age ?? "");
  const session = options.find((o) => o.id === sessionId);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border-2 border-success p-8 outline-none md:p-12">
        <p className="display text-5xl text-success">Réservé.</p>
        <p className="mt-4 text-lg">{state.message}</p>
        <p className="mt-2 text-muted">Pense à ta tenue de sport et à une bouteille d&apos;eau. Arrive 10 minutes avant.</p>
        <ButtonLink href="/" variant="secondary" className="mt-8">
          Retour à l&apos;accueil
        </ButtonLink>
      </div>
    );
  }

  const err = (name: string) => state.errors?.[name]?.[0];
  const minor = age !== "" && Number(age) < 18;

  return (
    <form action={action} noValidate className="space-y-14">
      {state.status === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="border border-error bg-error/10 p-4 outline-none">
          {state.message}
        </div>
      )}

      <Step n="1" title="Choisis ton cours">
        <fieldset aria-describedby={err("sessionId") ? "sessionId-err" : undefined}>
          <legend className="sr-only">Créneau</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {options.map((o) => (
              <label
                key={o.id}
                className="flex min-h-16 cursor-pointer items-center gap-4 rounded-sm border border-line p-4 transition-colors hover:border-fg/50 has-[:checked]:border-accent has-[:checked]:bg-accent/10"
              >
                <input
                  type="radio"
                  name="sessionId"
                  value={o.id}
                  defaultChecked={(v.sessionId ?? preselected) === o.id}
                  onChange={() => setSessionId(o.id)}
                  className="size-5 accent-[var(--accent)]"
                />
                <span>
                  <span className="block font-semibold">{o.name}</span>
                  <span className="block text-sm text-muted first-letter:uppercase">
                    {o.day} · {o.time} · {o.meta}
                  </span>
                </span>
              </label>
            ))}
          </div>
          <FieldError id="sessionId-err" msg={err("sessionId")} />
        </fieldset>
      </Step>

      <Step n="2" title="Choisis ta date">
        {session ? (
          <fieldset>
            <legend className="sr-only">Date</legend>
            <div className="flex flex-wrap gap-3">
              {session.dates.map((d, i) => (
                <label
                  key={d.value}
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-line px-4 transition-colors hover:border-fg/50 has-[:checked]:border-accent has-[:checked]:bg-accent/10"
                >
                  <input
                    type="radio"
                    name="date"
                    value={d.value}
                    defaultChecked={v.date ? v.date === d.value : i === 0}
                    className="size-5 accent-[var(--accent)]"
                  />
                  <span className="inline-block first-letter:uppercase">{d.label}</span>
                </label>
              ))}
            </div>
            <FieldError msg={err("date")} />
          </fieldset>
        ) : (
          <p className="text-muted">Choisis d&apos;abord un cours ci-dessus.</p>
        )}
      </Step>

      <Step n="3" title="Tes coordonnées">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Prénom" name="firstName" autoComplete="given-name" v={v} err={err} />
          <Field label="Nom" name="lastName" autoComplete="family-name" v={v} err={err} />
          <Field label="Email" name="email" type="email" autoComplete="email" inputMode="email" v={v} err={err} />
          <Field label="Téléphone" name="phone" type="tel" autoComplete="tel" inputMode="tel" v={v} err={err} />
          <div>
            <label htmlFor="age" className="text-sm font-semibold">
              Âge du pratiquant
            </label>
            <input
              id="age"
              name="age"
              type="number"
              inputMode="numeric"
              min={15}
              max={99}
              defaultValue={v.age}
              onChange={(e) => setAge(e.target.value)}
              aria-invalid={!!err("age")}
              aria-describedby={err("age") ? "age-err" : undefined}
              className={inputCls}
            />
            <FieldError id="age-err" msg={err("age")} />
          </div>
          {minor && (
            <Field
              label="Nom du parent / tuteur"
              name="parentName"
              autoComplete="name"
              hint="Obligatoire pour un mineur. Les coordonnées ci-dessus doivent être celles du parent."
              v={v}
              err={err}
            />
          )}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="text-sm font-semibold">
              Un message pour le coach ? <span className="font-normal text-muted">(facultatif)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              defaultValue={v.message}
              placeholder="Blessure, expérience passée, question…"
              className={`${inputCls} py-3`}
            />
          </div>
        </div>

        {/* Honeypot anti-spam */}
        <div aria-hidden className="absolute -left-[9999px]">
          <label>
            Site web <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <label className="mt-8 flex cursor-pointer items-start gap-3 py-2 text-sm text-muted">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={v.consent === "on"}
            aria-invalid={!!err("consent")}
            className="mt-0.5 size-5 shrink-0 accent-[var(--accent)]"
          />
          <span>
            J&apos;accepte que MBT Academy utilise ces informations pour organiser ma séance d&apos;essai et me recontacter.{" "}
            <a href="/confidentialite" className="underline hover:text-fg">
              En savoir plus
            </a>
          </span>
        </label>
        <FieldError msg={err("consent")} />
      </Step>

      <Button type="submit" disabled={pending} aria-busy={pending} className="w-full sm:w-auto">
        {pending ? "Envoi…" : "Confirmer ma séance d'essai"}
      </Button>
    </form>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-6 flex items-baseline gap-4">
        <span className="display text-4xl text-accent">{n}</span>
        <span className="display text-3xl md:text-4xl">{title}</span>
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  name,
  hint,
  v,
  err,
  ...rest
}: {
  label: string;
  name: string;
  hint?: string;
  v: Record<string, string>;
  err: (n: string) => string | undefined;
} & Omit<React.ComponentProps<"input">, "name">) {
  const e = err(name);
  const describedBy = [hint && `${name}-hint`, e && `${name}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <input id={name} name={name} defaultValue={v[name]} aria-invalid={!!e} aria-describedby={describedBy} className={inputCls} {...rest} />
      {hint && (
        <p id={`${name}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      <FieldError id={`${name}-err`} msg={e} />
    </div>
  );
}

function FieldError({ id, msg }: { id?: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-2 text-sm text-error">
      {msg}
    </p>
  );
}
