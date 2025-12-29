/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FieldValues, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { removeToken } from "@/lib/utils/auth";
import { loginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginPageContent() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [isPendingGoogle, setIsPendingGoogle] = useState(false);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function signInWith(provider: string): Promise<void> {
        setIsPendingGoogle(true);
        try {
            await signIn(provider, {
                callbackUrl: "/dashboard",
                redirect: true,
                pages: {
                    signIn: "/login",
                    error: "/login",
                    signOut: "/login",
                    newUser: "/register"
                }
            });
            // Kode di bawah ini tidak akan jalan karena redirect: true
        } catch (error: any) {
            await signOut();
            await removeToken();

            toast.error(error.message, { duration: 5000 });
            setIsPendingGoogle(false);
            router.replace('/login', { scroll: false });
        }

    }
    async function onSubmit(values: FieldValues) {

        setIsPending(true);
        const { username, password } = values;

        const result = await signIn("credentials", {
            redirect: false,
            username,
            password
        });

        if (result?.error) {
            setIsPending(false);
            await signOut({ redirect: false });
            await removeToken();
            toast.error(result.error, { duration: 5000 });
        } else {
            setIsPending(false);
            router.refresh();
            router.push("/dashboard");
        }

    }



    return (
        <div className="relative w-full min-h-screen bg-black  text-white overflow-x-hidden">
            <div className="relative w-full max-w-6xl mx-auto flex min-h-screen">
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 relative z-10">
                    <div className="absolute top-6 md:top-8 left-8">
                        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Kembali
                        </Link>
                    </div>

                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                                Selamat Datang,
                            </h1>
                            <p className="max-md:text-xs text-zinc-400">
                                Masuk ke dashboard untuk mengelola SaaS Anda.
                            </p>
                        </div>

                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-zinc-300">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending || isPendingGoogle}
                                                    type="text"
                                                    placeholder="nama@example.com"
                                                    className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-12 rounded-xl"
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
                                            <div className="flex items-center justify-between">
                                                <FormLabel className="text-zinc-300">Password</FormLabel>
                                                <Link href="/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300">
                                                    Lupa password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending || isPendingGoogle}
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-12 rounded-xl"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={isPending || isPendingGoogle}
                                    className="w-full h-12 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
                                >
                                    {isPendingGoogle ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="animate-spin w-4 h-4" />
                                            <span>Permintaan sedang diproses...</span>
                                        </div>
                                    ) : "Masuk"}
                                </Button>
                            </form>
                        </Form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-black/10 px-2 text-zinc-400">Atau masuk dengan</span>
                            </div>
                        </div>

                        <Button disabled={isPendingGoogle} onClick={() => signInWith('google')} variant="outline" type="button" className="w-full h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:text-white text-zinc-300 gap-2">
                            {
                                !isPendingGoogle ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M23.495 12.281c0-.813-.066-1.63-.207-2.43H12.004v4.606h6.462a5.537 5.537 0 0 1-2.391 3.635v2.99h3.855c2.263-2.084 3.565-5.161 3.565-8.8z"></path><path fill="#34A853" d="M12.004 23.97c3.227 0 5.948-1.06 7.93-2.889l-3.855-2.989c-1.072.73-2.457 1.143-4.07 1.143-3.121 0-5.767-2.105-6.717-4.936H1.314v3.081a11.964 11.964 0 0 0 10.69 6.59z"></path><path fill="#FBBC04" d="M5.288 14.299a7.165 7.165 0 0 1 0-4.58V6.637H1.314a11.973 11.973 0 0 0 0 10.743l3.974-3.08z"></path><path fill="#EA4335" d="M12.004 4.778a6.5 6.5 0 0 1 4.59 1.793l3.415-3.415A11.497 11.497 0 0 0 12.004.044a11.96 11.96 0 0 0-10.69 6.593L5.288 9.72c.945-2.835 3.596-4.941 6.716-4.941z"></path></svg>
                                        Google
                                    </>
                                ) : (
                                    <>
                                        <Loader2 className="animate-spin w-4 h-4" />
                                        <span>Memuat...</span>
                                    </>
                                )}
                        </Button>

                        <p className="text-center text-sm text-zinc-500">
                            Belum punya akun?{" "}
                            <Link href="/register" className="font-semibold text-cyan-400 hover:text-cyan-300">
                                Daftar Sekarang
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="hidden lg:flex w-1/2 bg-black relative justify-center items-center">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                    <div className="relative z-10 max-w-lg text-center p-8">
                        <div className="relative w-full h-full mx-auto mb-8 animate-in fade-in zoom-in duration-700">
                            <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full opacity-40 animate-pulse" />
                            <Image
                                src="/src/images/illustration/1.png"
                                alt="Login Illustration"
                                width={600}
                                height={600}
                                unoptimized
                                loading="eager"
                                className="relative z-10 w-full h-full object-contain"
                            />
                            <div
                                className="absolute inset-0 z-20 pointer-events-none"
                                style={{ boxShadow: 'inset 0 0 40px 40px #000000' }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-30" />
                        </div>
                        <blockquote className="space-y-2">
                            <p className="text-xl font-medium text-white">
                                &ldquo;Starter kit ini menyelamatkan saya dari 2 bulan setup yang membosankan. Sekarang saya bisa fokus jualan.&rdquo;
                            </p>
                            <footer className=" text-zinc-200">@alexunder - Fullstack Dev</footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    // We wrap the component in Suspense to use useSearchParams()
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPageContent />
        </Suspense>
    );
}