"use client";

import { useActionState } from "react";
import { login, type ActionState } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(login, {});

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form action={action} className="w-full max-w-xs flex flex-col gap-4">
        <h1 className="font-serif text-3xl text-center mb-4">Admin</h1>
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
          className="border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-foreground"
        />
        {state.error && <p className="text-accent text-xs">{state.error}</p>}
        <button disabled={pending} className="bg-foreground text-white py-3 text-xs uppercase tracking-[0.2em] disabled:opacity-50">
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
