"use client"
import { BellIcon, Contact2Icon, HomeIcon, MenuIcon, UserIcon, XIcon } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import Logo from "./logo"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserProfile from "./user-profile";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import NavigationItemWithIcon from "./navigation-item-with-icon";

const navigationData = [
    {
        title: 'Beranda',
        href: '#',
        icon: HomeIcon
    },
    {
        title: 'Harga',
        href: '#',
        icon: BellIcon
    },
    {
        title: 'About Us',
        href: '#',
        icon: UserIcon
    },
    {
        title: 'Contacts',
        href: '#',
        icon: Contact2Icon
    }
]
export default function NavbarSection() {

    return (
        <header className='bg-gray-800 sticky top-0 z-50'>
            <div className='relative container mx-auto flex max-w-7xl items-center justify-between max-md:gap-1 gap-4 px-6 py-6 max-md:px-6 max-md:py-4'>
                <Drawer direction="left">
                    <DrawerTrigger className='md:hidden bg-transparent' asChild>
                        <Button variant='outline' className="*:p-0 *:border-0">
                            <MenuIcon className="text-white h-6 w-6" />
                            <span className='sr-only'>Menu</span>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className='w-56 p-6 bg-gray-700/10 backdrop-blur-xl rounded-lg shadow-2xl text-white border-gray-700 '>
                        <DrawerHeader className="p-0">
                            <DrawerTitle className="flex justify-between items-center w-full">
                                <Logo className="gap-0 w-32 h-auto" src={'/src/logo/dark-mode-horizontal.png'} />
                                <DrawerClose asChild>
                                    <XIcon className="text-white h-6 w-6" />
                                </DrawerClose>
                            </DrawerTitle>

                        </DrawerHeader>
                        <div className=' flex flex-col w-full py-6'>
                            <UserProfile className="bg-gray-200" />
                            <div className='flex flex-col w-full items-start justify-start gap-6 my-8'>

                                {navigationData.map((item) => (
                                    <NavigationItemWithIcon key={item.title} item={item} />
                                ))}

                            </div>
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant='outline' size='icon' className="w-full text-center cursor-pointer text-black transition-all duration-300">Logout</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                <div className=' flex flex-1 items-center max-md:gap-2 md:gap-10 font-medium md:justify-start lg:justify-center lg:gap-16 text-white'>
                    <a href='#' className="hidden md:block lg:hidden">
                        <Logo className="gap-0" />
                    </a>
                    <a href='#' className='hover:text-blue-500 max-md:hidden'>
                        Home
                    </a>
                    <a href='#' className='hover:text-blue-500 max-md:hidden'>
                        Products
                    </a>
                    <a href='#' className="hidden lg:block">
                        <Logo className="gap-0" />
                    </a>
                    <a href='#' className='hover:text-blue-500 max-md:hidden'>
                        About Us
                    </a>
                    <a href='#' className='hover:text-blue-500 max-md:hidden'>
                        Contacts
                    </a>
                </div>

                <div className='flex items-center max-md:gap-4 gap-6 font-medium lg:absolute lg:right-6 lg:top-2 lg:translate-y-1/2'>
                    <Button variant='outline' size='icon' className="bg-transparent cursor-pointer hover:bg-transparent border-0 shadow-none ring-0">
                        <BellIcon className="text-white size-6" />
                        <span className='sr-only'>Search</span>
                    </Button>
                    <DropdownMenu >
                        <DropdownMenuTrigger className="cursor-pointer" asChild>
                            <Avatar>
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
                                    <a href={'#'}>Akun saya</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href={'#'}>Pengaturan</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href={'#'}>Pembayaran</a>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="h-1" />
                                <DropdownMenuItem>
                                    <a href={'#'}>Kelola Anggota</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href={'#'}>Tambah Anggota Baru</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href={'#'}>Bantuan</a>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Button variant='outline' size='icon' className="w-full text-center cursor-pointer text-black transition-all duration-300">Logout</Button>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </header>
    )
}