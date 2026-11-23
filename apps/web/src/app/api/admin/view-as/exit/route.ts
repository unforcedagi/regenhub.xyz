import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { sameSiteForm } from "@/lib/techne/guard";
import { siteOrigin } from "@/lib/techne/config";
import { VIEW_AS_COOKIE } from "@/lib/viewAs";

/**
 * Leave a portal preview (lib/viewAs.ts): drop the cookie, back to the picker. Signing out drops it too
 * (app/auth/signout), and it expires by itself after an hour.
 */
export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const crossSite = sameSiteForm(request);
  if (crossSite) return crossSite;
  const response = NextResponse.redirect(new URL("/admin/view-as", siteOrigin()), 303);
  response.cookies.delete(VIEW_AS_COOKIE);
  return response;
}
