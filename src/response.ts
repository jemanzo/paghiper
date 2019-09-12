import { HTTPEngineResponse } from './http_engine'
import { PagHiperResponseError } from './response.error'

const validateResponseStatusCode = (response: HTTPEngineResponse): void => {
  const statusCode = +response.statusCode
  if (isNaN(statusCode)) {
    throw new PagHiperResponseError('response.statuscode.notfound', response)
  }
  if (statusCode !== 200 && statusCode !== 201) {
    throw new PagHiperResponseError(`response.statuscode.e${statusCode}`, response)
  }
}

const validateResponseBody = (response: HTTPEngineResponse): void => {
  if (!response.body) {
    throw new PagHiperResponseError('response.body.notfound', response)
  }
}

export const validateResponse = (response: HTTPEngineResponse | undefined): void => {
  if (!response) {
    throw new PagHiperResponseError('response.invalid', null)
  }
  validateResponseStatusCode(response)
  validateResponseBody(response)
}
