"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function OTPPage() {
    const form = useForm();
    const router = useRouter()
    const [value, setValue] = useState("");

    async function onSubmit(data: FieldValues) {
        console.log(data);
    }


    return (
        <div className="w-full h-screen overflow-x-hidden ">
            <div className="grid max-lg:grid-cols-1 grid-cols-2 h-full w-full">
                <div className="flex justify-center items-center flex-col max-w-lg m-auto w-full p-6 lg:p-8 h-full max-lg:col-span-1">
                    <Card className="w-full shadow-none rounded-none border-0">
                        <CardHeader className="w-full">
                            <Image src={'/src/logo/light-mode-horizontal.png'} loading="eager" alt="logo" width={1024} height={265} className="w-48 h-auto mb-2" />
                            <CardTitle className="text-2xl font-bold text-gray-800 leading-6">Konfirmasi Kode OTP
                            </CardTitle>
                            <CardDescription>
                                Silahkan masukan kode OTP yang telah kami kirim ke email anda.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="..."
                                        render={({ field }) => (
                                            <>
                                                <InputOTP
                                                    id="otp"
                                                    className="w-full"
                                                    maxLength={6}
                                                    value={value}
                                                    name="otp"
                                                    required
                                                    inputMode="numeric"
                                                    type="text"
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    autoCapitalize="off"
                                                    spellCheck="false"
                                                    autoFocus={true}
                                                    tabIndex={0}
                                                    placeholder="*"
                                                    onChange={(value) => setValue(value)}
                                                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                                                    <InputOTPGroup className="w-full">
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </>
                                        )}
                                    />
                                    <CardAction className="w-full">
                                        <Button type="submit" className="w-full cursor-pointer" onClick={() => {
                                            router.push('/login')
                                        }}>Verifikasi</Button>
                                    </CardAction>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="text-sm">
                            <CardDescription className="text-gray-600">Belum mendapatkan kode OTP?&nbsp;<Link href="/resend-otp" className="font-semibold">Kirim ulang.</Link></CardDescription>.
                        </CardFooter>
                    </Card>

                </div>

                <div className="flex justify-center items-center flex-col w-full h-full bg-gray-300/10 backdrop-blur-3xl max-lg:hidden">
                    <Card className="w-full shadow-none rounded-none border-0 col-span-1 bg-transparent">
                        <CardContent className="w-full h-full">
                            <Image src={"/src/images/illustration/1.png"} loading="eager" alt="login illustration" width={2048} height={959} className="w-[90%] mx-auto h-auto" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}