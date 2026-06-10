const GITHUB_REPO = process.env.GHOST_GITHUB_REPO || "knodelchik/ghost-assistant";
const GITHUB_TOKEN = process.env.GHOST_GITHUB_TOKEN;
// Якщо задано — пін на конкретний тег замість авто-визначення latest.
const PINNED_TAG = process.env.GHOST_RELEASE_TAG || null;

type ReleaseAsset = { id: number; name: string };
type Release = { tag_name?: string; assets?: ReleaseAsset[] };

export type LatestRelease = {
  version: string;
  tagName: string;
  dmgAssetId: number | null;
};

function ghHeaders(accept: string) {
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: accept,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

// Невеликий in-memory кеш, щоб не дьобати GitHub API на кожен /api/version.
let cache: { at: number; data: LatestRelease | null } | null = null;
const TTL_MS = 60_000;

async function fetchRelease(suffix: string): Promise<Release | null> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/releases/${suffix}`,
    { headers: ghHeaders("application/vnd.github+json"), cache: "no-store" },
  );
  if (!res.ok) return null;
  return (await res.json()) as Release;
}

// Автоматично визначає останній реліз. GitHub /releases/latest виключає draft і prerelease.
export async function getLatestRelease(): Promise<LatestRelease | null> {
  if (!GITHUB_TOKEN) return null;
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;

  const release = PINNED_TAG
    ? await fetchRelease(`tags/${PINNED_TAG}`)
    : await fetchRelease("latest");

  if (!release?.tag_name) {
    // Не кешуємо невдачу (transient GitHub 5xx/timeout), щоб не блокувати відновлення на TTL.
    return null;
  }

  const dmg = release.assets?.find((a) => a.name.endsWith(".dmg")) ?? null;
  const data: LatestRelease = {
    version: release.tag_name.replace(/^v/, ""),
    tagName: release.tag_name,
    dmgAssetId: dmg ? dmg.id : null,
  };
  cache = { at: Date.now(), data };
  return data;
}

// Підписаний (короткоживучий) URL .dmg останнього релізу з приватного репо.
export async function getSignedDmgUrl(): Promise<string | null> {
  if (!GITHUB_TOKEN) return null;
  const latest = await getLatestRelease();
  if (!latest || latest.dmgAssetId == null) return null;

  const assetRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/releases/assets/${latest.dmgAssetId}`,
    {
      headers: ghHeaders("application/octet-stream"),
      redirect: "manual",
      cache: "no-store",
    },
  );

  return assetRes.headers.get("location");
}
