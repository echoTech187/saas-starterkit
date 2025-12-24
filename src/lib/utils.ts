import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as LucideIcons from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const iconList = Object.keys(LucideIcons)
  .filter((key) => key !== "icons" && key !== "createLucideIcon")
  .slice(0, 300) // Limit 300 icon agar performa tetap ringan
  .sort();

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Live": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
    case "Building": return "bg-amber-500/15 text-amber-400 border-amber-500/20";
    case "Error": return "bg-red-500/15 text-red-400 border-red-500/20";
    default: return "bg-zinc-500/15 text-zinc-400 border-zinc-500/20";
  }
};