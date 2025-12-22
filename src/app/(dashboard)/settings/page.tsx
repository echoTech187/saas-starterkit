"use client";

import { useState, useRef } from "react";
import { useTheme } from "next-themes"; // Hook untuk ganti tema
import {
    User, Lock, Bell, Palette, Camera, Save, Loader2,
    Moon, Sun, Laptop, ShieldAlert} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");

    // --- STATE FORME & LOGIC ---
    const { setTheme, theme } = useTheme(); // Hook Next-Themes

    // State Profile
    const [profile, setProfile] = useState({
        name: "Agus Santoso",
        bio: "",
        avatarUrl: "/avatars/01.png"
    });

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

    return (
        <div className="space-y-6 pb-20">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Account Settings</h1>
                <p className="text-zinc-400 mt-2">Kelola profil, keamanan, dan preferensi aplikasi Anda.</p>
            </div>

            <Separator className="bg-white/10" />

            <div className="flex flex-col md:flex-row gap-8">

                {/* --- SIDEBAR NAVIGATION (TABS) --- */}
                <aside className="md:w-64 shrink-0">
                    <Tabs orientation="vertical" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="flex flex-col h-auto bg-transparent gap-1 p-0 items-stretch">
                            <TabsTrigger value="profile" className="justify-start px-4 py-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer">
                                <User className="w-4 h-4 mr-3" /> Profile
                            </TabsTrigger>
                            <TabsTrigger value="account" className="justify-start px-4 py-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer">
                                <Lock className="w-4 h-4 mr-3" /> Security
                            </TabsTrigger>
                            <TabsTrigger value="appearance" className="justify-start px-4 py-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer">
                                <Palette className="w-4 h-4 mr-3" /> Appearance
                            </TabsTrigger>
                            <TabsTrigger value="notifications" className="justify-start px-4 py-3 data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer">
                                <Bell className="w-4 h-4 mr-3" /> Notifications
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </aside>

                {/* --- CONTENT AREA --- */}
                <div className="flex-1 max-w-2xl">

                    {/* === TAB: PROFILE === */}
                    <div className={activeTab === "profile" ? "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}>
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white">Public Profile</CardTitle>
                                <CardDescription className="text-zinc-400">Informasi ini akan terlihat oleh anggota tim Anda.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Avatar Upload Interaktif */}
                                <div className="flex items-center gap-6">
                                    <div className="relative group cursor-pointer" onClick={triggerFileInput}>
                                        <Avatar className="w-20 h-20 border-2 border-white/10 group-hover:border-cyan-500 transition-colors">
                                            <AvatarImage src={profile.avatarUrl} className="object-cover" />
                                            <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xl">AG</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="w-6 h-6 text-white" />
                                        </div>
                                        {/* Hidden Input File */}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-medium text-white">Profile Picture</h3>
                                        <p className="text-xs text-zinc-500">Klik gambar untuk upload. Max 2MB.</p>
                                    </div>
                                </div>

                                {/* Form Inputs Editable */}
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-zinc-300">Display Name</Label>
                                        <Input
                                            id="name"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                                        <Input id="email" defaultValue="agus@nusantara.id" disabled className="bg-zinc-900/50 border-white/5 text-zinc-500 cursor-not-allowed" />
                                        <p className="text-[10px] text-zinc-500">Email tidak dapat diubah (Terikat akun SSO).</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="bio" className="text-zinc-300">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            placeholder="Ceritakan sedikit tentang Anda..."
                                            value={profile.bio}
                                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                            className="bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50 min-h-25"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-white/5 py-4">
                                <Button onClick={handleSaveProfile} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white ml-auto">
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* === TAB: SECURITY (ACCOUNT) === */}
                    <div className={activeTab === "account" ? "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}>
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white">Password & Security</CardTitle>
                                <CardDescription className="text-zinc-400">Kelola keamanan akun Anda.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label className="text-zinc-300">Current Password</Label>
                                    <Input
                                        type="password"
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                        className="bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-zinc-300">New Password</Label>
                                    <Input
                                        type="password"
                                        value={passwords.new}
                                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                        className="bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-zinc-300">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        value={passwords.confirm}
                                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                        className="bg-black/40 border-white/10 text-white focus-visible:ring-cyan-500/50"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-white/5 py-4">
                                <Button
                                    onClick={handleUpdatePassword}
                                    disabled={isLoading}
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/10 ml-auto"
                                >
                                    {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />} Update Password
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Danger Zone: Delete Account */}
                        <Card className="bg-red-950/10 border-red-900/30 pb-0">
                            <CardHeader>
                                <CardTitle className="text-red-400 flex items-center gap-2">
                                    <ShieldAlert className="w-5 h-5" /> Delete Account
                                </CardTitle>
                                <CardDescription className="text-zinc-500">
                                    Menghapus akun Anda secara permanen. Tindakan ini tidak dapat dibatalkan.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="py-4 bg-red-950/20 border-t border-red-900/20">
                                {/* ALERT DIALOG DELETE */}
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white ml-auto">
                                            Delete My Account
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-zinc-950 border-red-900/50 text-white">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription className="text-zinc-400">
                                                Akun dan semua data project Anda akan dihapus secara permanen dari server kami.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="bg-transparent border-white/10 hover:bg-white/10 text-white hover:text-white">Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white border-0">
                                                Yes, Delete Account
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* === TAB: APPEARANCE (FUNGSI THEME AKTIF) === */}
                    <div className={activeTab === "appearance" ? "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}>
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white">Theme Preferences</CardTitle>
                                <CardDescription className="text-zinc-400">Pilih tampilan antarmuka aplikasi.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6 pt-2">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="font-medium text-white">Interface Theme</div>
                                        <div className="text-xs text-zinc-500">Pilih skema warna favorit Anda.</div>
                                    </div>

                                    {/* THEME TOGGLE BUTTONS */}
                                    <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setTheme("dark")}
                                            className={`h-8 w-8 p-0 rounded-md transition-all ${theme === 'dark' ? 'bg-zinc-800 text-cyan-400 shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                                        >
                                            <Moon className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setTheme("light")}
                                            className={`h-8 w-8 p-0 rounded-md transition-all ${theme === 'light' ? 'bg-zinc-200 text-cyan-600 shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                                        >
                                            <Sun className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setTheme("system")}
                                            className={`h-8 w-8 p-0 rounded-md transition-all ${theme === 'system' ? 'bg-zinc-800 text-cyan-400 shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                                        >
                                            <Laptop className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* === TAB: NOTIFICATIONS === */}
                    <div className={activeTab === "notifications" ? "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}>
                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white">Email Notifications</CardTitle>
                                <CardDescription className="text-zinc-400">Pilih notifikasi apa saja yang ingin Anda terima.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <NotificationSwitch
                                    title="Deployment Status"
                                    desc="Get emails when a build finishes or fails."
                                    defaultChecked={true}
                                />
                                <Separator className="bg-white/5" />
                                <NotificationSwitch
                                    title="Billing Alerts"
                                    desc="Receive invoices and payment issues."
                                    defaultChecked={true}
                                />
                                <Separator className="bg-white/5" />
                                <NotificationSwitch
                                    title="Team Activity"
                                    desc="When someone joins or leaves your team."
                                    defaultChecked={false}
                                />
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Helper Component untuk Switch Notifikasi
function NotificationSwitch({ title, desc, defaultChecked }: { title: string, desc: string, defaultChecked: boolean }) {
    const [checked, setChecked] = useState(defaultChecked);

    const handleChange = (val: boolean) => {
        setChecked(val);
        toast.success(`${title} ${val ? "enabled" : "disabled"}`);
    }

    return (
        <div className="flex items-center justify-between">
            <div className="space-y-0.5">
                <Label className="text-base text-zinc-200">{title}</Label>
                <p className="text-xs text-zinc-500">{desc}</p>
            </div>
            <Switch
                checked={checked}
                onCheckedChange={handleChange}
                className="data-[state=checked]:bg-cyan-600"
            />
        </div>
    )
}