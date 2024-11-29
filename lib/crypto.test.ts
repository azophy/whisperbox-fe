import { expect, test } from 'vitest'
import {
  generateKeyPair,
  encryptAsym,
  decryptAsym,
  splitKey,
  joinKey,
} from './crypto'

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

test('splitting privateKey with SSS', async () =>{
  const passphrases = ['1', '2', '3']
  const keys = generateKeyPair()
  expect(keys).not.toHaveProperty('err')
  expect(keys).toHaveProperty('publicKey')
  expect(keys).toHaveProperty('privateKey')

  const shards = await splitKey(keys.privateKey, passphrases, 2)
  expect(shards).toHaveLength(3)
  console.log(shards)
  const reconstructedKey = await joinKey(shards, [passphrases[1], passphrases[2]])
  expect(reconstructedKey).toEqual(keys.privateKey)
})
