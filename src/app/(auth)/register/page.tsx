"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useActionState } from "react";
import { registerAction } from "@/app/_actions/authActions";

export default function RegisterPage() {
    const router = useRouter()
    const [state, formAction, isPending] = useActionState(registerAction, null);
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirm_password: "",
        },
    });

    return (
        <div className="relative w-full min-h-screen bg-black  text-white overflow-x-hidden">
            {/* <Image
                src="/src/images/illustration/login.png"
                alt="Login Illustration"
                width={16000}
                height={9000}
                unoptimized
                loading="eager"
                className=" z-1 w-screen h-screen object-cover absolute left-[50%] top-0 -translate-x-1/2 -trnslate-y-1/3  opacity-10"
            /> */}
            <div className="w-full max-w-6xl mx-auto flex min-h-screen">

                {/* --- BAGIAN KIRI: FORM --- */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 relative z-10">

                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-xl md:text-4xl  font-bold tracking-tight text-white">
                                Buat Akun Baru.
                            </h1>
                            <p className="max-md:text-sm mt-2 text-zinc-400">
                                Mulai perjalanan SaaS Anda dalam hitungan menit.
                            </p>
                        </div>

                        <Form {...form} >
                            <form action={formAction} className="space-y-4">

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-300">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="nama@perusahaan.com"
                                                    className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-cyan-500/50 h-12 rounded-xl"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-300">Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-cyan-500/50 h-12 rounded-xl"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-300">Konfirmasi Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-cyan-500/50 h-12 rounded-xl"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-12 mt-4 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20"
                                >
                                    Daftar Sekarang
                                </Button>
                            </form>
                        </Form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-black/10 px-2 text-zinc-400">Atau daftar dengan</span>
                            </div>
                        </div>

                        <Button variant="outline" type="button" className="w-full h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:text-white text-zinc-300 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M23.495 12.281c0-.813-.066-1.63-.207-2.43H12.004v4.606h6.462a5.537 5.537 0 0 1-2.391 3.635v2.99h3.855c2.263-2.084 3.565-5.161 3.565-8.8z"></path><path fill="#34A853" d="M12.004 23.97c3.227 0 5.948-1.06 7.93-2.889l-3.855-2.989c-1.072.73-2.457 1.143-4.07 1.143-3.121 0-5.767-2.105-6.717-4.936H1.314v3.081a11.964 11.964 0 0 0 10.69 6.59z"></path><path fill="#FBBC04" d="M5.288 14.299a7.165 7.165 0 0 1 0-4.58V6.637H1.314a11.973 11.973 0 0 0 0 10.743l3.974-3.08z"></path><path fill="#EA4335" d="M12.004 4.778a6.5 6.5 0 0 1 4.59 1.793l3.415-3.415A11.497 11.497 0 0 0 12.004.044a11.96 11.96 0 0 0-10.69 6.593L5.288 9.72c.945-2.835 3.596-4.941 6.716-4.941z"></path></svg>
                            Google
                        </Button>

                        <p className="text-center text-sm text-zinc-500">
                            Sudah punya akun?{" "}
                            <Link href="/login" className="font-semibold text-cyan-400 hover:text-cyan-300">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* --- BAGIAN KANAN: VISUAL --- */}
                <div className="hidden lg:flex w-1/2 bg-black relative justify-center items-center">
                    {/* <div className="absolute inset-0 bg-linear-to-bl from-purple-900/20 via-black to-blue-900/20" /> */}
                    {/* <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div> */}

                    <div className="relative z-10 max-w-lg text-center p-8">
                        <div className="relative w-full h-full mx-auto mb-8 animate-in fade-in zoom-in duration-700">

                            <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full opacity-40 animate-pulse" />

                            <Image
                                src="/src/images/illustration/register.png"
                                alt="Login Illustration"
                                width={600}
                                height={600}
                                unoptimized
                                loading="eager"
                                className="relative z-1 w-full h-full object-contain"
                            />

                            <div
                                className="absolute inset-0 z-20 pointer-events-none"
                                style={{
                                    boxShadow: 'inset 0 0 40px 40px #000000'
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-30" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Bergabung dengan Revolusi.</h2>
                        <p className="text-zinc-100">
                            Akses ke teknologi standar enterprise dan komunitas developer yang saling mendukung.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}