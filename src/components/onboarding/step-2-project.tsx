"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Step2Project() {
    const { formData, updateData, error } = useOnboarding();

    return (
        <div className="space-y-4">
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div className="space-y-2">
                <Label htmlFor="projectName">Nama Project</Label>
                <Input
                    id="projectName"
                    placeholder="Contoh: Project SaaS Keren"
                    value={formData.projectName}
                    onChange={(e) => updateData("projectName", e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="projectDomain">Domain Project</Label>
                <div className="flex items-center">
                    <Input
                        id="projectDomain"
                        placeholder="projek-keren"
                        className="rounded-r-none"
                        value={formData.projectDomain}
                        onChange={(e) => updateData("projectDomain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    />
                    <span className="flex h-10 items-center rounded-r-md border border-l-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                        .nusantara-saas.com
                    </span>
                </div>
                <p className="text-xs text-muted-foreground">Ini akan menjadi URL unik untuk workspace Anda.</p>
            </div>
        </div>
    );
}
