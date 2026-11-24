import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { EnquiryKind, StorageAdapter, StoredRecord } from "./index";

/** Development-only adapter. Writes to .data/enquiries.json with an atomic rename. */
const dir = path.join(process.cwd(), ".data");
const file = path.join(dir, "enquiries.json");
let queue: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<StoredRecord[]> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as StoredRecord[];
  } catch {
    return [];
  }
}

export const fileStorage: StorageAdapter = {
  name: "file",
  status: () => "ready",
  save(record) {
    const run = queue.then(async () => {
      await fs.mkdir(dir, { recursive: true });
      const all = await readAll();
      all.push(record);
      const tmp = `${file}.${process.pid}.tmp`;
      await fs.writeFile(tmp, JSON.stringify(all, null, 2), "utf8");
      await fs.rename(tmp, file);
    });
    queue = run.catch(() => undefined);
    return run;
  },
  async findRecentDuplicate(kind: EnquiryKind, phoneHash: string, sinceMs: number) {
    const all = await readAll();
    const cutoff = Date.now() - sinceMs;
    return all.some((r) => r.kind === kind && r.phoneHash === phoneHash && Date.parse(r.createdAt) >= cutoff);
  },
};
