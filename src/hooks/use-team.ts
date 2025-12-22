"use client";

import { useState } from "react";

export type TeamMember = {
    id: string;
    name: string;
    email: string;
    role: "Owner" | "Admin" | "Member";
    avatar: string; // URL avatar dummy
    status: "Active" | "Pending";
};

const initialMembers: TeamMember[] = [
    {
        id: "1",
        name: "Shadcn Admin",
        email: "m@example.com",
        role: "Owner",
        avatar: "",
        status: "Active"
    },
    {
        id: "2",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        avatar: "", // Kosong biar pakai fallback
        status: "Active"
    },
    {
        id: "3",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Member",
        avatar: "",
        status: "Pending"
    },
];

export function useTeam() {
    const [members, setMembers] = useState<TeamMember[]>(initialMembers);
    const [isLoading, setIsLoading] = useState(false);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("Member");

    // 1. INVITE MEMBER
    const handleInviteMember = () => {
        setIsLoading(true);
        // Simulasi API Call
        setTimeout(() => {
            const newMember: TeamMember = {
                id: Date.now().toString(),
                name: inviteEmail.split("@")[0], // Pakai nama dari email dulu
                email: inviteEmail,
                role: inviteRole as "Owner" | "Admin" | "Member",
                avatar: "",
                status: "Pending"
            };
            setMembers([...members, newMember]);
            setIsInviteOpen(false);
            setInviteEmail("");
            setIsLoading(false);
            alert(`Undangan dikirim ke ${inviteEmail}`);
        }, 1000);
    };

    // 2. REMOVE MEMBER
    const handleRemoveMember = (id: string) => {
        if (confirm("Yakin ingin menghapus anggota ini dari tim?")) {
            setMembers(members.filter(m => m.id !== id));
        }
    }

    // 3. RESEND INVITATION
    const handleResendInvite = (email: string) => {
        alert(`Undangan dikirim ulang ke ${email}`);
    }

    return {
        members,
        isLoading,
        isInviteOpen,
        setIsInviteOpen,
        inviteEmail,
        setInviteEmail,
        inviteRole,
        setInviteRole,
        handleInviteMember,
        handleRemoveMember,
        handleResendInvite
    };
}