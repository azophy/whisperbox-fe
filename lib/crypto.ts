//const crypto = require('node:crypto');
import * as crypto from 'crypto'

function generateKeyPair() {
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

const encrypt = (text, publicKey) => {
	  return crypto.publicEncrypt(publicKey, Buffer.from(text, 'utf8')).toString('base64');
}

const decrypt = (encryptedText, privateKey) => {
	return crypto.privateDecrypt({
	key: privateKey,
	// passphrase
	}, Buffer.from(encryptedText, 'base64')).toString('utf8');
}


const keys = generateKeyPair()
console.log(keys)
const secret = encrypt("cobacoba", keys.publicKey)
console.log(secret)
console.log(decrypt(secret, keys.privateKey))

