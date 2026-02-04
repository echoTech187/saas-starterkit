// src/lib/api.ts
import * as Sentry from "@sentry/nextjs";

export class ApiError extends Error {
    constructor(
        public message: string,
        public status: number,
        public data?: any
    ) {
        super(message);
        this.name = "ApiError";
    }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
    token?: string;
    body?: unknown;
}

function getBaseUrl(): string {
    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_PUBLIC_API_URL;
    return BASE_URL || '';
}

async function apiFetch<T>(
    endpoint: string,
    options?: RequestOptions
): Promise<T> {
    const { headers, body, token, ...customConfig } = options || {};

    const config: RequestInit = {
        method: options?.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
        },
        ...customConfig,
    };

    if (body) {
        if (typeof body === 'string') {
            config.body = body;
        } else if (typeof body === 'object') {
            if (body instanceof FormData) {
                config.body = body;
            } else {
                config.body = JSON.stringify(body);
            }
        } else {
            throw new Error(`Unsupported body type: ${typeof body}`);
        }
    }

    const BASE_URL = getBaseUrl();

    // Validate BASE_URL only when actually making a request (runtime)
    if (!BASE_URL) {
        throw new Error('NEXT_PUBLIC_BACKEND_API_URL is not defined in environment variables. Please configure it in EdgeOne Pages environment variables settings.');
    }

    if (!BASE_URL.startsWith("http")) {
        throw new Error(`NEXT_PUBLIC_BACKEND_API_URL must start with http:// or https://. Current value: ${BASE_URL}`);
    }
    console.log(`${BASE_URL}${endpoint}`, config);
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // Handle cases where the response might not have a body (e.g., 204 No Content)
    if (response.status === 204) {
        return null as T;
    }

    const responseText = await response.text();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let responseJson: any;

    try {
        responseJson = JSON.parse(responseText);
    } catch (error: unknown) {
        console.error("Non-JSON API Response:", responseText);
        // Ignore JSON parse error
    }

    console.log(response.ok, response.status, response.statusText, responseJson || responseText);

    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        if (responseJson && responseJson.message) {
            errorMessage = responseJson.message;
        } else {
            console.error("Non-JSON API Error Response:", responseText);
            errorMessage = response.statusText || errorMessage;
        }

        // Global Error Handling (Middleware-like logic)
        if (response.status === 401) {
            // Opsional: Handle Unauthorized (misal: log event, atau trigger refresh token)
            console.warn("⚠️ Unauthorized: Token expired or invalid.");
        }

        // Deteksi Error XML S3/EdgeOne (Indikasi Salah URL Backend)
        if (response.status === 405 && responseText.includes("MethodNotAllowed")) {
            errorMessage = `🚨 MISCONFIGURATION: API URL points to Storage/Frontend instead of Backend. Check NEXT_PUBLIC_BACKEND_API_URL. Target: ${BASE_URL}`;
        }

        const errorObj = new ApiError(errorMessage, response.status, responseJson);

        // Sentry Integration: Capture error sebelum di-throw
        try {
            Sentry.withScope((scope) => {
                scope.setTag("api_method", config.method?.toString() || "GET");
                scope.setTag("api_endpoint", endpoint);
                scope.setTag("http_status", response.status);
                scope.setExtra("response_body", responseJson || responseText);
                Sentry.captureException(errorObj);
            });
        } catch (e) {
            console.error("Sentry logging failed:", e);
        }

        throw errorObj;
    }

    return responseJson as T;
}

export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) => apiFetch<T>(endpoint, { method: 'GET', ...options }),
    post: <T>(endpoint: string, body: BodyInit | null | undefined, options?: RequestOptions) => apiFetch<T>(endpoint, { method: 'POST', body, ...options }),
    put: <T>(endpoint: string, body: BodyInit | null | undefined, options?: RequestOptions) => apiFetch<T>(endpoint, { method: 'PUT', body, ...options }),
    delete: <T>(endpoint: string, options?: RequestOptions) => apiFetch<T>(endpoint, { method: 'DELETE', ...options }),
};
