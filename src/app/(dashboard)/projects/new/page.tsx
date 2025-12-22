"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Globe, Server, Database, Cpu, Layout, Box, AlertCircle, GitBranch } from "lucide-react";
import { useCreateProject } from "@/hooks/use-create-project";
import { IconPicker } from "@/components/projects/icon-picker";

// ... (Frameworks constant sama seperti sebelumnya) ...
const frameworks = [
    { id: "Next.js", name: "Next.js", icon: Globe, color: "hover:border-white/50 peer-checked:border-white peer-checked:bg-white/10" },
    { id: "React", name: "React", icon: Cpu, color: "hover:border-blue-500/50 peer-checked:border-blue-500 peer-checked:bg-blue-500/10 peer-checked:text-blue-400" },
    { id: "Node.js", name: "Node.js", icon: Server, color: "hover:border-emerald-500/50 peer-checked:border-emerald-500 peer-checked:bg-emerald-500/10 peer-checked:text-emerald-400" },
    { id: "Docker", name: "Docker", icon: Database, color: "hover:border-sky-500/50 peer-checked:border-sky-500 peer-checked:bg-sky-500/10 peer-checked:text-sky-400" },
    { id: "Vue", name: "Vue.js", icon: Layout, color: "hover:border-emerald-400/50 peer-checked:border-emerald-400 peer-checked:bg-emerald-400/10 peer-checked:text-emerald-300" },
    { id: "Other", name: "Other", icon: Box, color: "hover:border-amber-500/50 peer-checked:border-amber-500 peer-checked:bg-amber-500/10 peer-checked:text-amber-400" },
];

export default function NewProjectPage() {
    const { form, setters, action, state, isPending } = useCreateProject();

    return (
        <div className="max-w-full mx-auto space-y-8 relative z-10 pb-20">
            {/* Header - No Changes */}
            <div className="flex items-center gap-4">
                <Link href="/projects">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Create New Project</h1>
                    <p className="text-zinc-400 text-sm">Deploy aplikasi baru dalam hitungan detik.</p>
                </div>
            </div>

            <form action={action} className="space-y-8">
                {state.status === "error" && state.message && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex items-center gap-3 text-red-400">
                        <AlertCircle className="h-5 w-5" />
                        <p className="text-sm font-medium">{state.message}</p>
                    </div>
                )}

                {/* --- SECTION 1: IDENTITY (iconName, name, id) --- */}
                <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Project Identity</CardTitle>
                        <CardDescription className="text-zinc-400">Pilih identitas visual dan nama aplikasi.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">

                            {/* FIELD: iconName */}
                            <div className="space-y-2 flex flex-col items-center md:items-start">
                                <Label className="text-zinc-300">Icon</Label>
                                {/* Adjusted name to 'iconName' */}
                                <input type="hidden" name="iconName" value={form.iconName} />
                                <IconPicker value={form.iconName} onChange={setters.setIconName} />
                            </div>

                            <div className="flex-1 space-y-6">
                                {/* FIELD: name */}
                                <div className="space-y-2">
                                    <Label className="text-zinc-300">Project Name</Label>
                                    <Input
                                        name="name"
                                        placeholder="Worker Nodes"
                                        className="bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50"
                                        value={form.name}
                                        onChange={setters.setName}
                                        required
                                    />
                                    {state.errors?.name && <p className="text-xs text-red-500">{state.errors.name}</p>}
                                </div>

                                {/* FIELD: id (Slug) */}
                                <div className="space-y-2">
                                    <Label className="text-zinc-300">Project ID (URL Slug)</Label>
                                    <div className="flex rounded-md shadow-sm">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-white/10 bg-zinc-800 text-zinc-400 text-sm">
                                            app.nusantara.com/
                                        </span>
                                        <Input
                                            name="id" // Adjusted from slug to id
                                            placeholder="worker-nodes"
                                            className="rounded-l-none bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50 font-mono text-sm"
                                            value={form.id}
                                            onChange={setters.setId}
                                            required
                                        />
                                    </div>
                                    {state.errors?.id && <p className="text-xs text-red-500">{state.errors.id}</p>}
                                </div>
                            </div>
                        </div>

                        {/* FIELD: description */}
                        <div className="space-y-2">
                            <Label className="text-zinc-300">Description <span className="text-zinc-500">(Optional)</span></Label>
                            <Textarea
                                name="description"
                                placeholder="Redis worker for processing background jobs..."
                                className="bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50 min-h-24"
                                value={form.description}
                                onChange={setters.setDescription}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* --- SECTION 2: FRAMEWORK --- */}
                <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm">
                    {/* ... (Framework Grid Content Sama - Pastikan name="framework") ... */}
                    <CardHeader>
                        <CardTitle className="text-white">Framework Preset</CardTitle>
                        <CardDescription className="text-zinc-400">Pilih stack teknologi yang digunakan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {frameworks.map((fw) => (
                                <label key={fw.id} className="cursor-pointer group relative">
                                    <input
                                        type="radio"
                                        name="framework"
                                        value={fw.id}
                                        defaultChecked={fw.id === "Next.js"}
                                        className="peer sr-only"
                                    />
                                    {/* ... Styling sama ... */}
                                    <div className={`
                                        flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-white/10 bg-black/20 
                                        transition-all duration-200 
                                        ${fw.color}
                                    `}>
                                        <fw.icon className="h-8 w-8 opacity-70 group-hover:opacity-100 transition-opacity" />
                                        <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">{fw.name}</span>
                                    </div>
                                    <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-cyan-500 opacity-0 peer-checked:opacity-100 transition-opacity shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                                </label>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* --- SECTION 3: GIT REPO & BRANCH (repo, branch) --- */}
                <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Git Repository</CardTitle>
                        <CardDescription className="text-zinc-400">Hubungkan project dengan kode sumber Anda.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4 items-end">
                            {/* FIELD: repo */}
                            <div className="space-y-2 flex-1">
                                <Label className="text-zinc-300">Repository Name</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-4 w-4 text-zinc-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.42-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                    </div>
                                    <Input
                                        name="repo" // Adjusted to repo
                                        placeholder="shadcn/workers"
                                        className="pl-10 bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50"
                                        value={form.repo}
                                        onChange={setters.setRepo}
                                    />
                                </div>
                                {state.errors?.repo && <p className="text-xs text-red-500">{state.errors.repo}</p>}
                            </div>

                            {/* FIELD: branch (New Field) */}
                            <div className="space-y-2 w-32">
                                <Label className="text-zinc-300">Branch</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <GitBranch className="h-4 w-4 text-zinc-500" />
                                    </div>
                                    <Input
                                        name="branch"
                                        placeholder="main"
                                        className="pl-9 bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50"
                                        value={form.branch}
                                        onChange={setters.setBranch}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* --- FOOTER --- */}
                <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                    <Link href="/projects">
                        <Button type="button" variant="ghost" className="text-zinc-400 hover:text-white">Cancel</Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.6)] transition-all"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deploying...
                            </>
                        ) : (
                            "Deploy Project"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}