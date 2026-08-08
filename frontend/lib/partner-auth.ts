export const PARTNER_AUTH_FLAG = "pkaf_partner_auth";
export const PARTNER_ACCOUNTS_KEY = "pkaf_partner_accounts";

export const PARTNER_DEMO_EMAIL = "partner@pkaflev.com";
export const PARTNER_DEMO_PASSWORD = "partner123";

export type PartnerAccount = {
  email: string;
  password: string;
  name?: string;
  createdAt?: string;
};

export function getPartnerAccounts(): PartnerAccount[] {
  if (typeof window === "undefined") {
    return [{
      email: PARTNER_DEMO_EMAIL,
      password: PARTNER_DEMO_PASSWORD,
      name: "PKAF Demo Partner",
      createdAt: new Date().toISOString(),
    }];
  }

  try {
    const stored = window.localStorage.getItem(PARTNER_ACCOUNTS_KEY);
    if (!stored) {
      const demoAccounts = [{
        email: PARTNER_DEMO_EMAIL,
        password: PARTNER_DEMO_PASSWORD,
        name: "PKAF Demo Partner",
        createdAt: new Date().toISOString(),
      }];
      window.localStorage.setItem(PARTNER_ACCOUNTS_KEY, JSON.stringify(demoAccounts));
      return demoAccounts;
    }

    const parsed = JSON.parse(stored) as PartnerAccount[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const demoAccounts = [{
        email: PARTNER_DEMO_EMAIL,
        password: PARTNER_DEMO_PASSWORD,
        name: "PKAF Demo Partner",
        createdAt: new Date().toISOString(),
      }];
      window.localStorage.setItem(PARTNER_ACCOUNTS_KEY, JSON.stringify(demoAccounts));
      return demoAccounts;
    }

    const hasDemoAccount = parsed.some(
      (account) => account.email.trim().toLowerCase() === PARTNER_DEMO_EMAIL.toLowerCase(),
    );

    if (!hasDemoAccount) {
      const merged = [
        ...parsed,
        {
          email: PARTNER_DEMO_EMAIL,
          password: PARTNER_DEMO_PASSWORD,
          name: "PKAF Demo Partner",
          createdAt: new Date().toISOString(),
        },
      ];
      window.localStorage.setItem(PARTNER_ACCOUNTS_KEY, JSON.stringify(merged));
      return merged;
    }

    return parsed;
  } catch {
    return [{
      email: PARTNER_DEMO_EMAIL,
      password: PARTNER_DEMO_PASSWORD,
      name: "PKAF Demo Partner",
      createdAt: new Date().toISOString(),
    }];
  }
}

export function createPartnerAccount(account: { name?: string; email: string; password: string }): PartnerAccount {
  if (typeof window === "undefined") {
    return { ...account, createdAt: new Date().toISOString() };
  }

  const trimmedAccount: PartnerAccount = {
    name: account.name?.trim() || "Affiliate Partner",
    email: account.email.trim(),
    password: account.password,
    createdAt: new Date().toISOString(),
  };

  const existing = getPartnerAccounts();
  const nextAccounts = existing.filter(
    (entry) => entry.email.trim().toLowerCase() !== trimmedAccount.email.trim().toLowerCase(),
  );

  const merged = [...nextAccounts, trimmedAccount];
  window.localStorage.setItem(PARTNER_ACCOUNTS_KEY, JSON.stringify(merged));
  return trimmedAccount;
}

export function isPartnerAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(PARTNER_AUTH_FLAG) === "true";
  } catch {
    return false;
  }
}

export function setPartnerAuthenticated(value: boolean): void {
  if (typeof window === "undefined") return;

  try {
    if (value) {
      window.localStorage.setItem(PARTNER_AUTH_FLAG, "true");
    } else {
      window.localStorage.removeItem(PARTNER_AUTH_FLAG);
    }
  } catch {
    // Ignore storage access issues in non-browser environments.
  }
}

export function validatePartnerCredentials(email: string, password: string): boolean {
  const normalizedEmail = email.trim().toLowerCase();

  return getPartnerAccounts().some(
    (account) =>
      account.email.trim().toLowerCase() === normalizedEmail &&
      account.password === password,
  );
}
