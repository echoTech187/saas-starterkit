import { LucideIcon } from "lucide-react";

type NavigationProps = {
    title: string;
    href: string;
    icon: LucideIcon;
}
export default function NavigationItemWithIcon({ item }: { item: NavigationProps }) {
    return (
        <div className='flex items-center gap-2' key={item.title}>
            <item.icon className="h-6 w-6" />
            <a href={item.href} key={item.title}>
                <span className='text-sm'>{item.title}</span>
            </a>
        </div>
    )
}