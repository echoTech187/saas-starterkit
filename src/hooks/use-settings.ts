"use client";

import { useState } from "react";

export function useSettings() {
    const [isLoading, setIsLoading] = useState(false);

    // State Profile
    const [profile, setProfile] = useState({
        fullName: "Shadcn Admin",
        email: "m@example.com",
        bio: "Fullstack Developer based in Jakarta"
    });

    // State Password
    const [passwords, setPasswords] = useState({
        current: "",
        new: ""
    });

    const handleProfileChange = (field: string, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };
    const [midtrans, setMidtrans] = useState({
        merchantId: "G-123456789",
        clientKey: "SB-Mid-client-xxxxxx",
        serverKey: "SB-Mid-server-xxxxxx",
        isProduction: false // False = Sandbox
    });

    const handlePasswordChange = (field: string, value: string) => {
        setPasswords(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log("Saving profile:", profile);
            alert("Profile saved!");
            setIsLoading(false);
        }, 1000);
    };

    const handleUpdatePassword = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log("Updating password:", passwords);
            alert("Password updated!");
            setPasswords({ current: "", new: "" }); // Reset form
            setIsLoading(false);
        }, 1000);
    };
    const handleMidtransChange = (field: string, value: string | boolean) => {
        setMidtrans(prev => ({ ...prev, [field]: value }));
    };
    const handleSaveMidtrans = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log("Saving Midtrans Config:", midtrans);
            alert("Konfigurasi Midtrans berhasil disimpan!");
            setIsLoading(false);
        }, 1000);
    };

    return {
        isLoading,
        profile,
        passwords,
        midtrans,
        handleProfileChange,
        handlePasswordChange,
        handleSaveProfile,
        handleUpdatePassword,
        handleMidtransChange,
        handleSaveMidtrans
    };
}