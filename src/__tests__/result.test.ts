import { validateResult } from '../result'
import { Result, ResultStatus } from '../types'

describe('result validation', () => {
  test('invalid result object', () => {
    expect(() => validateResult(undefined)).toThrowError('result.invalid')
  })

  test('without message and code', () => {
    const result = {} as Result
    expect(() => validateResult(result)).toThrowError('result.message.notfound')
  })

  test('without success message', () => {
    const result = { result: ResultStatus.reject } as Result
    expect(() => validateResult(result)).toThrowError('result.message.nosuccess')
    result.result = 'unkwown' as ResultStatus
    expect(() => validateResult(result)).toThrowError('result.message.nosuccess')
  })

  test('without success message but correct code', () => {
    const result = { result: ResultStatus.reject, http_code: '201' } as Result
    expect(() => validateResult(result)).toThrowError('result.message.nosuccess')
    result.result = 'unkwown' as ResultStatus
    expect(() => validateResult(result)).toThrowError('result.message.nosuccess')
  })

  test('with success message but wrong code', () => {
    const result = { result: ResultStatus.success, http_code: '200' } as Result
    expect(() => validateResult(result)).toThrowError('result.httpcode.e200')
    result.http_code = '401'
    expect(() => validateResult(result)).toThrowError('result.httpcode.e401')
    result.http_code = '500'
    expect(() => validateResult(result)).toThrowError('result.httpcode.e500')
  })

  test('with success message and correct code', () => {
    const result = { result: ResultStatus.success, http_code: '201' } as Result
    expect(() => validateResult(result)).not.toThrowError()
  })
})
