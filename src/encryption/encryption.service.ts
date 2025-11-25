import * as crypto from 'crypto';

export class EncryptionService {
  private key: Buffer;

  constructor() {
    this.key = crypto
      .createHash('sha256')
      .update('la-tua-chiave-segreta')
      .digest();
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, iv);

    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    const combined = iv.toString('base64') + ':' + encrypted;

    const urlSafe = combined
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    return urlSafe;
  }

  decrypt(token: string): string {
    const base64 = token.replace(/-/g, '+').replace(/_/g, '/');

    const padLength = 4 - (base64.length % 4);
    const padded = base64 + '='.repeat(padLength % 4);

    const [ivB64, encrypted] = padded.split(':');
    const iv = Buffer.from(ivB64, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
