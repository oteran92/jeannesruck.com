"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteArtwork, logout } from "@/app/admin/actions";
import type { Artwork } from "@/lib/types";
import ArtworkForm from "./ArtworkForm";

type Props = { artworks: Artwork[]; canSave: boolean };

export default function AdminPanel({ artworks, canSave }: Props) {
  // null = list view, "new" = create form, Artwork = edit form
  const [editing, setEditing] = useState<Artwork | "new" | null>(null);
  const [pending, startTransition] = useTransition();

  const remove = (art: Artwork) => {
    if (confirm(`Delete "${art.title.en}"? This cannot be undone.`)) {
      startTransition(() => deleteArtwork(art.id));
    }
  };

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-12">
      <header className="flex items-center justify-between mb-10">
        <h1 className="font-serif text-3xl">Artworks</h1>
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.2em]">
          <Link href="/" className="hover:text-accent">View site</Link>
          <button onClick={() => logout()} className="hover:text-accent">Sign out</button>
        </div>
      </header>

      {!canSave && (
        <p className="mb-8 border border-accent/40 bg-accent/5 p-4 text-sm">
          BLOB_READ_WRITE_TOKEN is not set: you can browse, but saving and uploading are disabled.
        </p>
      )}

      {editing ? (
        <ArtworkForm
          key={editing === "new" ? "new" : editing.id}
          artwork={editing === "new" ? undefined : editing}
          onDone={() => setEditing(null)}
        />
      ) : (
        <>
          <button
            onClick={() => setEditing("new")}
            disabled={!canSave}
            className="mb-8 inline-flex items-center gap-2 bg-foreground text-white px-5 py-3 text-xs uppercase tracking-[0.2em] disabled:opacity-40"
          >
            <Plus size={14} /> Add artwork
          </button>

          <ul className={`divide-y divide-neutral-200 border-y border-neutral-200 ${pending ? "opacity-50" : ""}`}>
            {artworks.map((art) => (
              <li key={art.id} className="flex items-center gap-5 py-4">
                <div className="relative w-16 h-20 shrink-0 bg-neutral-100">
                  <Image src={art.src} alt={art.title.en} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-xl truncate">{art.title.en}</p>
                  <p className="text-xs text-neutral-500 truncate">
                    {[art.title.fr, art.dimensions].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <button onClick={() => setEditing(art)} disabled={!canSave} title="Edit" className="p-2 hover:text-accent disabled:opacity-30">
                  <Pencil size={16} />
                </button>
                <button onClick={() => remove(art)} disabled={!canSave || pending} title="Delete" className="p-2 hover:text-accent disabled:opacity-30">
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
