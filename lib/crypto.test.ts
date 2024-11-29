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
  const keys = generateKeyPair()
  expect(keys).not.toHaveProperty('err')
  expect(keys).toHaveProperty('publicKey')
  expect(keys).toHaveProperty('privateKey')

  const shards = await splitKey(keys.privateKey, ['1', '2', '3'], 2)
  expect(shards).toHaveLength(3)
  const reconstructedKey = await joinKey(shards[1], shards[2])
  expect(reconstructedKey).toEqual(keys.privateKey)
})
