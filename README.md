# Cloudflare Workers: Using Web Crypto API

## Overview

The functions `hashPassword`, `verifyPassword`, and `bufferToHex` are not provided by Cloudflare's Web Crypto API directly but are custom utility functions built using the Web Crypto API available in the browser environment, which Cloudflare Workers also provide.

## Web Crypto API in Cloudflare Workers

Cloudflare Workers support the Web Crypto API, which includes a variety of cryptographic operations such as hashing, encryption, and decryption. The Web Crypto API is a standard part of web browsers and is also available in Cloudflare Workers.

## Explanation of Functions and Web Crypto API

### `hashPassword` Function

- Uses `TextEncoder` to convert the password string into a `Uint8Array`.
- Uses `crypto.subtle.digest` to compute a hash of the password. This method is part of the Web Crypto API.
- Uses a custom function `bufferToHex` to convert the `ArrayBuffer` returned by `crypto.subtle.digest` into a hexadecimal string.

### `verifyPassword` Function

- Uses the `hashPassword` function to hash the provided password.
- Compares the hashed password with the stored hash.

### `bufferToHex` Function

- Converts an `ArrayBuffer` to a hexadecimal string. This function is custom and not part of the Web Crypto API.

## Web Crypto API Methods Used

### `crypto.subtle.digest(algorithm, data)`

- Computes a digest (hash) of the data using the specified algorithm (e.g., 'SHA-256').
- Returns a Promise that resolves to an `ArrayBuffer` containing the hash.

### Example Code

```typescript
// Utility function to hash a password
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
}

// Utility function to verify a password
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
}

// Utility function to convert buffer to hex string
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.prototype.map.call(new Uint8Array(buffer), (x) =>
    ('00' + x.toString(16)).slice(-2)
  ).join('');
}
