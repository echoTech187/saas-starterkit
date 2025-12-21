"use client";

import { useForm, FieldValues } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function ForgotPasswordPage() {
    const form = useForm();
    const router = useRouter();

    async function onSubmit(data: FieldValues) {
        console.log(data);
        router.push('/login')
    }

    return (
        <div className="relative w-full min-h-screen bg-black  text-white overflow-hidden ">
            <Image
                src="/src/images/illustration/login.png"
                alt="Login Illustration"
                width={16000}
                height={9000}
                unoptimized
                loading="eager"
                className="z-1 w-screen h-screen object-cover absolute left-[50%] top-0 -translate-x-1/2 -trnslate-y-1/3  opacity-10"
            />
            <div className="relative w-full max-w-6xl mx-auto flex min-h-screen">

                {/* Background Blob Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full pointer-events-none" />
                <div className="absolute z-20 top-6 md:top-8 left-8">
                    <Link href="/login" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4" /> Kembali
                    </Link>
                </div>
                <div className="w-full max-w-lg mx-auto rounded-2xl p-8 relative z-10  text-center flex flex-col justify-center items-start">



                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white">Lupa Password?</h1>
                        <p className="text-zinc-400 mt-2 text-sm">
                            Jangan panik. Masukkan email Anda dan kami akan mengirimkan instruksi reset password.
                        </p>
                    </div>

                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                            <FormField
                                control={form.control}
                                name="forgot_password_email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-300">Email Terdaftar</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="nama@perusahaan.com"
                                                className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-cyan-500/50 h-11"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full h-11 bg-white text-black hover:bg-zinc-200 font-semibold"
                            >
                                Kirim Link Reset
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}