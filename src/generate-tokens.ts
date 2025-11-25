import 'reflect-metadata';
import { EncryptionService } from './encryption/encryption.service';
import * as fs from 'fs';

const encryption = new EncryptionService();

const names = [
  'Luca',
  'famiglia1',
  'Maria',
  'Giulia',
  'Marco',
  'Antonio',
  'Gianfranco',
  'Chiara',
  'Francesca',
  'Elena',
  'Roberto',
  'Federica',
  'Alessandro',
  'Valeria',
  'Michela',
];

const tokens: Record<string, string> = {};

names.forEach((name) => {
  const token = encryption.encrypt(name);
  tokens[name] = token;
});

console.log('Token generati:', tokens);

fs.writeFileSync('tokens.json', JSON.stringify(tokens, null, 2));
console.log('Token salvati su tokens.json');
