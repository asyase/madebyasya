import { contractsDocument } from "@/lib/design-system/contracts";

// Exported as a static file: the machine-readable contracts an AI tool would receive.
export const dynamic = "force-static";

export function GET() {
  return Response.json(contractsDocument());
}
