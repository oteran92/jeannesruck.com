"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { ChevronDown, ChevronUp, GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { deleteArtwork, logout, reorderArtworks } from "@/app/admin/actions";
import type { Artwork } from "@/lib/types";
import ArtworkForm from "./ArtworkForm";

type Props = { artworks: Artwork[]; canSave: boolean };

export default function AdminPanel({ artworks, canSave }: Props) {
  // null = list view, "new" = create form, Artwork = edit form
  const [editing, setEditing] = useState<Artwork | "new" | null>(null);
  const [pending, startTransition] = useTransition();
  const [items, setItems] = useState(artworks);
  const [synced, setSynced] = useState(artworks);

  // Reset the local order whenever the server sends a fresh list.
  if (artworks !== synced) {
    setSynced(artworks);
    setItems(artworks);
  }

  const orderChanged = items.some((art, i) => art.id !== artworks[i]?.id);

  // Swaps an artwork with its neighbour; used by the arrow buttons.
  const move = (index: number, delta: number) => {
    const next = [...items];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    setItems(next);
  };

  const saveOrder = () => startTransition(() => reorderArtworks(items.map((a) => a.id)));

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
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setEditing("new")}
              disabled={!canSave || orderChanged}
              className="inline-flex items-center gap-2 bg-foreground text-white px-5 py-3 text-xs uppercase tracking-[0.2em] disabled:opacity-40"
            >
              <Plus size={14} /> Add artwork
            </button>

            {orderChanged ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={saveOrder}
                  disabled={pending}
                  className="bg-accent text-white px-5 py-3 text-xs uppercase tracking-[0.2em] disabled:opacity-50"
                >
                  {pending ? "Saving…" : "Save order"}
                </button>
                <button
                  onClick={() => setItems(artworks)}
                  disabled={pending}
                  className="px-5 py-3 text-xs uppercase tracking-[0.2em] border border-neutral-300"
                >
                  Reset
                </button>
              </div>
            ) : (
              canSave && <p className="text-xs text-neutral-500">Drag the handle to reorder the gallery.</p>
            )}
          </div>

          <Reorder.Group
            axis="y"
            values={items}
            onReorder={setItems}
            className={`divide-y divide-neutral-200 border-y border-neutral-200 ${pending ? "opacity-50" : ""}`}
          >
            {items.map((art, index) => (
              <Row
                key={art.id}
                art={art}
                canSave={canSave}
                // Editing or deleting would discard an unsaved order, so wait until it is saved.
                locked={!canSave || pending || orderChanged}
                onUp={index > 0 ? () => move(index, -1) : undefined}
                onDown={index < items.length - 1 ? () => move(index, 1) : undefined}
                onEdit={() => setEditing(art)}
                onDelete={() => remove(art)}
              />
            ))}
          </Reorder.Group>
        </>
      )}
    </main>
  );
}

type RowProps = {
  art: Artwork;
  canSave: boolean;
  locked: boolean;
  onUp?: () => void;
  onDown?: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

// Only the grip starts a drag, so rows stay scrollable on touch screens.
function Row({ art, canSave, locked, onUp, onDown, onEdit, onDelete }: RowProps) {
  const controls = useDragControls();

  return (
    <Reorder.Item value={art} dragListener={false} dragControls={controls} className="flex items-center gap-5 py-4 bg-background">
      <button
        onPointerDown={(e) => canSave && controls.start(e)}
        disabled={!canSave}
        title="Drag to reorder"
        className="p-1 -ml-1 text-neutral-400 hover:text-foreground cursor-grab active:cursor-grabbing touch-none disabled:opacity-30"
      >
        <GripVertical size={18} />
      </button>
      <div className="relative w-16 h-20 shrink-0 bg-neutral-100 pointer-events-none">
        <Image src={art.src} alt={art.title.en} fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex-1 min-w-0 select-none">
        <p className="font-serif text-xl truncate">{art.title.en}</p>
        <p className="text-xs text-neutral-500 truncate">{[art.title.fr, art.dimensions].filter(Boolean).join(" · ")}</p>
      </div>
      <div className="flex flex-col">
        <button onClick={onUp} disabled={!canSave || !onUp} title="Move up" className="p-1 hover:text-accent disabled:opacity-20">
          <ChevronUp size={16} />
        </button>
        <button onClick={onDown} disabled={!canSave || !onDown} title="Move down" className="p-1 hover:text-accent disabled:opacity-20">
          <ChevronDown size={16} />
        </button>
      </div>
      <button onClick={onEdit} disabled={locked} title="Edit" className="p-2 hover:text-accent disabled:opacity-30">
        <Pencil size={16} />
      </button>
      <button onClick={onDelete} disabled={locked} title="Delete" className="p-2 hover:text-accent disabled:opacity-30">
        <Trash2 size={16} />
      </button>
    </Reorder.Item>
  );
}
