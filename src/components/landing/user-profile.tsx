import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function UserProfile({ className }: { className?: string }) {
    return (
        <div className="flex items-center gap-2 p-4 bg-gray-100/10 backdrop-blur-xl my-2 rounded-lg">
            <Avatar className={`rounded-full max-w-8 max-h-8 ${className}`}>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="size-full rounded-full" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-full">
                <p className="text-sm font-medium leading-none mb-1">Shadcn</p>
                <p className="text-xs leading-none text-white/50">
                    shadcn.com
                </p>
            </div>
        </div>
    )
}
