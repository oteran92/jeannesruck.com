"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { upload } from "@vercel/blob/client";
import { saveArtwork, type ActionState } from "@/app/admin/actions";
import type { Artwork } from "@/lib/types";

type Props = { artwork?: Artwork; onDone: () => void };

const inputClass = "w-full border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-foreground";

export default function ArtworkForm({ artwork, onDone }: Props) {
  const [state, action, saving] = useActionState<ActionState, FormData>(saveArtwork, {});
  const [src, setSrc] = useState(artwork?.src ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Return to the list once the server confirms the save.
  useEffect(() => {
    if (state.ok) onDone();
  }, [state, onDone]);

  // Uploads the image directly from the browser to Blob, then keeps its URL for the form.
  const onFile = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const blob = await upload(`artworks/${file.name}`, file, { access: "public", handleUploadUrl: "/api/admin/upload" });
      setSrc(blob.url);
    } catch (error) {
      setUploadError((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form action={action} className="grid gap-8 md:grid-cols-[240px_1fr]">
      <input type="hidden" name="id" value={artwork?.id ?? ""} />
      <input type="hidden" name="src" value={src} />

      <label className="flex flex-col gap-3 cursor-pointer">
        <div className="relative aspect-[4/5] bg-neutral-100 flex items-center justify-center text-xs text-neutral-500">
          {src ? <Image src={src} alt="Preview" fill sizes="240px" className="object-cover" /> : "No image"}
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-center border border-neutral-300 py-2 hover:border-foreground">
          {uploading ? "Uploading…" : src ? "Replace image" : "Choose image"}
        </span>
        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        {uploadError && <span className="text-accent text-xs">{uploadError}</span>}
      </label>

      <div className="flex flex-col gap-5">
        <h2 className="font-serif text-2xl">{artwork ? "Edit artwork" : "New artwork"}</h2>
        <Pair label="Title" name="title" required values={artwork?.title} />
        <Pair label="Medium (empty = Watercolor on paper)" name="medium" values={artwork?.medium} />
        <Field label="Dimensions">
          <input name="dimensions" defaultValue={artwork?.dimensions} placeholder="50 x 70 cm" className={inputClass} />
        </Field>

        {state.error && <p className="text-accent text-xs">{state.error}</p>}
        <div className="flex gap-3">
          <button
            disabled={saving || uploading || !src}
            className="bg-foreground text-white px-6 py-3 text-xs uppercase tracking-[0.2em] disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button type="button" onClick={onDone} className="px-6 py-3 text-xs uppercase tracking-[0.2em] border border-neutral-300">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 flex-1">
      <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">{label}</span>
      {children}
    </label>
  );
}

// English + French inputs side by side, named e.g. "titleEn" / "titleFr".
function Pair({ label, name, values, required }: { label: string; name: string; values?: { en: string; fr: string }; required?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Field label={`${label} · EN`}>
        <input name={`${name}En`} defaultValue={values?.en} required={required} className={inputClass} />
      </Field>
      <Field label={`${label} · FR`}>
        <input name={`${name}Fr`} defaultValue={values?.fr} required={required} className={inputClass} />
      </Field>
    </div>
  );
}
