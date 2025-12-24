/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import * as LucideIcons from "lucide-react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

import { cn, iconList } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IconPickerProps } from "@/lib/types/icon";

export function IconPicker({ value, onChange }: IconPickerProps) {
    const [open, setOpen] = React.useState(false);

    // Safety check: Pastikan iconList valid
    if (!iconList || !Array.isArray(iconList)) {
        return <p className="text-red-500 text-xs">Error loading icons</p>;
    }

    // Helper render icon terpilih
    const SelectedIcon = (LucideIcons as any)[value] || LucideIcons.Box;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-black/40 border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 hover:border-cyan-500/50 transition-all h-14 px-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-500/10 rounded-md border border-cyan-500/20">
                            <SelectedIcon className="h-5 w-5 text-cyan-400" />
                        </div>
                        <span className="font-mono text-sm">{value}</span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-75 p-0 border-white/10 bg-background shadow-[0_0_20px_rgba(0,0,0,0.5)] dark">
                {/* FIX UTAMA: Tambahkan 'text-zinc-100' disini */}
                <Command className="bg-background text-zinc-100">
                    <div className="flex items-center border-b border-white/10 px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-zinc-400" />
                        <CommandInput
                            placeholder="Search icon..."
                            className="h-11 bg-transparent text-white placeholder:text-zinc-500 focus:ring-0 border-none"
                        />
                    </div>
                    <CommandList>
                        <CommandEmpty className="py-6 text-center text-sm text-zinc-500">
                            No icon found.
                        </CommandEmpty>
                        <CommandGroup className="max-h-75 overflow-y-auto custom-scrollbar">
                            {iconList.map((iconName) => {
                                const IconComponent = (LucideIcons as any)[iconName];
                                if (!IconComponent) return null;

                                return (
                                    <CommandItem
                                        key={iconName}
                                        value={iconName}
                                        onSelect={() => {
                                            // Gunakan iconName asli agar casing tetap terjaga (misal "ArrowUp" bukan "arrowup")
                                            onChange(iconName);
                                            setOpen(false);
                                        }}
                                        // Styling item: Text abu-abu saat normal, Putih/Cyan saat hover/selected
                                        className="cursor-pointer text-zinc-400 aria-selected:bg-cyan-900/30 aria-selected:text-cyan-400 hover:bg-cyan-900/20 hover:text-white transition-colors"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4 text-cyan-400",
                                                value === iconName ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {/* Render Icon */}
                                        <IconComponent className="mr-2 h-4 w-4" />
                                        <span className="truncate">{iconName}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}