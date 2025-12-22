"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOnboarding } from "@/hooks/use-onboarding";
import { Badge } from "@/components/ui/badge";
import { X, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner"; // Import Toast
import { useState } from "react";
import Logo from "@/components/landing/logo";

export default function OnboardingPage() {
    const [error, setError] = useState("");

    const {
        step, formData, inviteInput, isLoading,
        setInviteInput, updateData, nextStep, prevStep,
        addEmail, removeEmail, finishOnboarding
    } = useOnboarding();

    // Hitung Progress
    const progressValue = (step / 3) * 100;

    // --- WRAPPER HANDLERS (Mencegah window.alert) ---

    const handleNextStep = () => {
        setError("");
        // Validasi Step 1
        if (step === 1) {
            if (!formData.fullName.trim()) {
                setError("Nama Lengkap wajib diisi");
                toast.error("Nama Lengkap wajib diisi", { description: "Kami perlu tahu nama Anda." });
                return;
            }
            if (!formData.role) {
                setError("Role wajib dipilih");
                toast.error("Role wajib dipilih", { description: "Pilih role yang paling sesuai." });
                return;
            }
        }

        // Validasi Step 2
        if (step === 2) {
            if (!formData.projectName.trim()) {
                setError("Nama Project wajib diisi");
                toast.error("Nama Project wajib diisi", { description: "Nama project tidak boleh kosong." });
                return;
            }
            // Validasi format domain sederhana (opsional)
            if (formData.projectDomain && /[^a-z0-9-]/.test(formData.projectDomain)) {
                setError("Format Domain tidak valid");
                toast.error("Format Domain tidak valid", { description: "Hanya gunakan huruf kecil, angka, dan strip (-)." });
                return;
            }
        }

        // Jika lolos validasi, panggil nextStep dari hook
        nextStep();
    };

    const handleAddEmail = () => {
        setError("");
        if (!inviteInput.trim()) {
            setError("Email wajib diisi");
            toast.error("Email kosong", { description: "Masukkan alamat email teman Anda." });
            return;
        }
        // Regex Email Sederhana
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inviteInput)) {
            setError("Format email salah");
            toast.error("Format email salah", { description: "Mohon masukkan email yang valid." });
            return;
        }

        // Cek duplikasi
        if (formData.teamEmails.includes(inviteInput)) {
            setError("Email sudah ada");
            toast.warning("Email sudah ada", { description: "Anda sudah mengundang email ini." });
            return;
        }

        // Panggil fungsi hook jika aman
        addEmail();
        toast.success("Email ditambahkan");
    };

    const handleFinish = () => {
        if (error) {
            toast.error(error);
            return;
        }
        if (formData.teamEmails.length === 0) {
            setError("Tambahkan minimal 1 anggota ke tim");
            toast.error("Tambahkan minimal 1 anggota ke tim", { description: "Tim Anda belum memiliki anggota. Tambahkan teman Anda untuk memulai." });
            return;
        }

        // Panggil fungsi finish
        finishOnboarding();
        toast.success("Setup Selesai!", { description: "Mengarahkan ke dashboard..." });
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* --- BACKGROUND EFFECTS --- */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full" />
            </div>

            {/* --- HEADER LOGO --- */}
            <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-700 relative z-10">
                <div className="h-14 w-14 bg-linear-to-br from-cyan-600 to-blue-700 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl shadow-cyan-500/20 mb-6 ring-1 ring-white/10">
                    <Logo src="/src/logo/light-mode.png" className="h-12 w-12" showTitle={false} />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Setup Project</h1>
                <p className="text-zinc-400 text-sm mt-2">Hanya butuh waktu kurang dari 2 menit.</p>
            </div>

            {/* --- MAIN CARD --- */}
            <Card className="w-full max-w-lg bg-zinc-900 border-white/10 shadow-2xl relative overflow-hidden ring-1 ring-white/5">

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                    <div
                        className="h-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                        style={{ width: `${progressValue}%` }}
                    />
                </div>

                {/* --- STEP 1: PERSONAL DATA --- */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl text-white">Halo, siapa nama Anda?</CardTitle>
                            <CardDescription className="text-zinc-400">Kami perlu tahu bagaimana memanggil Anda di dalam tim.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-4">
                            <div className="space-y-2">
                                <Label className="text-zinc-300 text-sm font-medium">Nama Lengkap</Label>
                                <Input
                                    value={formData.fullName}
                                    onChange={(e) => updateData("fullName", e.target.value)}
                                    placeholder="Contoh: Alex Under"
                                    className="bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50 h-11 placeholder:text-zinc-600"
                                    autoFocus
                                    onKeyDown={(e) => e.key === 'Enter' && handleNextStep()}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-300 text-sm font-medium">Role Anda</Label>
                                <Select onValueChange={(val) => updateData("role", val)} value={formData.role}>
                                    <SelectTrigger className="bg-black/40 border-white/10 text-white focus:ring-cyan-500/50 h-11">
                                        <SelectValue placeholder="Pilih Role Utama" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                        <SelectItem value="Founder">Founder</SelectItem>
                                        <SelectItem value="Developer">Developer</SelectItem>
                                        <SelectItem value="Designer">Product Designer</SelectItem>
                                        <SelectItem value="Manager">Project Manager</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end pt-4">
                            <Button
                                onClick={handleNextStep}
                                // Disable button visual only, but logic handles it via toast too
                                className="bg-cyan-600 text-white hover:bg-cyan-500 px-6 font-medium shadow-[0_0_15px_-3px_rgba(8,145,178,0.4)]"
                            >
                                Lanjut <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </div>
                )}

                {/* --- STEP 2: CREATE PROJECT --- */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl text-white">Buat Project Pertama</CardTitle>
                            <CardDescription className="text-zinc-400">Mari mulai dengan membuat workspace untuk project Anda.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-4">
                            <div className="space-y-2">
                                <Label className="text-zinc-300 text-sm font-medium">Nama Project</Label>
                                <Input
                                    value={formData.projectName}
                                    onChange={(e) => updateData("projectName", e.target.value)}
                                    placeholder="Contoh: Toko Online V1"
                                    className="bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50 h-11 placeholder:text-zinc-600"
                                    autoFocus
                                    onKeyDown={(e) => e.key === 'Enter' && handleNextStep()}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-300 text-sm font-medium">Domain / Slug (Optional)</Label>
                                <div className="flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-white/10 bg-zinc-800/50 text-zinc-400 text-sm">
                                        app.com/
                                    </span>
                                    <Input
                                        value={formData.projectDomain}
                                        onChange={(e) => updateData("projectDomain", e.target.value)}
                                        placeholder="my-project"
                                        className="bg-black/40 border-white/10 text-white rounded-l-none focus-visible:ring-cyan-500/50 h-11 placeholder:text-zinc-600"
                                        onKeyDown={(e) => e.key === 'Enter' && handleNextStep()}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-4">
                            <Button variant="ghost" onClick={prevStep} className="text-zinc-400 hover:text-white hover:bg-white/5">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                            </Button>
                            <Button
                                onClick={handleNextStep}
                                className="bg-cyan-600 text-white hover:bg-cyan-500 px-6 font-medium shadow-[0_0_15px_-3px_rgba(8,145,178,0.4)]"
                            >
                                Buat Project <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </div>
                )}

                {/* --- STEP 3: INVITE TEAM --- */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl text-white">Undang Tim Anda</CardTitle>
                            <CardDescription className="text-zinc-400">Kerja lebih cepat bersama tim. Langkah ini opsional.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-4">
                            <div className="flex gap-2">
                                <Input
                                    value={inviteInput}
                                    onChange={(e) => setInviteInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddEmail()}
                                    placeholder="masukkan@email.com"
                                    className="bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50 h-11 placeholder:text-zinc-600"
                                />
                                <Button onClick={handleAddEmail} variant="outline" className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 h-11 px-5 hover:border-white/20">
                                    Add
                                </Button>
                            </div>

                            {/* List Email */}
                            <div className="min-h-30 p-4 bg-black/20 rounded-xl border border-white/5 space-y-2">
                                {formData.teamEmails.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-zinc-600 py-4">
                                        <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center mb-2 border border-white/5">
                                            <span className="text-lg">👋</span>
                                        </div>
                                        <p className="text-sm">Belum ada anggota yang diundang.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {formData.teamEmails.map((email) => (
                                            <Badge key={email} variant="secondary" className="bg-zinc-800 text-zinc-200 border border-white/5 hover:bg-zinc-700 flex gap-2 items-center py-1.5 px-3">
                                                {email}
                                                <button onClick={() => removeEmail(email)} className="bg-black/20 hover:bg-red-500/20 hover:text-red-400 rounded-full p-0.5 transition-colors">
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-4">
                            <Button variant="ghost" onClick={prevStep} className="text-zinc-400 hover:text-white hover:bg-white/5">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                            </Button>
                            <Button
                                onClick={handleFinish}
                                disabled={isLoading}
                                className="bg-linear-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_20px_-5px_rgba(8,145,178,0.5)] font-bold hover:scale-[1.02] transition-all px-6 h-11"
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

            <p className="text-zinc-600 text-xs mt-8 font-medium tracking-wide uppercase">
                Step <span className="text-zinc-400">{step}</span> of 3
            </p>

        </div>
    );
}