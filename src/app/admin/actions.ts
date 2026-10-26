"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { deleteImage, getArtworks, saveArtworks } from "@/lib/artworks";
import { checkPassword, createSession, destroySession, requireAdmin } from "@/lib/auth";
import type { Artwork } from "@/lib/types";

export type ActionState = { error?: string; ok?: boolean };

const field = (form: FormData, name: string) => String(form.get(name) ?? "").trim();

// Rebuilds the public gallery and the admin list after a change.
function refresh() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function login(_: ActionState, form: FormData): Promise<ActionState> {
  if (!checkPassword(field(form, "password"))) return { error: "Wrong password" };
  await createSession();
  revalidatePath("/admin");
  return { ok: true };
}

export async function logout() {
  await destroySession();
  revalidatePath("/admin");
}

// Creates an artwork when "id" is empty, otherwise updates it.
export async function saveArtwork(_: ActionState, form: FormData): Promise<ActionState> {
  await requireAdmin();

  const id = field(form, "id");
  const src = field(form, "src");
  const title = { en: field(form, "titleEn"), fr: field(form, "titleFr") };
  const medium = { en: field(form, "mediumEn"), fr: field(form, "mediumFr") };
  const dimensions = field(form, "dimensions");

  if (!title.en || !title.fr) return { error: "Title is required in English and French" };
  if (!src) return { error: "Please choose an image" };

  const artworks = await getArtworks();
  const artwork: Artwork = {
    id: id || randomUUID(),
    src,
    title,
    ...(medium.en || medium.fr ? { medium } : {}),
    ...(dimensions ? { dimensions } : {}),
  };

  const index = artworks.findIndex((a) => a.id === id);
  const previous = index >= 0 ? artworks[index] : undefined;
  if (previous) artworks[index] = artwork;
  else artworks.unshift(artwork);

  await saveArtworks(artworks);
  if (previous && previous.src !== src) await deleteImage(previous.src);
  refresh();
  return { ok: true };
}

export async function deleteArtwork(id: string) {
  await requireAdmin();
  const artworks = await getArtworks();
  const target = artworks.find((a) => a.id === id);
  if (!target) return;
  await saveArtworks(artworks.filter((a) => a.id !== id));
  await deleteImage(target.src);
  refresh();
}
