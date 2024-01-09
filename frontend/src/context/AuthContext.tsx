import { createContext, useContext, useEffect, useState } from "react";

type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<UserAuth | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        //fetch if user cookies are valid, then skip login
    }, [])

    async function login(email: string, password: string): Promise<void> {
        // login functionality
    }

    async function signup(name: string, email: string, password: string): Promise<void> {
        // signup functionality
    }

    async function logout(): Promise<void> {
        // logout functionality
    }

    const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}