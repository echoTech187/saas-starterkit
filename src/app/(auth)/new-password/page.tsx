"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { registerAction } from "@/app/_actions/authActions";
import { registerSchema } from "@/lib/validations/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

export default function NewPasswordPage() {
    const router = useRouter()
    const { data: session, status } = useSession();
    const email = session?.user.email;
    const [state, formAction, isPending] = useActionState(registerAction, null);
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm_password: "",
        },
    });



    useEffect(() => {
        if (state?.success) {
            // toast.success("Pendaftaran berhasil", { duration: 3000, description: state?.message });
            router.replace("/otp", { scroll: false });
        }

        function getUser() {
            if (email) {
                form.setValue("email", email);
            }
        }
        getUser();
    }, [state, formAction, router, form, email]);

    return email && status !== "loading" && (
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
                                Buat Password Baru.
                            </h1>
                            <p className="max-md:text-sm mt-2 text-zinc-400">
                                Buat password baru untuk akun Anda.
                            </p>
                        </div>

                        <Form {...form} >
                            <form action={formAction} className="space-y-4">

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="hidden">
                                            <FormLabel className="text-zinc-300">Email</FormLabel>
                                            <FormControl>
                                                <Input

                                                    type="email"
                                                    placeholder="nama@perusahaan.com"
                                                    className="hidden bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-cyan-500/50 h-12 rounded-xl"
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
                                                    autoFocus
                                                    disabled={isPending}
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
                                                    disabled={isPending}
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
                                    disabled={isPending}
                                    type="submit"
                                    className="w-full h-12 mt-4 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20"
                                >
                                    {
                                        isPending ? (
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 animate-spin">
                                                    <path fill="currentColor" d="M12 3.5a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5H13.5v6.75a.75.75 0 0 1-1.5 0V13.5H6.75a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75z" />
                                                </svg>
                                                <span>Permintaan sedang diproses...</span>
                                            </div>
                                        ) : (
                                            "Lanjutkan"
                                        )
                                    }
                                </Button>
                            </form>
                        </Form>
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