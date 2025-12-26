export interface IUser {
    fullname: string;
    email: string;
    username: string;
    phone_number?: string;
    slug: string;
    id: number;
}

export interface User {
    email: string;
    password: string;
    confirmPassword: string;
    code: string;
}