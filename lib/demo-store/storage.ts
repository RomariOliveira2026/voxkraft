import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { EMPTY_DEMO_STORE, type DemoStoreData } from "@/lib/demo-store/types";

const STORE_DIR = path.join(process.cwd(), ".demo-data");

function storePath(userId: string) {
  return path.join(STORE_DIR, `${userId}.json`);
}

export async function readDemoStore(userId: string): Promise<DemoStoreData> {
  try {
    const raw = await readFile(storePath(userId), "utf8");
    return JSON.parse(raw) as DemoStoreData;
  } catch {
    return structuredClone(EMPTY_DEMO_STORE);
  }
}

export async function writeDemoStore(userId: string, data: DemoStoreData) {
  await mkdir(STORE_DIR, { recursive: true });
  await writeFile(storePath(userId), JSON.stringify(data, null, 2), "utf8");
}

export async function updateDemoStore(
  userId: string,
  updater: (store: DemoStoreData) => DemoStoreData,
) {
  const current = await readDemoStore(userId);
  const next = updater(structuredClone(current));
  await writeDemoStore(userId, next);
  return next;
}
