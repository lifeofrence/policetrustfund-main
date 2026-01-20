/**
 * API Client for Police Trust Fund Admin Dashboard
 * Handles all HTTP requests to the Laravel backend with Sanctum authentication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://nptfcms.jubileesystem.com/api/v1';

interface RequestOptions extends RequestInit {
    requiresAuth?: boolean;
}

/**
 * Get authentication token from localStorage
 */
function getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_token');
}

/**
 * Set authentication token in localStorage
 */
export function setAuthToken(token: string): void {
    localStorage.setItem('admin_token', token);
}

/**
 * Remove authentication token from localStorage
 */
export function removeAuthToken(): void {
    localStorage.removeItem('admin_token');
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
