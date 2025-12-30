"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OnboardingData } from "@/lib/types/onboarding";


export function useOnboarding() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const progressValue = (step / 3) * 100;
    const [formData, setFormData] = useState<OnboardingData>({
        fullName: "",
        role: "",
        projectName: "",
        projectDomain: "",
        teamEmails: [],
    });

    const [inviteInput, setInviteInput] = useState(""); // State sementara input email

    // Update Data Helper
    const updateData = (field: keyof OnboardingData, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Navigasi Step
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    // Handle Input Email (Array)
    const addEmail = () => {
        if (inviteInput && !formData.teamEmails.includes(inviteInput)) {
            updateData("teamEmails", [...formData.teamEmails, inviteInput]);
            setInviteInput("");
        }
    };

    const removeEmail = (email: string) => {
        updateData("teamEmails", formData.teamEmails.filter((e) => e !== email));
    };

    // FINAL SUBMIT
    const finishOnboarding = () => {
        setIsLoading(true);
        // Simulasi Save ke Database
        setTimeout(() => {
            toast.success("Setup Selesai! Mengarahkan ke Dashboard...");
            setIsLoading(false);
            router.push("/dashboard"); // Redirect ke Dashboard
        }, 1500);
    };



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

    return {
        step,
        formData,
        inviteInput,
        isLoading,
        setInviteInput,
        updateData,
        nextStep,
        prevStep,
        addEmail,
        removeEmail,
        finishOnboarding,
        progressValue,
        handleNextStep,
        handleAddEmail,
        handleFinish,
        error,
    };
}