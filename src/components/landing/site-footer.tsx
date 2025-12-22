import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";
import Logo from "./logo";

export function SiteFooter() {
    return (
        <footer className="border-t border-white/5 bg-gray-900 text-white pt-16 pb-8">
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Logo src="/src/logo/dark-mode.png" width={48} height={48} />
                        <p className="text-sm text-white/60 max-w-xs">
                            Starter kit terbaik untuk developer Indonesia. Bangun SaaS impian Anda dalam hitungan hari, bukan bulan.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Produk</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Fitur</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Harga</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Showcase</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Dokumentasi</Link></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Legal</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Lisensi</Link></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">Connect</h3>
                        <div className="flex gap-4">
                            <Link href="#" className="text-white/60 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-white/60 hover:text-white transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-white/60 hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
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