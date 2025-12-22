"use client";

import { useState } from "react";
import {
    Users, Mail, Plus, MoreHorizontal,
    UserCog,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
type Member = {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
    status: string;
};
// Dummy Data Anggota Tim
const initialMembers = [
    { id: 1, name: "Agus Santoso", email: "agus@nusantara.id", role: "Owner", avatar: "", status: "Active" },
    { id: 2, name: "Budi Pratama", email: "budi.dev@gmail.com", role: "Editor", avatar: "", status: "Active" },
    { id: 3, name: "Citra Dewi", email: "citra.design@yahoo.com", role: "Viewer", avatar: "", status: "Pending" },
];

export function TeamSettings() {

    const [members, setMembers] = useState(initialMembers);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("Viewer");
    const [isInviting, setIsInviting] = useState(false);

    const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [newRole, setNewRole] = useState("");

    // --- HANDLER: INVITE MEMBER ---
    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail) {
            toast.error("Email tidak boleh kosong");
            return;
        }

        setIsInviting(true);

        // Simulasi Network Request
        setTimeout(() => {
            const newMember = {
                id: Date.now(),
                name: inviteEmail.split("@")[0], // Generate nama dari email
                email: inviteEmail,
                role: inviteRole,
                avatar: "",
                status: "Pending"
            };

            setMembers([...members, newMember]);
            setInviteEmail(""); // Reset form
            setIsInviting(false);
            toast.success(`Undangan dikirim ke ${inviteEmail}`);
        }, 1000);
    };

    // --- HANDLER: REMOVE MEMBER ---
    const handleRemoveMember = (id: number, name: string) => {
        // Filter member yang id-nya tidak sama dengan yang dihapus
        setMembers(members.filter((m) => m.id !== id));
        toast.success(`${name} telah dihapus dari tim.`);
    };

    // --- HANDLER: BUKA MODAL CHANGE ROLE ---
    const openChangeRoleModal = (member: Member) => {
        setSelectedMember(member);
        setNewRole(member.role); // Set default value ke role saat ini
        setIsRoleDialogOpen(true);
    };

    // --- HANDLER: SIMPAN PERUBAHAN ROLE ---
    const confirmChangeRole = () => {
        if (!selectedMember) return;

        setMembers(members.map((m) =>
            m.id === selectedMember.id ? { ...m, role: newRole } : m
        ));

        setIsRoleDialogOpen(false);
        toast.success(`Role ${selectedMember.name} berhasil diubah menjadi ${newRole}`);
    };

    return (
        <>
            <Card className="bg-zinc-900/50 border-white/10">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Users className="w-5 h-5 text-cyan-500" /> Team Members
                            </CardTitle>
                            <CardDescription className="text-zinc-400">
                                Kelola akses anggota tim ke project ini.
                            </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-cyan-400 border-cyan-500/20 bg-cyan-500/10">
                            {members.length} Members
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">

                    {/* --- INVITE FORM --- */}
                    <form onSubmit={handleInvite} className="flex gap-3 items-end p-4 rounded-lg bg-black/40 border border-white/5">
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-medium text-zinc-400 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                <Input
                                    placeholder="teammate@company.com"
                                    className="pl-9 bg-zinc-900/50 border-white/10 text-white focus-visible:ring-cyan-500/50"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-32 space-y-2">
                            <label className="text-xs font-medium text-zinc-400 ml-1">Role</label>
                            <Select value={inviteRole} onValueChange={setInviteRole}>
                                <SelectTrigger className="bg-zinc-900/50 border-white/10 text-white mb-0">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Editor">Editor</SelectItem>
                                    <SelectItem value="Viewer">Viewer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="bg-white text-black hover:bg-zinc-200">
                            <Plus className="w-4 h-4 mr-2" /> Invite
                        </Button>
                    </form>

                    {/* --- MEMBERS LIST --- */}
                    <div className="space-y-1">
                        {members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-9 w-9 border border-white/10">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback className="bg-cyan-900 text-cyan-200 text-xs">
                                            {member.name.substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-white">{member.name}</span>
                                            {member.status === "Pending" && (
                                                <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-zinc-800 text-zinc-400 hover:bg-zinc-800">
                                                    Pending
                                                </Badge>
                                            )}
                                            {member.role === "Owner" && (
                                                <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/10">
                                                    Owner
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="text-xs text-zinc-500">{member.email}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="hidden group-hover:block text-xs text-zinc-500 mr-2">
                                        {member.role}
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white h-8 w-8">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-zinc-300">
                                            <DropdownMenuItem
                                                // PreventDefault agar dropdown tidak langsung menutup focus sebelum dialog siap
                                                onSelect={(e) => { e.preventDefault(); openChangeRoleModal(member); }}
                                                className="cursor-pointer focus:bg-white/10 focus:text-white"
                                            >
                                                <UserCog className="w-4 h-4 mr-2" /> Change Role
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator className="bg-white/10" />
                                            <DropdownMenuItem
                                                onClick={() => handleRemoveMember(member.id, member.name)}
                                                className="focus:bg-red-900/30 focus:text-red-400 text-red-500 cursor-pointer"
                                                disabled={member.role === "Owner"}
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" /> Remove Member
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>


                </CardContent>
            </Card>
            {/* --- DIALOG MODAL: CHANGE ROLE (DI LUAR CARD) --- */}
            <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                <DialogContent className="bg-zinc-950 border-white/10 text-white sm:max-w-106.25 z-50">
                    <DialogHeader>
                        <DialogTitle>Change Member Role</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Ubah tingkat akses untuk <span className="text-white font-medium">{selectedMember?.name}</span>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm font-medium text-zinc-400">Role</label>
                            <div className="col-span-3">
                                <Select value={newRole} onValueChange={setNewRole}>
                                    <SelectTrigger className="bg-zinc-900 border-white/10 text-white w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                        <SelectItem value="Admin">Admin (Full Access)</SelectItem>
                                        <SelectItem value="Editor">Editor (Can Deploy)</SelectItem>
                                        <SelectItem value="Viewer">Viewer (Read Only)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsRoleDialogOpen(false)} className="text-zinc-400 hover:text-white">Cancel</Button>
                        <Button onClick={confirmChangeRole} className="bg-cyan-600 hover:bg-cyan-500 text-white">Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}