import { expect, test } from 'vitest'
import { generateKeyPair, encryptAsym, decryptAsym } from './crypto'

test('basic crypto operation', () => {
	const plaintext = 'cobacoba'
const keys = generateKeyPair()
expect(keys).toHaveProperty('publicKey')
expect(keys).toHaveProperty('privateKey')
expect(keys).not.toHaveProperty('err')
const secret = encryptAsym(plaintext, keys.publicKey)
expect(secret).not.toEqual(plaintext)
expect(decryptAsym(secret, keys.privateKey)).toEqual(plaintext)

  })

test('splitting privateKey with SSS', () =>{
const keys = generateKeyPair()
expect(keys).not.toHaveProperty('err')
expect(keys).toHaveProperty('publicKey')
expect(keys).toHaveProperty('privateKey')
})
