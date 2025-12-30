import { redirect } from 'next/navigation';
import { IUser } from '@/core/entities/IUser';
import { decodeToken } from '@/app/_actions/authActions';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function verifySession() {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        redirect('/login');
    }
    const user: IUser = await decodeToken(session.accessToken as string);

    if (!user) {
        redirect('/login');
    }

    return user;
}