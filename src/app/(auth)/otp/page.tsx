"use client";

import { useForm, FieldValues } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function OTPPage() {
    const form = useForm();
    const router = useRouter()
    const [value, setValue] = useState("");

    async function onSubmit(data: FieldValues) {
        console.log(data);
        router.push('/login'); // Redirect setelah sukses
    }

    return (
        <div className="relative w-full min-h-screen bg-black  text-white overflow-hidden">
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125  rounded-full pointer-events-none" />

                <div className="w-full max-w-lg mx-auto rounded-2xl p-8 relative z-10 text-center flex flex-col justify-center items-center">

                    <div className="mb-6">
                        <div className="mx-auto w-12 h-12  rounded-full flex items-center justify-center mb-4 border ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-cyan-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Verifikasi OTP</h1>
                        <p className="text-zinc-400 mt-2 text-sm">
                            Kami telah mengirimkan kode 6 digit ke email Anda. Masukkan di bawah ini.
                        </p>
                    </div>

                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex justify-center">
                                <FormField
                                    control={form.control}
                                    name="otp"
                                    render={() => (
                                        <InputOTP
                                            maxLength={6}
                                            value={value}
                                            onChange={(value) => setValue(value)}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            className="gap-2"
                                        >
                                            <InputOTPGroup className="gap-2">
                                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        index={index}
                                                        className="w-10 h-12 border-white/10 bg-zinc-700 text-white focus:text-white text-lg focus:border-cyan-500 focus:ring-cyan-500/20 rounded-md"
                                                    />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-lg shadow-cyan-500/20"
                            >
                                Verifikasi & Masuk
                            </Button>
                        </form>
                    </Form>

                    <p className="mt-6 text-sm text-zinc-500">
                        Tidak menerima kode?{" "}
                        <button onClick={() => alert("Resend trigger")} className="text-white hover:underline font-medium">
                            Kirim Ulang
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}