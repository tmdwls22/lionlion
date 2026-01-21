import { getSupabaseAdmin } from "./supabaseAdmin";

export async function getSetting(key: string) {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data, error } = await sb
    .from("settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error) return null;
  return data?.value ?? null;
}

export async function setSetting(key: string, value: string) {
  const sb = getSupabaseAdmin();
  if (!sb) throw new Error("Supabase is not configured");

  const { error } = await sb
    .from("settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

  if (error) throw error;
}
