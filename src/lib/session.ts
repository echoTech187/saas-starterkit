import { redirect } from 'next/navigation';
import { IUser } from '@/core/entities/IUser';
import { decodeToken } from '@/app/_actions/authActions';
import { cookies } from 'next/headers';

export async function verifySession() {
    const session = (await cookies()).get('next-auth.session-token')?.value;
    if (!session) {
        redirect('/login');
    }
    const user: IUser = await decodeToken(session as string);

    if (!user) {
        redirect('/login');
    }

    return user;
}