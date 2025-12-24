import { Member } from "@/lib/types/team-member";
import { GitCommit, GitPullRequest, Zap } from "lucide-react";

const initialMembers: Member[] = [
    {
        id: 1,
        name: "Shadcn Admin",
        email: "m@example.com",
        role: "Owner",
        avatar: "",
        status: "Active",
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
    },
    {
        id: 2,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        avatar: "",
        status: "Active",
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
    },
    {
        id: 3,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Member",
        joined: "2023-11-15",
        location: "New York, USA",
        avatar: "",
        status: "Pending",
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
    },
];
const memberProfile = {
    id: 1,
    name: "Agus Santoso",
    role: "Senior Frontend Engineer",
    email: "agus@nusantara.id",
    location: "Jakarta, ID",
    joined: "September 2023",
    avatar: "",
    initials: "AG",
    bio: "Passionate about UI/UX and building accessible web applications. Love Shadcn UI and Tailwind CSS.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    performance: {
        commits: 452,
        prs: 86,
        deployments: 124,
        uptime: "99.9%",
        score: 92
    },
    status: "Active",
    avatarUrl: ""
};

const assignedProjects = [
    { name: "Nusantara SaaS", role: "Owner", status: "Live", tech: "Next.js" },
    { name: "Marketing Site", role: "Editor", status: "Building", tech: "Astro" },
    { name: "Documentation", role: "Viewer", status: "Live", tech: "Markdoc" },
];

const memberActivity = [
    { action: "pushed commit", target: "feat: add user profile page", time: "2 hours ago", icon: GitCommit },
    { action: "opened PR", target: "fix: mobile responsiveness", time: "5 hours ago", icon: GitPullRequest },
    { action: "deployed", target: "production v1.2.0", time: "Yesterday", icon: Zap },
];

export { initialMembers, memberProfile, assignedProjects, memberActivity };