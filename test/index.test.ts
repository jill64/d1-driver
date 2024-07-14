import 'dotenv/config'
import { env } from 'node:process'
import { expect, test } from 'vitest'
import { D1 } from '../src/index'

test(
  'E2E',
  {
    timeout: 30000
  },
  async ({ onTestFailed }) => {
    const d1 = new D1(env.CLOUDFLARE_ACCOUNT_ID!, env.CLOUDFLARE_API_KEY!)

    const db = await d1.create(`d1-driver-test-${crypto.randomUUID()}`)

    expect(db.success).toBe(true)

    console.log('db', db)

    const uuid = db.result?.uuid

    if (!uuid) {
      throw new Error('No UUID')
    }

    onTestFailed(async () => {
      const delete_result = await d1.delete(uuid)
      console.log('delete_result', delete_result)
    })

    const list_result = await d1.list()
    console.log('list_result', list_result)
    expect(list_result.success).toBe(true)

    const get_result = await d1.get(uuid)
    console.log('get_result', get_result)
    expect(get_result.success).toBe(true)

    const query_result = await d1.query(
      uuid,
      'CREATE TABLE test (id INTEGER PRIMARY KEY, name INTEGER)'
    )
    console.log('query_result', query_result)
    expect(query_result.success).toBe(true)

    const raw_result = await d1.raw(uuid, 'SELECT * FROM test')
    console.log('raw_result', raw_result)
    expect(raw_result.success).toBe(true)

    const delete_result = await d1.delete(uuid)
    console.log('delete_result', delete_result)
  }
)
