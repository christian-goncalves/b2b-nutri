import { handleSubmission } from "@/lib/forms/handler";
export const runtime = "nodejs";
export async function POST(request: Request) { return handleSubmission(request, "contato"); }
