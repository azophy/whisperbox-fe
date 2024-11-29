//const crypto = require('node:crypto');
import * as crypto from 'crypto'

export function generateKeyPair() {
const res = crypto.generateKeyPairSync('rsa', {
modulusLength: 4096,
publicKeyEncoding: {
type: 'spki',
format: 'pem',
},
privateKeyEncoding: {
type: 'pkcs8',
format: 'pem',
//cipher: 'aes-256-cbc',
//passphrase: 'top secret',
},
}) 
return res
}

// ref: https://dev.to/superviz/implementing-symmetric-and-asymmetric-encryption-with-nodejs-4efp
export const encryptAsym = (text, publicKey) => {
	  return crypto.publicEncrypt(publicKey, Buffer.from(text, 'utf8')).toString('base64');
}

export const decryptAsym = (encryptedText, privateKey) => {
	return crypto.privateDecrypt({
	key: privateKey,
	// passphrase
	}, Buffer.from(encryptedText, 'base64')).toString('utf8');
}


