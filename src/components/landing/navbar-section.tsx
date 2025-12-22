"use client"
import { BellIcon, HomeIcon, MenuIcon, UserIcon, XIcon, LogOut, CreditCard } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import Logo from "./logo"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserProfile from "./user-profile";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"; // Pastikan import benar
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { useRouter } from "next/navigation"; // Untuk redirect
import { toast } from "sonner"; // Untuk feedback

// Update Data Navigasi dengan ID Section
const navigationData = [
    { title: 'Beranda', href: '#hero', icon: HomeIcon },
    { title: 'Fitur', href: '#features', icon: BellIcon }, // Ganti Harga jadi Fitur/Pricing
    { title: 'Harga', href: '#pricing', icon: CreditCard },
    { title: 'FAQ', href: '#faq', icon: UserIcon },
]

export default function NavbarSection() {
    const router = useRouter();

    // Fungsi Smooth Scroll
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Fungsi Logout Simulasi
    const handleLogout = () => {
        toast.success("Berhasil Logout", { description: "Sampai jumpa lagi!" });
        router.push("/login"); // Redirect ke halaman login
    };


    return (
        <header className='bg-gray-900 sticky top-0 z-50 border-b border-white/5'>
            <div className='relative container mx-auto flex max-w-7xl items-center justify-between max-md:gap-1 gap-4 px-6 py-4'>

                {/* --- MOBILE DRAWER --- */}
                <Drawer direction="left">
                    <DrawerTrigger className='md:hidden bg-transparent' asChild>
                        <Button variant='outline' size="icon" className="border-white/10 bg-white/5 text-white">
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className='w-64 p-0 bg-gray-900 border-r border-white/10 text-white'>
                        <DrawerHeader className="p-6 border-b border-white/10">
                            <DrawerTitle className="flex justify-between items-center w-full">
                                <Logo className="gap-2 h-12 w-auto" src={'/src/logo/dark-mode-horizontal.png'} width={160} height={320} />
                                <DrawerClose asChild>
                                    <XIcon className="text-zinc-400 h-5 w-5" />
                                </DrawerClose>
                            </DrawerTitle>
                        </DrawerHeader>
                        <div className='flex flex-col w-full p-6 gap-6'>
                            <UserProfile className="bg-white/5" />
                            <div className='flex flex-col gap-4'>
                                {navigationData.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        onClick={(e) => handleScroll(e, item.href)}
                                        className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <DrawerFooter className="border-t border-white/10 p-6">
                            <DrawerClose asChild>
                                <Button onClick={handleLogout} className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20">
                                    <LogOut className="mr-2 h-4 w-4" /> Logout
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>

                {/* --- DESKTOP NAVIGATION --- */}
                <div className='flex flex-1 items-center max-md:hidden md:gap-8 justify-center font-bold text-zinc-400'>
                    <a href='#hero' onClick={(e) => handleScroll(e, '#hero')} className='hover:text-white transition-colors'>Beranda</a>
                    <a href='#features' onClick={(e) => handleScroll(e, '#features')} className='hover:text-white transition-colors'>Fitur</a>

                    <a href='#hero' onClick={(e) => handleScroll(e, '#hero')}>
                        <Logo className="mx-4" />
                    </a>

                    <a href='#pricing' onClick={(e) => handleScroll(e, '#pricing')} className='hover:text-white transition-colors'>Harga</a>
                    <a href='#faq' onClick={(e) => handleScroll(e, '#faq')} className='hover:text-white transition-colors'>FAQ</a>
                </div>

                {/* --- USER DROPDOWN --- */}
                <div className='flex items-center gap-4'>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer focus:outline-none" asChild>
                            <Avatar className="h-9 w-9 border border-white/10 hover:border-cyan-500/50 transition-colors">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-72 p-4 mt-2 bg-gray-700/10 backdrop-blur-xl rounded-lg shadow-2xl text-white border-gray-700 ' align='end'>
                            <DropdownMenuGroup className="mb-4">
                                <UserProfile />
                            </DropdownMenuGroup>
                            <DropdownMenuGroup className="flex flex-col gap-2">
                                <DropdownMenuItem>
                                    <a href={'/dashboard'}>Overview</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href={'/settings'}>Akun saya</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href={'/projects'}>Pengaturan</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href={'/billing'}>Pembayaran</a>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem>
                                    <a href={'/projects/new'}>Tambah Tim</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href={'/projects'}>Tambah Anggota Baru</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href={'#faq'}>Bantuan</a>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-300">
                                    <Button onClick={handleLogout} className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20">
                                        <LogOut className="mr-2 h-4 w-4" /> Logout
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}