import { supabaseAdmin } from "./supabaseAdmin";

export async function getSetting(key: string) {
  const { data, error } = await supabaseAdmin
    .from("settings")
    .select("value")
    .eq("key", key)
    .single();
  if (error) return null;
  return data?.value ?? null;
}

export async function setSetting(key: string, value: string) {
  const { error } = await supabaseAdmin
    .from("settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) throw error;
}
