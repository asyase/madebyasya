import { tokensDocument } from "@/lib/design-system/tokens";

// Exported as a static file: all primitive, semantic (per brand) and component tokens.
export const dynamic = "force-static";

export function GET() {
  return Response.json(tokensDocument());
}
