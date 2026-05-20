import { APP_VERSION } from "@/lib/site";

const GITHUB_REPO = process.env.GHOST_GITHUB_REPO || "knodelchik/ghost-assistant";
const GITHUB_TOKEN = process.env.GHOST_GITHUB_TOKEN;
const RELEASE_TAG = process.env.GHOST_RELEASE_TAG || `v${APP_VERSION}`;

type ReleaseAsset = { id: number; name: string };
type Release = { assets?: ReleaseAsset[] };

export async function getSignedDmgUrl(): Promise<string | null> {
  if (!GITHUB_TOKEN) return null;

  const releaseRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/releases/tags/${RELEASE_TAG}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );

  if (!releaseRes.ok) return null;

  const release = (await releaseRes.json()) as Release;
  const asset = release.assets?.find((a) => a.name.endsWith(".dmg"));
  if (!asset) return null;

  const assetRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/releases/assets/${asset.id}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/octet-stream",
      },
      redirect: "manual",
      cache: "no-store",
    },
  );

  return assetRes.headers.get("location");
}
