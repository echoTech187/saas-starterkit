"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface OnboardingWrapperProps {
    children: React.ReactNode;
}

const stepTitles = [
    "Selamat Datang! 👋",
    "Setup Project Anda",
    "Undang Tim Anda"
];

const stepDescriptions = [
    "Mari kita siapkan akun Anda. Siapa nama Anda?",
    "Beri nama project dan domain unik untuk workspace Anda.",
    "Kolaborasi adalah kunci. Undang anggota tim Anda sekarang."
];

export default function OnboardingWrapper({ children }: OnboardingWrapperProps) {
    const {
        step,
        progressValue,
        isLoading,
        prevStep,
        handleNextStep,
        handleFinish,
    } = useOnboarding();

    const isLastStep = step === 3;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="w-full max-w-xl space-y-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground">Setup Nusantara SaaS</h1>
                    <p className="text-muted-foreground">Langkah {step} dari 3</p>
                </div>
                <Progress value={progressValue} className="w-full" />
                <Card>
                    <CardHeader>
                        <CardTitle>{stepTitles[step - 1]}</CardTitle>
                        <CardDescription>{stepDescriptions[step - 1]}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={prevStep} disabled={step === 1 || isLoading}>
                            Kembali
                        </Button>
                        <Button onClick={isLastStep ? handleFinish : handleNextStep} disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isLastStep ? "Selesai & Lanjutkan" : "Lanjutkan"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
