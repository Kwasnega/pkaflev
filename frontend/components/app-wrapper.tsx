"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface AppWrapperProps {
    children: React.ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
    const pathname = usePathname();
    const isAdminRoute = pathname ? pathname.startsWith("/admin") : false;
    const [showSplash, setShowSplash] = useState(false);

    useEffect(() => {
        try {
            sessionStorage.setItem("splashSeen", "true");
            window.dispatchEvent(new Event("splashComplete"));
        } catch (e) {}
    }, []);

    if (isAdminRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <div className="opacity-100 transition-opacity duration-700">
                {children}
            </div>
        </>
    );
}
