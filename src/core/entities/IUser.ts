export interface IUser {
    fullname: string;
    email: string;
    username: string;
    phone_number?: string;
    slug: string;
    image: string;
    user_status: number;
    id: number;
    code?: string;
}

export interface UserProps {
    email: string;
    password: string;
    confirmPassword: string;
}