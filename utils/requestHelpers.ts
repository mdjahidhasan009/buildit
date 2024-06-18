import { NextRequest } from "next/server";

/**
 * Extracts a parameter value from the request URL.
 *
 * @param req - The incoming Next.js request object.
 * @param paramName - The name of the parameter to extract. Defaults to "id".
 * @returns The value of the parameter if found, or null otherwise.
 */
export function extractParamFromRequest(req: NextRequest, paramName: string = "id"): string | null {
  const { searchParams } = new URL(req.url);
  return searchParams.get(paramName);
}

/**
 * Extracts body data from the request.
 *
 * @param req - The incoming Next.js request object.
 * @returns The body data if found, or null otherwise.
 */
export async function extractBodyFromRequest(req: NextRequest): Promise<any> {
  try {
    return await req.json();
  } catch (error) {
    console.error('Invalid Json', error);
    return null;
  }
}