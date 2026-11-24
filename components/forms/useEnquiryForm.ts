"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ZodType } from "zod";
import type { Errors } from "./fields";

export type SubmitState = "idle" | "sending" | "failed" | "disabled" | "rate_limited";

function fieldErrorsOf(error: { issues: { path: PropertyKey[]; message: string }[] }) {
  const out: Errors = {};
  for (const i of error.issues) {
    const k = String(i.path[0] ?? "form");
    if (!out[k]) out[k] = i.message;
  }
  return out;
}

export function useEnquiryForm<T extends Record<string, unknown>>({
  initial,
  schema,
  endpoint,
  order,
}: {
  initial: T;
  schema: ZodType<unknown>;
  endpoint: string;
  order: (keyof T & string)[];
}) {
  const router = useRouter();
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<SubmitState>("idle");
  const [honeypot, setHoneypot] = useState("");
  const [summary, setSummary] = useState<string[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);
  const meta = useRef<{ idempotencyKey?: string; startedAt: number }>({ startedAt: 0 });

  useEffect(() => {
    meta.current = { idempotencyKey: crypto.randomUUID(), startedAt: Date.now() };
  }, []);

  const validate = (v: T) => {
    const r = schema.safeParse({ ...v, ...meta.current });
    return r.success ? {} : fieldErrorsOf(r.error);
  };

  const set = <K extends keyof T>(k: K, v: T[K]) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k as string] || errors[k as string]) {
      const e = validate(next);
      setErrors((prev) => ({ ...prev, [k]: e[k as string] }));
    }
  };

  const blur = (k: keyof T & string) => {
    setTouched((t) => ({ ...t, [k]: true }));
    const e = validate(values);
    setErrors((prev) => ({ ...prev, [k]: e[k] }));
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (state === "sending") return;
    const e = validate(values);
    const keys = order.filter((k) => e[k]);
    setErrors(e);
    if (keys.length) {
      setSummary(keys.map((k) => e[k]!));
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setSummary([]);
    setState("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...meta.current, company_website: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; fieldErrors?: Errors };
      if (res.ok && data.ok) {
        sessionStorage.setItem("ayd_receipt", "1");
        router.push("/thank-you");
        return;
      }
      if (data.code === "validation" && data.fieldErrors) {
        setErrors(data.fieldErrors);
        setSummary(Object.values(data.fieldErrors).filter(Boolean) as string[]);
        setState("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      setState(data.code === "integration_disabled" ? "disabled" : data.code === "rate_limited" ? "rate_limited" : "failed");
    } catch {
      setState("failed");
    }
  };

  return { values, set, blur, errors, submit, state, honeypot, setHoneypot, summary, summaryRef };
}
