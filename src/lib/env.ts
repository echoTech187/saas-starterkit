import { z } from 'zod';

const envSchema = z.object({
    BACKEND_PUBLIC_API_URL: z.string().url().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    // Add other environment variables here as needed
});

type EnvSchema = z.infer<typeof envSchema>;
interface CustomNodeJsGlobal extends NodeJS.ProcessEnv, EnvSchema {}
declare const process: {
    env: CustomNodeJsGlobal;
}

try {
    envSchema.parse(process.env);
} catch (error: unknown) {
    if (error instanceof z.ZodError) {
        console.error('❌ Invalid environment variables:', error.flatten().fieldErrors);
    }
    throw new Error('Invalid environment variables');
}

export const env = envSchema.parse(process.env);
