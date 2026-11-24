import { handleEnquiry } from "@/lib/enquiry-handler";
import { practitionerSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  return handleEnquiry(req, "practitioner", practitionerSchema as never);
}
