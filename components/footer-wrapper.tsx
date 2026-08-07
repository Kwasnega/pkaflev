"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "./site-footer";

function isPartnerPortalRoute(pathname: string | null) {
    return pathname === "/partner/login" || pathname?.startsWith("/partner/dashboard");
}

export function FooterWrapper() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const isPartnerPortal = isPartnerPortalRoute(pathname);

    if (isAdmin || isPartnerPortal) return null;

    return <SiteFooter />;
}
