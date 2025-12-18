import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine multiple className inputs into a single string.
 * - Uses `clsx` to conditionally join and normalize class values.
 * - Uses `twMerge` to intelligently merge Tailwind utility classes
 *   (resolving conflicting utilities like `p-2` vs `p-4`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
