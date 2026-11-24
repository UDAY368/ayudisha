import "server-only";
import { createHash, randomUUID } from "node:crypto";
import type { ZodType } from "zod";
import { site } from "@/config/site";
import { env } from "./env";
import { getStorage, type EnquiryKind } from "./storage";
import { fieldErrors, normalisePhone } from "./validation";

/* Per-instance in-memory limiter. Replace with a shared store (e.g. Redis) before scaling out. */
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
const DUPLICATE_WINDOW = 10 * 60 * 1000;

const hash = (v: string) => createHash("sha256").update(env.hashSalt + v).digest("hex").slice(0, 32);

function rateLimited(key: string) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(key, list);
  return list.length > LIMIT;
}

const json = (body: object, status = 200, headers: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function handleEnquiry(req: Request, kind: EnquiryKind, schema: ZodType<Record<string, unknown>>) {
  if (!req.headers.get("content-type")?.includes("application/json")) return json({ ok: false, code: "unsupported" }, 415);
  const len = Number(req.headers.get("content-length") || 0);
  if (len > 4096) return json({ ok: false, code: "too_large" }, 413);

  // Same-origin only
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ ok: false, code: "forbidden" }, 403);

  const storage = getStorage();
  if (storage.status() !== "ready") return json({ ok: false, code: "integration_disabled" }, 503);

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (rateLimited(hash(ip))) return json({ ok: false, code: "rate_limited" }, 429, { "Retry-After": "600" });

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 4096) return json({ ok: false, code: "too_large" }, 413);
    body = JSON.parse(text);
  } catch {
    return json({ ok: false, code: "bad_request" }, 400);
  }

  // Honeypot or implausibly fast submission: generic success, nothing stored.
  const started = typeof body.startedAt === "number" ? body.startedAt : 0;
  if ((typeof body.company_website === "string" && body.company_website.length > 0) || (started && Date.now() - started < 2500)) {
    return json({ ok: true });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ ok: false, code: "validation", fieldErrors: fieldErrors(parsed.error) }, 422);

  const v = parsed.data as Record<string, unknown> & { countryCode: string; phone: string; idempotencyKey?: string };
  const phone = normalisePhone(v.countryCode, v.phone)!;
  const phoneHash = hash(phone);

  try {
    // Duplicate prevention: same phone + same form within the window → same generic receipt, no second write.
    if (await storage.findRecentDuplicate(kind, phoneHash, DUPLICATE_WINDOW)) return json({ ok: true });

    const now = new Date().toISOString();
    const { company_website: _h, startedAt: _s, idempotencyKey: _i, countryCode: _c, ...rest } = v;
    void _h; void _s; void _i; void _c;
    await storage.save({
      id: randomUUID(),
      kind,
      phoneHash,
      createdAt: now,
      updatedAt: now,
      status: "new",
      consentAt: now,
      consentVersion: site.legal.consentVersion,
      data: { ...rest, phone },
    });
  } catch {
    console.error(`[enquiry] storage failure for ${kind}`); // never log payloads
    return json({ ok: false, code: "storage_failed" }, 500);
  }

  // Notification adapter: not configured in this build. A failure here must never lose a saved lead.
  if (env.hasEmailProvider) {
    try {
      /* implement lib/notification.ts with the chosen provider; send a sanitised alert without personal data */
    } catch {
      console.error(`[enquiry] notification failure for ${kind}`);
    }
  }

  return json({ ok: true });
}
