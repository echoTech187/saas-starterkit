"use client";

import { FieldValues, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FieldSeparator } from "@/components/ui/field";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const form = useForm();
    const router = useRouter()

    async function onSubmit(data: FieldValues) {
        console.log(data);
    }
    return (
        <div className="w-full h-screen overflow-x-hidden ">
            <div className="grid grid-cols-1 h-full w-full">
                <div className="flex justify-center items-center flex-col max-w-lg m-auto w-full p-6 lg:p-8 h-full max-lg:col-span-1">
                    <Card className="w-full shadow-none rounded-none border-0">
                        <CardHeader className="w-full">
                            <Image src={'/src/logo/light-mode-horizontal.png'} loading="eager" alt="logo" width={1024} height={265} className="w-48 h-auto mb-2" />
                            <CardTitle className="text-2xl font-bold text-gray-800 leading-6">Daftar
                            </CardTitle>
                            <CardDescription>
                                Masuk email dan password untuk membuat akun baru.
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
                                                <FormItem className="w-full">
                                                    <FormLabel htmlFor="email">Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" id="email" placeholder="example@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                <FormItem className="w-full">
                                                    <FormLabel htmlFor="password">Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" id="password" placeholder="********" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                                <FormItem className="w-full">
                                                    <FormLabel htmlFor="confirm_password">Konfirmasi Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" id="confirm_password" placeholder="********" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>

                                            </>
                                        )}
                                    />
                                    <CardAction className="w-full">
                                        <Button type="submit" className="w-full cursor-pointer" onClick={() => {
                                            form.reset();
                                            form.clearErrors();
                                            router.push('/otp')
                                        }}>Daftar</Button>
                                    </CardAction>
                                </form>
                            </Form>
                        </CardContent>
                        <FieldSeparator className="my-2 w-full">Atau daftar dengan</FieldSeparator>
                        <CardFooter className="text-sm">
                            <CardAction className="w-full">
                                <Button type="button" className="w-full cursor-pointer" variant={'outline'} size={'icon'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" className="shrink-0" width="16" height="16" style={{ "verticalAlign": "middle" }}><g fill="none"><path fill="#4285F4" d="M23.495 12.281c0-.813-.066-1.63-.207-2.43H12.004v4.606h6.462a5.537 5.537 0 0 1-2.391 3.635v2.99h3.855c2.263-2.084 3.565-5.161 3.565-8.8z"></path><path fill="#34A853" d="M12.004 23.97c3.227 0 5.948-1.06 7.93-2.889l-3.855-2.989c-1.072.73-2.457 1.143-4.07 1.143-3.121 0-5.767-2.105-6.717-4.936H1.314v3.081a11.964 11.964 0 0 0 10.69 6.59z"></path><path fill="#FBBC04" d="M5.288 14.299a7.165 7.165 0 0 1 0-4.58V6.637H1.314a11.973 11.973 0 0 0 0 10.743l3.974-3.08z"></path><path fill="#EA4335" d="M12.004 4.778a6.5 6.5 0 0 1 4.59 1.793l3.415-3.415A11.497 11.497 0 0 0 12.004.044a11.96 11.96 0 0 0-10.69 6.593L5.288 9.72c.945-2.835 3.596-4.941 6.716-4.941z"></path></g></svg>
                                    Daftar dengan Google
                                </Button>
                            </CardAction>
                        </CardFooter>
                        <CardFooter className="text-sm">
                            <CardDescription className="text-gray-600">Sudah punya akun?&nbsp;<Link href="/login" className="font-semibold">Login</Link></CardDescription>.
                        </CardFooter>
                    </Card>

                </div>


            </div>
        </div>
    );
}