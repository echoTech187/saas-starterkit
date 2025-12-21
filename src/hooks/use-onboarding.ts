"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type OnboardingData = {
    // Step 1: Profile
    fullName: string;
    role: string;
    // Step 2: Project
    projectName: string;
    projectDomain: string;
    // Step 3: Team
    teamEmails: string[];
};

export function useOnboarding() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

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
            console.log("Onboarding Complete:", formData);
            alert("Setup Selesai! Mengarahkan ke Dashboard...");
            setIsLoading(false);
            router.push("/dashboard"); // Redirect ke Dashboard
        }, 1500);
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
        finishOnboarding
    };
}