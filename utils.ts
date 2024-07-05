// Utility function to hash a password
async function hashPassword(password: string): Promise<string> {
  // Create a TextEncoder instance to encode the password as a byte array.
  const encoder = new TextEncoder();
  
  // Encode the password string into a Uint8Array.
  const data = encoder.encode(password);
  
  // Hash the encoded password using the SHA-256 algorithm. This returns a Promise that resolves to an ArrayBuffer.
  const hashBuffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert the ArrayBuffer to a hexadecimal string.
  return bufferToHex(hashBuffer);
}

// Utility function to verify a password
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Hash the provided password using the hashPassword function.
  const hashedPassword = await hashPassword(password);
  
  // Compare the hashed password with the stored hash and return the result.
  return hashedPassword === hash;
}

// Utility function to convert buffer to hex string
function bufferToHex(buffer: ArrayBuffer): string {
  // Convert the ArrayBuffer to a Uint8Array.
  return Array.prototype.map.call(new Uint8Array(buffer), (x) =>
    // Convert each byte to a hexadecimal string and pad with leading zeros if necessary.
    ('00' + x.toString(16)).slice(-2)
  ).join('');
}
