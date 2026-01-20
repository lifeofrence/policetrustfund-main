/**
 * API Client for Police Trust Fund Admin Dashboard
 * Handles all HTTP requests to the Laravel backend with Sanctum authentication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://nptfcms.jubileesystem.com/api/v1';

interface RequestOptions extends RequestInit {
    requiresAuth?: boolean;
}

/**
 * Helper to manage cookies for auth token
 */
const COOKIE_NAME = 'admin_token';

function setCookie(name: string, value: string, days: number = 7) {
    if (typeof document === 'undefined') return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function removeCookie(name: string) {
    if (typeof document === 'undefined') return;
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/**
 * Get authentication token from cookies or localStorage
 */
function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return getCookie(COOKIE_NAME) || localStorage.getItem(COOKIE_NAME);
}

/**
 * Set authentication token in cookies and localStorage
 */
export function setAuthToken(token: string): void {
    setCookie(COOKIE_NAME, token);
    localStorage.setItem(COOKIE_NAME, token);
}

/**
 * Remove authentication token from cookies and localStorage
 */
export function removeAuthToken(): void {
    removeCookie(COOKIE_NAME);
    localStorage.removeItem(COOKIE_NAME);
}

/**
 * Main API request function
 */
async function apiRequest<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const { requiresAuth = true, headers = {}, ...restOptions } = options;

    const requestHeaders: any = {
        ...headers,
    };

    // Add authorization header if required
    if (requiresAuth) {
        const token = getAuthToken();
        if (token) {
            requestHeaders['Authorization'] = `Bearer ${token}`;
        }
    }

    // Add Accept header for JSON responses
    if (!requestHeaders['Accept']) {
        requestHeaders['Accept'] = 'application/json';
    }

    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...restOptions,
            headers: requestHeaders,
        });

        // Handle 401 Unauthorized - token expired or invalid
        if (response.status === 401 && requiresAuth) {
            removeAuthToken();
            if (typeof window !== 'undefined' && window.location.pathname !== '/admin/login') {
                window.location.href = '/admin/login';
            }
            throw new Error('Unauthorized - please login again');
        }

        // Parse response
        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            console.error('JSON Parse Error:', jsonError);
            const text = await response.text();
            console.error('Response text:', text.substring(0, 500));
            throw new Error('Server returned invalid JSON. This may be due to binary data encoding issues. Check backend logs.');
        }

        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        return data as T;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

/**
 * GET request
 */
export async function apiGet<T>(endpoint: string, requiresAuth = true): Promise<T> {
    return apiRequest<T>(endpoint, {
        method: 'GET',
        requiresAuth,
    });
}

/**
 * POST request with JSON body
 */
export async function apiPost<T>(
    endpoint: string,
    data?: any,
    requiresAuth = true
): Promise<T> {
    return apiRequest<T>(endpoint, {
        method: 'POST',
        requiresAuth,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * POST request with FormData (for file uploads)
 */
export async function apiPostFormData<T>(
    endpoint: string,
    formData: FormData,
    requiresAuth = true
): Promise<T> {
    return apiRequest<T>(endpoint, {
        method: 'POST',
        requiresAuth,
        body: formData,
        // Don't set Content-Type header - browser will set it with boundary
    });
}

/**
 * PUT request with JSON body
 */
export async function apiPut<T>(
    endpoint: string,
    data?: any,
    requiresAuth = true
): Promise<T> {
    return apiRequest<T>(endpoint, {
        method: 'PUT',
        requiresAuth,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * PUT request with FormData (for file uploads)
 * Laravel doesn't support PUT with FormData, so we use POST with _method override
 */
export async function apiPutFormData<T>(
    endpoint: string,
    formData: FormData,
    requiresAuth = true
): Promise<T> {
    // Add _method field to tell Laravel this is a PUT request
    formData.append('_method', 'PUT');

    return apiRequest<T>(endpoint, {
        method: 'POST',
        requiresAuth,
        body: formData,
    });
}

/**
 * DELETE request
 */
export async function apiDelete<T>(
    endpoint: string,
    requiresAuth = true
): Promise<T> {
    return apiRequest<T>(endpoint, {
        method: 'DELETE',
        requiresAuth,
    });
}

// Type definitions for API responses
export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface ApiResponse<T> {
    message: string;
    data: T;
}
