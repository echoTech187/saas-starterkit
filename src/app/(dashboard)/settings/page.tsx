"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useSettings } from "@/hooks/use-settings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Mail, Trash2, UserPlus, Loader2, CreditCard } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTeam } from "@/hooks/use-team"; // Import Hook Baru
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@radix-ui/react-switch";

export default function SettingsPage() {
    const {
        isLoading, profile, passwords,
        handleProfileChange, handlePasswordChange,
        handleSaveProfile, handleUpdatePassword,
        midtrans, handleMidtransChange, handleSaveMidtrans
    } = useSettings();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="bg-zinc-900 border border-white/10">
                    <TabsTrigger value="general" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black text-zinc-400">General</TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black text-zinc-400">Security</TabsTrigger>
                    <TabsTrigger value="payments" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black text-zinc-400">Payments</TabsTrigger>
                    <TabsTrigger value="team" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-black text-zinc-400">Team</TabsTrigger>
                </TabsList>

                {/* TAB: GENERAL */}
                <TabsContent value="general">
                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader><CardTitle className="text-white">Profile</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Full Name</Label>
                                <Input value={profile.fullName} onChange={(e) => handleProfileChange("fullName", e.target.value)} className="bg-black border-white/10 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Email</Label>
                                <Input value={profile.email} onChange={(e) => handleProfileChange("email", e.target.value)} className="bg-black border-white/10 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Bio</Label>
                                <Input value={profile.bio} onChange={(e) => handleProfileChange("bio", e.target.value)} className="bg-black border-white/10 text-white" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveProfile} disabled={isLoading} className="bg-cyan-500 text-black hover:bg-cyan-400">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* TAB: SECURITY */}
                <TabsContent value="security">
                    <Card className="bg-zinc-900/50 border-white/10">
                        <CardHeader><CardTitle className="text-white">Password</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Current Password</Label>
                                <Input type="password" value={passwords.current} onChange={(e) => handlePasswordChange("current", e.target.value)} className="bg-black border-white/10 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-300">New Password</Label>
                                <Input type="password" value={passwords.new} onChange={(e) => handlePasswordChange("new", e.target.value)} className="bg-black border-white/10 text-white" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleUpdatePassword} disabled={isLoading} className="bg-cyan-500 text-black hover:bg-cyan-400">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update Password"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="payments">
                    <div className="grid gap-6">

                        {/* Kartu Status */}
                        <Alert className={`border-l-4 ${midtrans.isProduction ? 'border-l-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'border-l-amber-500 bg-amber-500/10 border-amber-500/20'}`}>
                            <CreditCard className={`h-4 w-4 ${midtrans.isProduction ? 'text-emerald-400' : 'text-amber-400'}`} />
                            <AlertTitle className={`ml-2 ${midtrans.isProduction ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {midtrans.isProduction ? 'Production Mode Active' : 'Sandbox Mode Active'}
                            </AlertTitle>
                            <AlertDescription className="ml-2 text-zinc-400">
                                {midtrans.isProduction
                                    ? 'Transaksi yang terjadi adalah REAL dan akan memotong saldo kustomer.'
                                    : 'Transaksi hanya simulasi (Dummy). Tidak ada uang asli yang diproses.'}
                            </AlertDescription>
                        </Alert>

                        <Card className="bg-zinc-900/50 border-white/10">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-white">Midtrans Configuration</CardTitle>
                                        <CardDescription className="text-zinc-400">
                                            Masukkan API Key dari dashboard Midtrans Anda.
                                        </CardDescription>
                                    </div>
                                    {/* Logo Midtrans Kecil (Opsional) */}
                                    <div className="px-3 py-1 bg-white rounded-md">
                                        <span className="text-blue-900 font-bold text-xs tracking-widest">midtrans</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Toggle Production */}
                                <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-white">Production Mode</Label>
                                        <p className="text-xs text-zinc-500">
                                            Aktifkan jika Anda sudah siap menerima pembayaran asli.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={midtrans.isProduction}
                                        onCheckedChange={(checked) => handleMidtransChange("isProduction", checked)}
                                        className="data-[state=checked]:bg-emerald-500"
                                    />
                                </div>

                                {/* Inputs */}
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-zinc-300">Merchant ID</Label>
                                        <Input
                                            value={midtrans.merchantId}
                                            onChange={(e) => handleMidtransChange("merchantId", e.target.value)}
                                            className="bg-black border-white/10 text-white font-mono"
                                            placeholder="G-xxxxxxxx"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-zinc-300">Client Key</Label>
                                            <Input
                                                value={midtrans.clientKey}
                                                onChange={(e) => handleMidtransChange("clientKey", e.target.value)}
                                                className="bg-black border-white/10 text-white font-mono"
                                                type="password"
                                                placeholder="SB-Mid-client-..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-zinc-300">Server Key</Label>
                                            <Input
                                                value={midtrans.serverKey}
                                                onChange={(e) => handleMidtransChange("serverKey", e.target.value)}
                                                className="bg-black border-white/10 text-white font-mono"
                                                type="password"
                                                placeholder="SB-Mid-server-..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-between border-t border-white/5 pt-6">
                                <p className="text-xs text-zinc-500">
                                    Jangan bagikan Server Key Anda kepada siapapun.
                                </p>
                                <Button onClick={handleSaveMidtrans} disabled={isLoading} className="bg-cyan-500 text-black hover:bg-cyan-400">
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Configuration"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="team">
                    <TeamTabContent />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function TeamTabContent() {
    const {
        members, isLoading,
        isInviteOpen, setIsInviteOpen,
        inviteEmail, setInviteEmail,
        inviteRole, setInviteRole,
        handleInviteMember, handleRemoveMember, handleResendInvite
    } = useTeam();

    return (
        <Card className="bg-zinc-900/50 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-white">Team Members</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Kelola akses dan role anggota tim Anda.
                    </CardDescription>
                </div>

                {/* TOMBOL UNDANG ANGGOTA */}
                <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
                            <UserPlus className="mr-2 h-4 w-4" /> Invite Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-900 border-white/10 text-white">
                        <DialogHeader>
                            <DialogTitle>Undang Anggota Baru</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Kirim email undangan untuk bergabung ke tim ini.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Email Address</Label>
                                <Input
                                    placeholder="nama@perusahaan.com"
                                    className="bg-black border-white/10 text-white"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Role</Label>
                                <Select value={inviteRole} onValueChange={setInviteRole}>
                                    <SelectTrigger className="bg-black border-white/10 text-white">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                        <SelectItem value="Admin">Admin (Full Access)</SelectItem>
                                        <SelectItem value="Member">Member (Limited Access)</SelectItem>
                                        <SelectItem value="Viewer">Viewer (Read Only)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleInviteMember} disabled={isLoading} className="bg-cyan-500 text-black">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Kirim Undangan"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>

            <CardContent>
                <div className="space-y-6">
                    {members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 border border-white/10">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback className="bg-cyan-900 text-cyan-200">
                                        {member.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-white leading-none">{member.name}</p>
                                    <p className="text-sm text-zinc-500 mt-1">{member.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Role Badge */}
                                <Select defaultValue={member.role} disabled={member.role === "Owner"}>
                                    <SelectTrigger className="w-27.5 h-8 bg-black/50 border-white/10 text-xs text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                        <SelectItem value="Owner">Owner</SelectItem>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Member">Member</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Action Menu */}
                                {member.role !== "Owner" && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white">
                                            {member.status === "Pending" && (
                                                <DropdownMenuItem onClick={() => handleResendInvite(member.email)} className="cursor-pointer">
                                                    <Mail className="mr-2 h-4 w-4" /> Resend Invite
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem onClick={() => handleRemoveMember(member.id)} className="text-red-400 focus:text-red-400 cursor-pointer">
                                                <Trash2 className="mr-2 h-4 w-4" /> Remove User
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}