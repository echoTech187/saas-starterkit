"use client";

import { initialMembers } from "@/features/data/team-member";
import { Member, Role, Status } from "@/lib/types/team-member";
import { useState } from "react";

export function useTeam() {
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [isLoading, setIsLoading] = useState(false);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("Member");

    // 1. INVITE MEMBER
    const handleInviteMember = () => {
        setIsLoading(true);
        // Simulasi API Call
        setTimeout(() => {
            const newMember: Member = {
                id: Date.now(),
                name: inviteEmail.split("@")[0],
                email: inviteEmail,
                role: inviteRole as Role,
                avatar: "",
                status: "Pending" as Status,
                location: "",
                joined: "",
                initials: "",
                bio: "",
                skills: [],
                performance: {
                    commits: 0,
                    prs: 0,
                    deployments: 0,
                    uptime: "",
                    score: 0
                },
                avatarUrl: ""
            };
            setMembers([...members, newMember]);
            setIsInviteOpen(false);
            setInviteEmail("");
            setIsLoading(false);
            alert(`Undangan dikirim ke ${inviteEmail}`);
        }, 1000);
    };

    // 2. REMOVE MEMBER
    const handleRemoveMember = (id: number) => {
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