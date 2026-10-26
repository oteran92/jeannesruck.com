import type { Metadata } from "next";
import { getArtworks, isBlobConfigured } from "@/lib/artworks";
import { isAdmin } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
  title: "Admin | Jeanne S R.",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!process.env.ADMIN_PASSWORD) {
    return <Notice>Set ADMIN_PASSWORD in the environment to enable the admin panel.</Notice>;
  }
  if (!(await isAdmin())) return <LoginForm />;

  return <AdminPanel artworks={await getArtworks()} canSave={isBlobConfigured()} />;
}

function Notice({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen flex items-center justify-center p-6 text-sm text-neutral-600">{children}</main>;
}
