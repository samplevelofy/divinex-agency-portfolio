// This is a TEMPORARY, INSECURE STATIC AUTHENTICATION for local development.
// For production, you would use a robust session management system.

const ADMIN_LOCAL_PASSWORD_HASH = "b90956891001e05d2122602187f54124be3b0638c4d293239a5ee11f07f5979f"; // SHA256 hash of 'bc1219910228'

// In a real scenario, you'd use a proper hashing library. For demo:
async function sha256(message: string): Promise<string> {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hexHash;
}

export async function validateAdminPassword(password: string): Promise<boolean> {
    if (!password) return false;
    const hashedPassword = await sha256(password);
    return hashedPassword === ADMIN_LOCAL_PASSWORD_HASH;
}

// For simplicity in Astro, we'll just return true if a session is present
// or simulate a "logged in" state based on a session cookie.
// This will be handled in /admin/login.astro and /admin/logout.astro