export const SESSION_COOKIE_NAME = "admin-session";
const DEFAULT_ADMIN_SESSION_SECRET = "pkaflev_admin_session_dev_secret";

async function createHmac(message: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || DEFAULT_ADMIN_SESSION_SECRET;
}

export async function createAdminSessionValue(secret: string, expiresAt: number) {
  const signature = await createHmac(String(expiresAt), secret);
  return `${expiresAt}.${signature}`;
}

export async function verifyAdminSessionValue(value: string, secret: string) {
  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature) {
    return false;
  }

  if (Number(expiresAt) <= Date.now()) {
    return false;
  }

  const expectedSignature = await createHmac(expiresAt, secret);
  return signature === expectedSignature;
}
