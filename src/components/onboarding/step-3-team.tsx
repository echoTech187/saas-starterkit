"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Step3Team() {
    const {
        formData,
        inviteInput,
        setInviteInput,
        removeEmail,
        handleAddEmail,
        error
    } = useOnboarding();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddEmail();
        }
    };

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
                <Label htmlFor="teamEmails">Undang via Email</Label>
                <div className="flex space-x-2">
                    <Input
                        id="teamEmails"
                        type="email"
                        placeholder="teman@email.com"
                        value={inviteInput}
                        onChange={(e) => setInviteInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button type="button" onClick={handleAddEmail}>Undang</Button>
                </div>
            </div>

            {formData.teamEmails.length > 0 && (
                <div className="space-y-2 rounded-md border p-4">
                    <p className="text-sm font-medium">Daftar Undangan:</p>
                    <div className="flex flex-wrap gap-2">
                        {formData.teamEmails.map((email) => (
                            <Badge key={email} variant="secondary" className="flex items-center gap-1">
                                {email}
                                <button onClick={() => removeEmail(email)} className="rounded-full hover:bg-muted-foreground/20" >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
