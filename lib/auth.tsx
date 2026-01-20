'use client';

/**
 * Authentication Context and Hooks
 * Manages admin user authentication state and provides auth utilities
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiPost, apiGet, setAuthToken, removeAuthToken } from './api';

interface User {
    id: number;
    name: string;
    email: string;
    roles?: string[];
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await apiGet<{ user: User }>('/admin/me');
            setUser(response.user);
        } catch (error) {
            setUser(null);
            removeAuthToken();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string, rememberMe: boolean = false) => {
        try {
            const response = await apiPost<{ token: string; user: User }>(
                '/admin/login',
                { email, password, remember_me: rememberMe },
                false // Don't require auth for login
            );

            setAuthToken(response.token);
            setUser(response.user);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await apiPost('/admin/logout', {});
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            removeAuthToken();
            setUser(null);
            if (typeof window !== 'undefined') {
                window.location.href = '/admin/login';
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
