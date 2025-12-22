"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOnboarding } from "@/hooks/use-onboarding";
import { Badge } from "@/components/ui/badge";
import { X, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";


export default function OnboardingPage() {
    const {
        step, formData, inviteInput, isLoading,
        setInviteInput, updateData, nextStep, prevStep,
        addEmail, removeEmail, finishOnboarding
    } = useOnboarding();

    // Hitung Progress (1=33%, 2=66%, 3=100%)
    const progressValue = (step / 3) * 100;

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-linear(circle_at_center,var(--tw-linear-stops))] from-cyan-900/10 via-black to-black -z-10" />

            {/* Header Logo */}
            <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-700">
                {/* Ganti dengan Logo Abang */}
                <div className="h-12 w-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-cyan-500/20">
                    NS
                </div>
                <h1 className="text-2xl font-bold text-white">Setup Your Workspace</h1>
                <p className="text-zinc-400 text-sm mt-1">Hanya butuh waktu kurang dari 2 menit.</p>
            </div>

            {/* Main Card */}
            <Card className="w-full max-w-lg bg-background/80 backdrop-blur-xl border-white/10 shadow-2xl relative overflow-hidden">

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                    <div
                        className="h-full bg-cyan-500 transition-all duration-500 ease-out"
                        style={{ width: `${progressValue}%` }}
                    />
                </div>

                {/* --- STEP 1: PERSONAL DATA --- */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <CardHeader>
                            <CardTitle className="text-white">Halo, siapa nama Anda?</CardTitle>
                            <CardDescription>Kami perlu tahu bagaimana memanggil Anda di dalam tim.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Nama Lengkap</Label>
                                <Input
                                    value={formData.fullName}
                                    onChange={(e) => updateData("fullName", e.target.value)}
                                    placeholder="Contoh: Alex Under"
                                    className="bg-black border-white/10 text-white"
                                    autoFocus
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Role Anda</Label>
                                <Select onValueChange={(val) => updateData("role", val)}>
                                    <SelectTrigger className="bg-black border-white/10 text-white">
                                        <SelectValue placeholder="Pilih Role" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-background border-white/10 text-white">
                                        <SelectItem value="Founder">Founder</SelectItem>
                                        <SelectItem value="Developer">Developer</SelectItem>
                                        <SelectItem value="Designer">Product Designer</SelectItem>
                                        <SelectItem value="Manager">Project Manager</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                onClick={nextStep}
                                disabled={!formData.fullName || !formData.role}
                                className="bg-cyan-500 text-black hover:bg-cyan-400"
                            >
                                Lanjut <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </div>
                )}

                {/* --- STEP 2: CREATE PROJECT --- */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <CardHeader>
                            <CardTitle className="text-white">Buat Project Pertama</CardTitle>
                            <CardDescription>Mari mulai dengan membuat workspace untuk project Anda.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Nama Project</Label>
                                <Input
                                    value={formData.projectName}
                                    onChange={(e) => updateData("projectName", e.target.value)}
                                    placeholder="Contoh: Toko Online V1"
                                    className="bg-black border-white/10 text-white"
                                    autoFocus
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Domain / Slug (Optional)</Label>
                                <div className="flex">
                                    <span className="flex items-center px-3 bg-zinc-800 border border-r-0 border-white/10 rounded-l-md text-zinc-400 text-sm">
                                        app.com/
                                    </span>
                                    <Input
                                        value={formData.projectDomain}
                                        onChange={(e) => updateData("projectDomain", e.target.value)}
                                        placeholder="my-project"
                                        className="bg-black border-white/10 text-white rounded-l-none"
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep} className="text-zinc-400 hover:text-white">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                            </Button>
                            <Button
                                onClick={nextStep}
                                disabled={!formData.projectName}
                                className="bg-cyan-500 text-black hover:bg-cyan-400"
                            >
                                Buat Project <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </div>
                )}

                {/* --- STEP 3: INVITE TEAM --- */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <CardHeader>
                            <CardTitle className="text-white">Undang Tim Anda</CardTitle>
                            <CardDescription>Kerja lebih cepat bersama tim. Langkah ini opsional.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={inviteInput}
                                    onChange={(e) => setInviteInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addEmail()}
                                    placeholder="masukkan@email.com"
                                    className="bg-black border-white/10 text-white"
                                />
                                <Button onClick={addEmail} variant="outline" className="border-white/10 text-zinc-300 hover:text-white">
                                    Add
                                </Button>
                            </div>

                            {/* List Email */}
                            <div className="min-h-25 p-4 bg-black/40 rounded-lg border border-white/5 space-y-2">
                                {formData.teamEmails.length === 0 ? (
                                    <p className="text-zinc-600 text-sm text-center py-4">Belum ada anggota yang diundang.</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {formData.teamEmails.map((email) => (
                                            <Badge key={email} variant="secondary" className="bg-zinc-800 text-zinc-200 hover:bg-zinc-700 flex gap-1 items-center pr-1">
                                                {email}
                                                <button onClick={() => removeEmail(email)} className="p-0.5 hover:bg-zinc-600 rounded-full">
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" onClick={prevStep} className="text-zinc-400 hover:text-white">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                            </Button>
                            <Button
                                onClick={finishOnboarding}
                                disabled={isLoading}
                                className="bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 font-bold hover:scale-[1.02] transition-transform"
                            >
                                {isLoading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Setup...</>
                                ) : (
                                    <>Selesai & Masuk <CheckCircle2 className="ml-2 h-4 w-4" /></>
                                )}
                            </Button>
                        </CardFooter>
                    </div>
                )}

            </Card>

            {/* Footer Helper */}
            <p className="text-zinc-600 text-xs mt-8">
                Step {step} of 3
            </p>

        </div>
    );
}