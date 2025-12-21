import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="space-y-8">

            {/* 1. Header Section */}
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
                    <p className="text-zinc-400">
                        Overview performa aplikasi Anda hari ini.
                    </p>
                </div>
            </div>

            {/* 2. Stats Cards (Neon Border accents) */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                {/* Card 1: Revenue (Cyan Accent) */}
                <Card className="bg-zinc-900/50 border-white/10 shadow-lg relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
                    <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500 group-hover:w-1.5 transition-all" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-200">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-cyan-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">$45,231.89</div>
                        <p className="text-xs text-zinc-500 mt-1">+20.1% from last month</p>
                    </CardContent>
                </Card>

                {/* Card 2: Users (Purple Accent) */}
                <Card className="bg-zinc-900/50 border-white/10 shadow-lg relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
                    <div className="absolute inset-y-0 left-0 w-1 bg-purple-500 group-hover:w-1.5 transition-all" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-200">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">+2350</div>
                        <p className="text-xs text-zinc-500 mt-1">+180.1% from last month</p>
                    </CardContent>
                </Card>

                {/* Card 3: Sales (Blue Accent) */}
                <Card className="bg-zinc-900/50 border-white/10 shadow-lg relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
                    <div className="absolute inset-y-0 left-0 w-1 bg-blue-500 group-hover:w-1.5 transition-all" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-200">Sales</CardTitle>
                        <CreditCard className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">+12,234</div>
                        <p className="text-xs text-zinc-500 mt-1">+19% from last month</p>
                    </CardContent>
                </Card>

                {/* Card 4: Active Now (Emerald Accent) */}
                <Card className="bg-zinc-900/50 border-white/10 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
                    <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500 group-hover:w-1.5 transition-all" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-200">Active Now</CardTitle>
                        <Activity className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">+573</div>
                        <p className="text-xs text-zinc-500 mt-1">+201 since last hour</p>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Main Chart Placeholder */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Big Chart Area */}
                <Card className="col-span-4 bg-zinc-900/50 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* Placeholder Chart */}
                        <div className="h-75 w-full flex items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-black/20">
                            <p className="text-zinc-500 text-sm">Chart Component Placeholder</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Sales / Activity */}
                <Card className="col-span-3 bg-zinc-900/50 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Sales</CardTitle>
                        <CardDescription className="text-zinc-400">
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder List */}
                        <div className="space-y-8">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center">
                                    <div className="h-9 w-9 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center text-xs text-white">
                                        OM
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none text-white">Olivia Martin</p>
                                        <p className="text-xs text-zinc-500">olivia.martin@email.com</p>
                                    </div>
                                    <div className="ml-auto font-medium text-white">+$1,999.00</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}