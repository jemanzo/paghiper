import { HTTPEngineResponse } from '../http_engine'
import { validateResponse } from '../response'

describe('response validation', () => {
  test('invalid response object', () => {
    expect(() => validateResponse(undefined)).toThrowError('response.invalid')
  })

  test('without body and statusCode', () => {
    const response = {} as HTTPEngineResponse
    expect(() => validateResponse(response)).toThrowError('response.statuscode.notfound')
  })

  test('without body but with correct statusCode', () => {
    const response = { statusCode: 201 } as HTTPEngineResponse
    expect(() => validateResponse(response)).toThrowError('response.body.notfound')
  })

  test('with body but wrong statusCode', () => {
    const response = { body: {}, statusCode: 200 } as HTTPEngineResponse
    expect(() => validateResponse(response)).not.toThrowError()
    response.statusCode = 401
    expect(() => validateResponse(response)).toThrowError('response.statuscode.e401')
    response.statusCode = 500
    expect(() => validateResponse(response)).toThrowError('response.statuscode.e500')
  })

  test('with body and statusCode', () => {
    const response = { body: {}, statusCode: 201 } as HTTPEngineResponse
    expect(() => validateResponse(response)).not.toThrowError()
  })
})
