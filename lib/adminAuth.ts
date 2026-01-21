import { cookies } from "next/headers";

export function isAdminAuthed() {
  return cookies().get("admin")?.value === "1";
}
