import "server-only";
import { env } from "../env";
import { fileStorage } from "./file";

export type EnquiryKind = "consultation" | "practitioner";

export type StoredRecord = {
  id: string;
  kind: EnquiryKind;
  phoneHash: string;
  createdAt: string;
  updatedAt: string;
  status: "new";
  consentAt: string;
  consentVersion: string;
  data: Record<string, unknown>;
};

export interface StorageAdapter {
  name: string;
  status(): "ready" | "disabled";
  save(record: StoredRecord): Promise<void>;
  findRecentDuplicate(kind: EnquiryKind, phoneHash: string, sinceMs: number): Promise<boolean>;
}

const disabledStorage: StorageAdapter = {
  name: "none",
  status: () => "disabled",
  async save() {
    throw new Error("Storage disabled");
  },
  async findRecentDuplicate() {
    return false;
  },
};

/**
 * Development: local JSON file in .data/ (gitignored).
 * Production: disabled until a durable adapter (e.g. lib/storage/postgres.ts) is implemented
 * and wired here. DATABASE_URL alone does not enable submissions.
 */
export function getStorage(): StorageAdapter {
  if (env.isDev) return fileStorage;
  return disabledStorage;
}

import type { FormMode } from "./types";
export type { FormMode };

export function getFormMode(): FormMode {
  const s = getStorage();
  if (s.status() !== "ready") return "disabled";
  return s.name === "file" ? "dev-preview" : "live";
}
