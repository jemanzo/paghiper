import { Result, ResultStatus } from './types'

export class PagHiperResultError extends Error {}

const validateResultStatus = (result: Result): void => {
  if (!result.result) {
    throw new PagHiperResultError('result.message.notfound')
  }
  if (result.result !== ResultStatus.success) {
    throw new PagHiperResultError('result.message.nosuccess')
  }
}

const validateResultHTTPCode = (result: Result): void => {
  const httpCode = +result.http_code
  if (isNaN(httpCode)) {
    throw new PagHiperResultError('result.httpcode.notfound')
  }
  if (httpCode !== 201) {
    throw new PagHiperResultError(`result.httpcode.e${httpCode}`)
  }
}

export const validateResult = (result: Result | undefined): void => {
  if (!result) {
    throw new PagHiperResultError('result.invalid')
  }
  validateResultStatus(result)
  validateResultHTTPCode(result)
}
