import * as crypto from 'crypto'
import * as SSS from 'shamir-secret-sharing'
import * as symmetric from './symmetric'

const toUint8Array = (data: any) => new TextEncoder().encode(data);
const fromUint8Array = (data: any) => new TextDecoder().decode(data);

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
	return crypto.privateDecrypt(
    {
      key: privateKey,
      // passphrase
    }, Buffer.from(encryptedText, 'base64')
  ).toString('utf8');
}

export async function splitKey(key, passphrases, threshold) {
  const numShards = passphrases.length
  const shards = await SSS.split(toUint8Array(key), numShards, threshold)
  const res = await Promise.all(shards.map((v,i) => symmetric.encryptSym(v, passphrases[i])))
  return res
}

export async function joinKey(encShards, passphrases) {
  let shards = []

  // try all combinationa
  for (let ii = 0; ii < encShards.length; ii++) {
    const encShard = encShards[ii]
    for (let jj = 0; jj < passphrases.length; jj++) {
      try {
	const res = await symmetric.decryptSym(encShard, passphrases[jj])
	if (res) {
	  shards.push(new Uint8Array(res))
	  console.log(`ok ${ii}-${jj}`)
	  continue
	}
      } catch (e) {
	  console.log(`no ${ii}-${jj}`)
      }
    }
  }

  const privateKey = await SSS.combine(shards)
  return fromUint8Array(privateKey)
}
