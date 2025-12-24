"use client";

import { memberProfile } from "@/features/data/team-member";
import { Member } from "@/lib/types/team-member";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import { toast } from "sonner";

export function useSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");

    // --- STATE FORME & LOGIC ---
    const { setTheme, theme } = useTheme(); // Hook Next-Themes

    // State Profile
    const [profile, setProfile] = useState<Member>(memberProfile);

    // State Password
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

    // Ref untuk Input File (Upload Avatar)
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- HANDLERS ---

    // 1. Handler Save Profile
    const handleSaveProfile = () => {
        setIsLoading(true);
        // Simulasi API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Profil berhasil diperbarui!");
        }, 1500);
    };

    // 2. Handler Update Password
    const handleUpdatePassword = () => {
        if (!passwords.current || !passwords.new || !passwords.confirm) {
            toast.error("Mohon lengkapi semua field password.");
            return;
        }
        if (passwords.new !== passwords.confirm) {
            toast.error("Password baru dan konfirmasi tidak cocok.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setPasswords({ current: "", new: "", confirm: "" }); // Reset form
            toast.success("Password berhasil diubah!");
        }, 1500);
    };

    // 3. Handler Delete Account
    const handleDeleteAccount = () => {
        toast.error("Akun Anda telah dihapus. Mengarahkan ke halaman login...", {
            duration: 3000,
        });
        // Logic redirect logout disini
        // router.push("/login")
    };

    // 4. Handler Upload Avatar (Click Trigger)
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    // 5. Handler File Change (Preview Image)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Simulasi preview local
            const objectUrl = URL.createObjectURL(file);
            setProfile({ ...profile, avatarUrl: objectUrl });
            toast.success("Foto profil diperbarui (Preview Only)");
        }
    };


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
    const handleMidtransChange = (field: string, value: string | boolean) => {
        setMidtrans(prev => ({ ...prev, [field]: value }));
    };
    const handleSaveMidtrans = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log("Saving Midtrans Config:", midtrans);
            toast.success("Konfigurasi Midtrans berhasil disimpan!");
            setIsLoading(false);
        }, 1000);
    };

    return {
        isLoading,
        profile,
        setProfile,
        passwords,
        setPasswords,
        midtrans,
        handleProfileChange,
        handlePasswordChange,
        handleSaveProfile,
        handleUpdatePassword,
        handleMidtransChange,
        handleSaveMidtrans,
        handleDeleteAccount,
        triggerFileInput,
        fileInputRef,
        handleFileChange,
        activeTab,
        setActiveTab,
        theme,
        setTheme,
    };
}