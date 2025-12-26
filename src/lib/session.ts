
import { redirect } from 'next/navigation';
import { IUser } from '@/core/entities/IUser';
import { getToken, removeToken } from './utils/auth';
import { decodeToken } from '@/app/_actions/authActions';
import { authUseCase } from '@/di/modules';

export async function verifySession() {
    const cookieStore = await getToken();

    if (!cookieStore) {
        redirect('/login');
    }

    const user: IUser = await decodeToken(cookieStore);

    return user;
}

export async function userVerify(email: string) {
    const user = await authUseCase.checkUserByEmail(email);
    if (user === null || user === undefined) {
        await removeToken();
        return null;
    }

    return user;
}

export async function userVerifyByToken(token: string) {
    const user = await authUseCase.executeUserProfile(token);
    if (user === null || user === undefined) {
        await removeToken();
        return null;
    }

    return user;
}
