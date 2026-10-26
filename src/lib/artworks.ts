import "server-only";
import { del, list, put } from "@vercel/blob";
import type { Artwork } from "./types";

// Every save writes a new uniquely named JSON blob, so the CDN never serves a stale catalogue.
const DATA_PREFIX = "data/artworks";

// Initial catalogue, served until the first save from the admin panel.
const SEED: Artwork[] = [
  { id: "garden", src: "/assets/artworks/garden.jpg", title: { en: "Garden", fr: "Jardin" }, dimensions: "50 x 70 cm" },
  { id: "nail-story", src: "/assets/artworks/nailstory.jpg", title: { en: "Nail Story", fr: "Nail Story" }, dimensions: "40 x 50 cm" },
  { id: "boo", src: "/assets/artworks/full_Boo.jpg", title: { en: "Boo", fr: "Boo" }, dimensions: "60 x 60 cm" },
  { id: "untitled-1", src: "/assets/artworks/IMG_1782 2.JPG", title: { en: "Untitled I", fr: "Sans Titre I" }, dimensions: "30 x 40 cm" },
  { id: "untitled-2", src: "/assets/artworks/IMG_4164 2.JPG", title: { en: "Untitled II", fr: "Sans Titre II" }, dimensions: "50 x 70 cm" },
  { id: "sans-titre", src: "/assets/artworks/Sans titre-1.JPG", title: { en: "Sans Titre", fr: "Sans Titre" }, dimensions: "40 x 50 cm" },
  { id: "study", src: "/assets/artworks/Untitled-1.jpg", title: { en: "Study", fr: "Étude" }, dimensions: "30 x 30 cm" },
];

export const isBlobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

// Returns data blobs sorted newest first.
async function listDataBlobs() {
  const { blobs } = await list({ prefix: DATA_PREFIX });
  return blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
}

export async function getArtworks(): Promise<Artwork[]> {
  if (!isBlobConfigured()) return SEED;
  const [latest] = await listDataBlobs();
  if (!latest) return SEED;
  const res = await fetch(latest.url);
  if (!res.ok) throw new Error(`Could not load artworks (${res.status})`);
  return res.json();
}

export async function saveArtworks(artworks: Artwork[]) {
  await put(`${DATA_PREFIX}.json`, JSON.stringify(artworks), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
  });
  // Keep only the version just written.
  const [, ...older] = await listDataBlobs();
  if (older.length) await del(older.map((b) => b.url));
}

// Removes an uploaded image; bundled /assets images are left untouched.
export async function deleteImage(src: string) {
  if (src.startsWith("https://")) await del(src);
}
