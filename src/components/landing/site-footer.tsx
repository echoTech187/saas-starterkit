"use client"; // Tambahkan use client

import { Twitter, Linkedin } from "lucide-react";
import Logo from "./logo";
import { toast } from "sonner";
import { GithubIcon } from "../ui/github-icon";

export function SiteFooter() {

    const handleScroll = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDummyLink = (name: string) => {
        toast.info(`Link ${name}`, { description: "Link ini hanya demo untuk keperluan UI." });
    };

    return (
        <footer className="border-t border-white/5 bg-gray-900 text-white pt-16 pb-8 scroll-mt-8">
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Logo src="/src/logo/logo.png" width={48} height={48} />
                        <p className="text-sm text-white/60 max-w-xs">
                            Starter kit terbaik untuk developer Indonesia. Bangun SaaS impian Anda dalam hitungan hari, bukan bulan.
                        </p>
                    </div>

                    {/* Product Links - SCROLL ACTION */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Produk</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><button onClick={() => handleScroll('#features')} className="hover:text-cyan-400 transition-colors cursor-pointer">Fitur</button></li>
                            <li><button onClick={() => handleScroll('#pricing')} className="hover:text-cyan-400 transition-colors cursor-pointer">Harga</button></li>
                            <li><button onClick={() => handleScroll('#hero')} className="hover:text-cyan-400 transition-colors cursor-pointer">Demo</button></li>
                            <li><button onClick={() => handleScroll('#faq')} className="hover:text-cyan-400 transition-colors cursor-pointer">FAQ</button></li>
                        </ul>
                    </div>

                    {/* Legal Links - DUMMY ACTION */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Legal</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><button onClick={() => handleDummyLink('Privacy')} className="hover:text-cyan-400 transition-colors cursor-pointer">Privacy Policy</button></li>
                            <li><button onClick={() => handleDummyLink('ToS')} className="hover:text-cyan-400 transition-colors cursor-pointer">Terms of Service</button></li>
                            <li><button onClick={() => handleDummyLink('License')} className="hover:text-cyan-400 transition-colors cursor-pointer">Lisensi</button></li>
                        </ul>
                    </div>

                    {/* Social Links - DUMMY ACTION */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Connect</h3>
                        <div className="flex gap-4">
                            <button onClick={() => handleDummyLink('Twitter')} className="text-white/60 hover:text-white transition-colors cursor-pointer">
                                <Twitter className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDummyLink('Github')} className="text-white/60 hover:text-white transition-colors cursor-pointer">
                                <GithubIcon className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDummyLink('LinkedIn')} className="text-white/60 hover:text-white transition-colors cursor-pointer">
                                <Linkedin className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-zinc-500">
                        &copy; {new Date().getFullYear()} NusantaraSaaS. All rights reserved.
                    </p>
                    <p className="text-xs text-zinc-600">
                        Dibuat dengan ☕ dan Next.js di Jakarta.
                    </p>
                </div>
            </div>
        </footer>
    );
}