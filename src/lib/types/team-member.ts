export enum Role {
    Owner = "Owner",
    Admin = "Admin",
    Member = "Member"
}
export enum Status {
    Active = "Active",
    Pending = "Pending"
}
export type Member = {
    id: number;
    name: string;
    email: string;
    role: Role | string;
    location: string;
    joined: string;
    avatar: string;
    initials: string;
    bio: string;
    skills: string[];
    performance: {
        commits: number;
        prs: number;
        deployments: number;
        uptime: string;
        score: number;
    };
    status: Status | string;
    avatarUrl: string;
};