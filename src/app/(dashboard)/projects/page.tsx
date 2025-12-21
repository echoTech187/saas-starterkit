"use client";

import { Plus, MoreVertical, Pencil, Trash2, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/use-projects";
import Link from "next/link";

export default function ProjectsPage() {
    // Destructure semua logic dari hook
    const {
        projects, searchTerm, setSearchTerm,
        isCreateOpen, setIsCreateOpen,
        isEditOpen, setIsEditOpen,
        formData, setFormData,
        openCreateModal, handleCreateSubmit,
        openEditModal, handleUpdateSubmit, handleDelete
    } = useProjects();

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Projects</h2>
                    <p className="text-zinc-400">Kelola semua aplikasi SaaS Anda di satu tempat.</p>
                </div>

                {/* BUTTON: TRIGGER OPEN MODAL */}
                <Button onClick={openCreateModal} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]">
                    <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
            </div>

            {/* SEARCH BAR */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Cari project..."
                        className="pl-9 bg-zinc-900/50 border-white/10 text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* GRID LIST */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id} className="bg-zinc-900/40 border-white/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                            <div>
                                <CardTitle className="text-lg font-semibold text-white"><Link href={`/projects/${project.id}`}>{project.name}</Link></CardTitle>
                                <CardDescription className="text-zinc-500">{project.domain}</CardDescription>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-white/10">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white">
                                    <DropdownMenuItem onClick={() => openEditModal(project)} className="cursor-pointer">
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(project.id)} className="text-red-400 cursor-pointer">
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <Badge variant="outline" className={`border-white/10 ${project.status === "Active" ? "text-emerald-400 bg-emerald-400/10" : "text-zinc-500"}`}>{project.status}</Badge>
                                <Badge variant="outline" className="border-white/10 text-blue-400 bg-blue-400/10">{project.framework}</Badge>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border-white/5 pt-4">
                            <div className="flex items-center text-xs text-zinc-500"><Calendar className="mr-1 h-3 w-3" /> Updated {project.updatedAt}</div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* --- MODALS DIKENDALIKAN HOOK --- */}

            {/* CREATE MODAL */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="bg-zinc-900 border-white/10 text-white">
                    <DialogHeader><DialogTitle>Buat Project Baru</DialogTitle></DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right text-zinc-300">Name</Label>
                            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="col-span-3 bg-black border-white/10 text-white" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right text-zinc-300">Domain</Label>
                            <Input value={formData.domain} onChange={(e) => setFormData({ ...formData, domain: e.target.value })} className="col-span-3 bg-black border-white/10 text-white" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleCreateSubmit} className="bg-cyan-500 text-black">Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* EDIT MODAL */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="bg-zinc-900 border-white/10 text-white">
                    <DialogHeader><DialogTitle>Edit Project</DialogTitle></DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-black border-white/10 text-white" />
                        <Input value={formData.domain} onChange={(e) => setFormData({ ...formData, domain: e.target.value })} className="bg-black border-white/10 text-white" />
                    </div>
                    <DialogFooter>
                        <Button onClick={handleUpdateSubmit} className="bg-cyan-500 text-black">Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}