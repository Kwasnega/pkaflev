"use client";

import { usePathname } from "next/navigation";
import { PkaflevHeader } from "./pkaflev-header";

function isPartnerPortalRoute(pathname: string | null) {
    return pathname === "/partner/login" || pathname?.startsWith("/partner/dashboard");
}

export function HeaderWrapper() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const isCart = pathname === "/cart";
    const isPartnerPortal = isPartnerPortalRoute(pathname);

    if (isAdmin || isCart || isPartnerPortal) return null;

    return <PkaflevHeader />;
}
