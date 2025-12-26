import { IUser } from "./IUser";

export interface ApiResponse {
    success: boolean;
    message: string;
    id?: number;
    username?: string;
    user?: IUser;
    token?: string;
    errors?: Record<string, string[]>
    accessToken?: string,
    otp?: string,
}