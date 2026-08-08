/**
 * Utility functions for sanitizing user input to prevent XSS and injection attacks.
 */

/**
 * Escapes potentially dangerous HTML characters in a string.
 */
export function escapeHtml(unsafe: string): string {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Recursively sanitizes an object or array by escaping all string values.
 */
export function sanitizeData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }
  
  if (typeof data === 'string') {
    return escapeHtml(data) as unknown as T;
  }
  
  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item)) as unknown as T;
  }
  
  if (typeof data === 'object') {
    const sanitizedObj: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitizedObj[key] = sanitizeData(value);
    }
    return sanitizedObj as T;
  }
  
  return data;
}
