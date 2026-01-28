"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { resendCodeVerificationAction, verificationAction } from "@/app/_actions/authActions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";



export default function OutorizationPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const email = session?.user.email;
    const form = useForm(
        {
            defaultValues: {
                email: email,
                otp: "",
            },
        }
    );

    const [state, formAction, isPending] = useActionState(verificationAction, null);

    const [value, setValue] = useState("");
    const [resend, setResend] = useState(false);
    const [countdown, setCountdown] = useState(600);
    const [totalDuration, setTotalDuration] = useState(600);
    const [isCounting, setIsCounting] = useState(true);


    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isCounting && countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isCounting, countdown]);

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message as string, {
                description: state.description as string
            });
            router.push("/login");
        }
    }, [email, form, state, router]);


    async function startCountdown(minutes: number) {
        const seconds = minutes * 60;
        setCountdown(seconds);
        setTotalDuration(seconds);
        setIsCounting(true);
        setResend(true);

        if (!email) {
            return;
        }
        const resend = await resendCodeVerificationAction(email);
        if (resend.success) {
            toast.success(resend.message);
        } else {
            toast.error(resend.message);
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return email && status !== "loading" && (
        <div className="relative w-full min-h-screen bg-black  text-white overflow-hidden">
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                    20%, 40%, 60%, 80% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
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
                            Kami telah mengirimkan kode 6 digit ke email {email}. Masukkan di bawah ini.
                        </p>
                    </div>

                    <Form {...form} >
                        <form action={formAction} className="space-y-8">
                            <div className="flex justify-center">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="hidden">
                                            <FormLabel className="text-zinc-300">Email</FormLabel>
                                            <FormControl><Input defaultValue={email} type="email" readOnly {...field} /></FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="otp"
                                    render={() => (
                                        <InputOTP
                                            autoFocus
                                            name="otp"
                                            disabled={isPending}
                                            maxLength={6}
                                            value={value}
                                            onChange={(value) => setValue(value)}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            className={`gap-2`}
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
                                disabled={isPending}
                                type="submit"
                                className="w-full h-11 bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-lg shadow-cyan-500/20"
                            >
                                {
                                    isPending ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 2.03 5.734 5.156 7.002.8.293 1.664-.189 1.664-1.087A5.46 5.46 0 0110 17.5a5.46 5.46 0 012.936 2.657c0 .898-.866 1.683-1.664 1.087A7.962 7.962 0 014 18z"></path>
                                            </svg>
                                            <span>Verifikasi sedang diproses...</span>
                                        </div>
                                    ) : (
                                        "Verifikasi"
                                    )
                                }

                            </Button>
                        </form>
                    </Form>

                    <div className="mt-6 text-sm text-zinc-500">
                        Tidak menerima kode?{" "}
                        {isCounting ? (
                            <div className="inline-flex items-center gap-2 ml-1 align-middle">
                                <div className="relative w-4 h-4">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                        <path
                                            className="text-zinc-700"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="5"
                                        />
                                        <path
                                            className="text-cyan-500 transition-all duration-1000 ease-linear"
                                            strokeDasharray="100, 100"
                                            strokeDashoffset={100 - (countdown / totalDuration) * 100}
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                                <span className="text-white font-medium tabular-nums">
                                    {formatTime(countdown)}
                                </span>
                            </div>
                        ) : (
                            <div className="inline-flex gap-2">
                                <Button variant="link" size="sm" disabled={isCounting || resend} onClick={() => startCountdown(10)} className="text-white hover:underline font-medium p-0">
                                    Kirim Ulang
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}