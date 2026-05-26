import { create } from "zustand";
import type { AuthResponse } from "../types/index.ts";

interface AuthState{
    token: string | null;
    user: Omit<AuthResponse, "token"> | null;
    setAuth: (data: AuthResponse) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    token: localStorage.getItem("token"),
    user: (() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    })(),

    setAuth: (data) =>{
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({
            email: data.email,
            firstName: data.firstName,
            role: data.role,
            expiresAt: data.expiresAt
        }))
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ token: null, user: null})
    }
}))