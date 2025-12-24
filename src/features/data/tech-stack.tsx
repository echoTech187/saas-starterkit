import { Database, Lock, Server, CreditCard, Box, Cpu, Globe, Layout } from "lucide-react";


const tech_stack = [
    {
        name: "Next.js 15",
        colorClass: "hover:border-white/50 hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]",
        icon: (
            <svg viewBox="0 0 180 180" fill="none" className="w-12 h-12 fill-current"><mask id="mask0_408_134" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="black" /></mask><g mask="url(#mask0_408_134)"><circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="6" /><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" /><rect x="115" y="54" width="12" height="72" fill="white" /></g></svg>
        ),
    },
    {
        name: "React",
        colorClass: "hover:border-blue-400/50 hover:shadow-[0_0_20px_-5px_rgba(96,165,250,0.3)]",
        icon: (
            <svg viewBox="-10.5 -9.45 21 18.9" fill="none" className="w-12 h-12 text-blue-400 fill-current"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
        ),
    },
    {
        name: "TypeScript",
        colorClass: "hover:border-blue-600/50 hover:shadow-[0_0_20px_-5px_rgba(37,99,235,0.3)]",
        icon: (
            <svg viewBox="0 0 128 128" className="w-12 h-12"><path fill="#007ACC" d="M0 0h128v128H0z" /><path fill="#FFF" d="M71.4 78.3c1.3-2.6 3.1-4.7 5.4-6.4 2.3-1.6 5.1-2.4 8.5-2.4 4.5 0 8.1 1.5 10.9 4.6 2.8 3 4.1 7.4 4.1 13 0 3.3-.5 6.2-1.4 8.6s-2.3 4.5-4.1 6.1c-1.8 1.6-4 2.8-6.6 3.6-2.6.8-5.4 1.2-8.5 1.2-2.8 0-5.3-.3-7.5-1-2.2-.7-4.1-1.6-5.6-2.9-1.5-1.3-2.8-2.8-3.7-4.7-1-1.8-1.5-3.9-1.6-6.4h11.9c.1 1.6.6 2.8 1.5 3.7.9.8 2.3 1.3 4.1 1.3 1.9 0 3.3-.5 4.1-1.4.8-1 1.3-2.4 1.3-4.4 0-1.8-.4-3.1-1.3-4-.9-.8-2.3-1.3-4.2-1.3-1.8 0-3.3.4-4.5 1.3-1.2.9-2.1 2.3-2.8 4.3H60.1c1.2-4.9 3.5-8.8 6.9-11.6 3.4-2.8 7.8-4.2 13.3-4.2 4.4 0 7.9 1 10.4 3s3.8 4.9 3.8 8.6c0 1.9-.4 3.5-1.2 4.9-.8 1.4-1.9 2.5-3.3 3.4-1.4.9-3 1.5-4.8 1.9-1.8.4-3.6.6-5.5.6H71.4zm-14-6.7V105H43.9V71.6H31.7V60h37.4v11.6H57.4z" /></svg>
        ),
    },
    {
        name: "Tailwind CSS",
        colorClass: "hover:border-cyan-400/50 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]",
        icon: (
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-cyan-400 fill-current"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" /></svg>
        ),
    },
    {
        name: "Prisma ORM",
        icon: <Database className="w-10 h-10" />,
        colorClass: "hover:border-emerald-500/50 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] hover:text-emerald-400",
    },
    {
        name: "NextAuth.js",
        icon: <Lock className="w-10 h-10" />,
        colorClass: "hover:border-purple-500/50 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] hover:text-purple-400",
    },
    {
        name: "Midtrans",
        icon: <CreditCard className="w-10 h-10" />,
        colorClass: "hover:border-indigo-500/50 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] hover:text-indigo-400",
    },
    {
        name: "Docker Ready",
        icon: <Server className="w-10 h-10" />,
        colorClass: "hover:border-sky-500/50 hover:shadow-[0_0_20px_-5px_rgba(14,165,233,0.3)] hover:text-sky-400",
    },
];
const frameworks = [
    { id: "Next.js", name: "Next.js", icon: Globe, color: "hover:border-white/50 peer-checked:border-white peer-checked:bg-white/10" },
    { id: "React", name: "React", icon: Cpu, color: "hover:border-blue-500/50 peer-checked:border-blue-500 peer-checked:bg-blue-500/10 peer-checked:text-blue-400" },
    { id: "Node.js", name: "Node.js", icon: Server, color: "hover:border-emerald-500/50 peer-checked:border-emerald-500 peer-checked:bg-emerald-500/10 peer-checked:text-emerald-400" },
    { id: "Docker", name: "Docker", icon: Database, color: "hover:border-sky-500/50 peer-checked:border-sky-500 peer-checked:bg-sky-500/10 peer-checked:text-sky-400" },
    { id: "Vue", name: "Vue.js", icon: Layout, color: "hover:border-emerald-400/50 peer-checked:border-emerald-400 peer-checked:bg-emerald-400/10 peer-checked:text-emerald-300" },
    { id: "Other", name: "Other", icon: Box, color: "hover:border-amber-500/50 peer-checked:border-amber-500 peer-checked:bg-amber-500/10 peer-checked:text-amber-400" },
];
export { tech_stack, frameworks }