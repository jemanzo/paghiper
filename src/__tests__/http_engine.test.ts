import { EP_TRANSACTION_STATUS, REQ_HEADERS } from '../constants'
import { HTTPEngine } from '../http_engine'
import { TransactionStatusResponse } from '../types'

const FAKE_URL = 'https://localhost'

describe('http engine', () => {
  const engine = new HTTPEngine(FAKE_URL, REQ_HEADERS)
  test('headers should be initialized', () => {
    // @ts-ignore
    expect(engine._request.headers).toEqual(REQ_HEADERS)
  })
  test('post function should be mocked', async () => {
    const result = (await engine.post(EP_TRANSACTION_STATUS, {})) as TransactionStatusResponse
    expect(result.status_request).toBeDefined()
  })
})
