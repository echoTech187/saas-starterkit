"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Step1User() {
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
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                    id="fullName"
                    placeholder="Contoh: Budi Doremi"
                    value={formData.fullName}
                    onChange={(e) => updateData("fullName", e.target.value)}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="role">Role Anda</Label>
                <Select onValueChange={(value) => updateData("role", value)} value={formData.role}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih role Anda..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="founder">Founder / C-Level</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="product-manager">Product Manager</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
